import * as signalR from '@microsoft/signalr'
import { sendMessage } from '@microsoft/signalr/dist/esm/Utils';

/*
    This file handles all the WebRTC related functionalities.
    Note:
    [HOST] - Message or event will be log at the HOST side
    [CLIENT] - Message or event will be log at the CLIENT side
*/ 


//[HOST] stream
let localStream;
//[CLIENT] stream 
// let remoteStream;

//[CLIENT]
let hostConnectionId;
//[HOST] peer
// let remoteConnectionId = {};
let hostPeerConnection = {};
//[CLIENT] peer
//[ALL]
let isServerOn = false;
//get token from local storage

// const getToken = () => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//         console.error("No token found in local storage");
//     }
//     return token;
// };

//initialize signalR
const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:3001/webrtc",{
    //  accessTokenFactory: () => getToken(),
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        withCredentials: true,
    })
    .build();

//webSocket events
connection.on("ready", async => {
    console.log("SignalR ready");
});
connection.on("sendMessage", async (username, message) => {
    console.log(`${username}: ` + message);
    const chatContents = document.getElementById('chat__holder');
    const chatComponent = (
        <ChatComp
            badge={null}
            timeStamp={new Date().toLocaleTimeString()}
            userName={username}
            chatContext={message}
        />
    );
    ReactDOM.render(chatComponent, chatContents.appendChild(document.createElement('div')));
});
//[HOST]room created
connection.on("roomCreated", async (hostName) => {
    console.log("Room created by: " + hostName);
    console.log("Waiting for client to join...");
});
//[HOST]roomLeft
connection.on("roomLeft", async (clientId) => {
    console.log("Client left: " + clientId);
    hostPeerConnection[clientId].close();
    hostPeerConnection[clientId] = null;
})
//[HOST] room remove
connection.on("roomRemoved", async (hostName) => {
    localStream.getTracks().forEach(track => track.stop());
    localStream = null;
    console.log("Room removed by: " + hostName);
});
//[HOST]roomJoined by client
/*
    Khi client join room, host sẽ bắt đầu gửi offer cho client
*/
connection.on("roomJoined", async (room, viewerConnectionId) => {
    console.log("Room updated: " + room);
    try{
        console.log("Viewer Connection Id: " + viewerConnectionId);
        hostPeerConnection[viewerConnectionId] = new RTCPeerConnection(servers);
        await SignalRTest.makeCall(viewerConnectionId);
    }
    catch(err){
        console.error("Error: " + err);
    }
     //send offer to client[viewerConnectionId]
});
//[CLIENT] noti to client that he has joined room
connection.on("clientJoinedRoom", async (room, host) => {
    console.log("joined: " + room);
    hostConnectionId = host;
    console.log("Host Connection Id: " + hostConnectionId);
});
/*
    Client nhận offer từ host và gửi lại answer cho host
*/
//[CLIENT]received offer
connection.on("receiveOffer", async (offer) => {
    console.log("Received Offer from" + hostConnectionId);
    await PeerHandler.handleOffer(offer);
});
/*
    Host nhận answer và tiền hành xử lí
*/
//[HOST]received answer
connection.on("receiveAnswer", async (answer, client) => {
    console.log("Received Answer from" + client);
    await PeerHandler.handleAnswer(answer, client);
});
connection.on("doneAnswer", async () => {
    console.log("DONE SETTING UP!");
});
connection.on("sendMessage", async (message, sender) => {
    console.log("Message from " + sender + ": " + message);
});
/*
    Sau khi tạo kêt nối, test connection bằng iceCandidate để đổi connectionState
*/

//[ALL]start ice candidates
// connection.on("startIceCandidate", async (connectionId, destination) => {
//     console.log("Start Ice Candidates");
//     try {
//         if(destination === "toHost"){
//             //client -> host
//             peerConnection.onicecandidate = event => {
//                 if (event.candidate) {
//                     connection.invoke("sendIceCandidate", event.candidate, connectionId, "fromClient");
//                 }
//             };
//         }
//         else {
//             //host -> client
//             hostPeerConnection[connectionId].onicecandidate = event => {
//                 if (event.candidate) {
//                     connection.invoke("sendIceCandidate", event.candidate, connectionId, "fromHost");
//                 }
//             };
//         }
//     } catch (error) {
//         console.error("Error: " + error);
//     }
    
// });
//[ALL]received ice candidates
connection.on("receiveIceCandidate", async (candidate, sender, type) => {
    console.log("Received Ice Candidate");
    try{
        if(type === "fromHost"){
            await PeerHandler.handleIceCandidate(candidate);
            peerConnection.onconnectionstatechange = (event) => {
                if(peerConnection.connectionState === 'connected'){
                    console.log("Connected");
                }
            }
            
        }
        else {
            await hostPeerConnection[sender].addIceCandidate(new RTCIceCandidate(candidate));
            hostPeerConnection[sender].onconnectionstatechange = (event) => {
                if(hostPeerConnection[sender].connectionState === 'connected'){
                    console.log("Connected");
                }
            }
        }
    }
    catch(err){
        console.error("Error: " + err);
    }
});
//[BOTH]error
connection.on("error", async (message) => {
    console.error("Error: " + message);
});

//ice Server
const servers = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
    ]
};


let peerConnection = new RTCPeerConnection(servers);
peerConnection.addEventListener('track', async (event) => {
    const remoteVideo = document.getElementById('remote__stream');
    const [remoteStream] = event.streams;
    remoteVideo.srcObject = remoteStream;
});



export const SignalRTest = {
        getServerStatus(){
            return isServerOn;
        },
    //[BOTH] start signalR
        async serverOn() {
            try {
                await connection.start();
                console.log("SignalR Connected");
                connection.invoke("ready");
                isServerOn = true;
                //room created announce to make call
            } catch (err) {
                console.error(err);
            }
        },
        async start(hostName) {
            if(isServerOn){
                if(localStream != null){
                    connection.invoke("createRoom", hostName); //Create room and wait for offer from client
                }
                else alert("Please start preview first");
            }
            else alert("Server is off");
        },
        //[HOST]preview stream
        async preview() {
            const constraint = {
                video: true,
                audio: true
            }
            try {
                localStream = await navigator.mediaDevices.getDisplayMedia(
                    constraint
                );
                document.getElementById('localVideo').srcObject = localStream;
                document.getElementById('localVideo').style.display = 'unset';


            } catch (err) {
                console.error("Error: " + err);
            }
        },
        //[HOST]make call (init peer and create offer)
        async makeCall(clientConnectionId) {
            try {
                localStream.getTracks().forEach(track => hostPeerConnection[clientConnectionId].addTrack(track, localStream));
                hostPeerConnection[clientConnectionId].onicecandidate = event => {
                    if (event.candidate) {
                        connection.invoke("sendIceCandidate", event.candidate, clientConnectionId, "fromHost");
                    }
                };
                const offer = await hostPeerConnection[clientConnectionId].createOffer();
                console.log("Offer created: " + offer);
                await hostPeerConnection[clientConnectionId].setLocalDescription(offer);
                console.log(`Sending offer to client: ${clientConnectionId}`);
                await connection.invoke("SendOffer", offer, clientConnectionId);
            } catch (err) {
                console.error(`Error in makeCall: ${err.message}`);
            }
        },
        //[CLIENT]join room
        async joinRoom(username, hostName) {
            await this.serverOn(); //Turn server on
            if(isServerOn){
                connection.invoke("joinRoom", username ,hostName); //Join room and send offer
            }
            else alert("Server is off");
        },
        async leaveRoom() {
            peerConnection.close();
            peerConnection = null;
            remoteStream.getTracks().forEach(track => track.stop());
            remoteStream = null;
            connection.invoke("leaveRoom", hostConnectionId);
        },
        async sendMessage(message, user) {
            connection.invoke("sendMessage", user, message, hostConnectionId);
        },

        stop() {
            connection.invoke("removeRoom");
            document.getElementById('localVideo').style.display = 'none';
            isServerOn = false;
            
        }

}

//Message handler (Offer, Answer, IceCandidate)
const PeerHandler = {
    async handleOffer(offer) {
        //tiến hành set remote description bên client và tạo answer
        peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        peerConnection.onicecandidate = event => {
            if (event.candidate) {
                connection.invoke("sendIceCandidate", event.candidate, hostConnectionId, "fromClient");
            }
        };
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        connection.invoke("sendAnswer", answer, hostConnectionId); //gửi answer cho host
    },
    async handleAnswer(answer, clientConnectionId) {
        
        const remoteDesc = new RTCSessionDescription(answer);
        hostPeerConnection[clientConnectionId].setRemoteDescription(remoteDesc);
        connection.invoke("doneAnswer", clientConnectionId);
    },
    async handleIceCandidate(candidate) {
        try{
            peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
        catch(err){
            console.error("Error adding received ice candidate: ", err);
        }
    },
}
import * as signalR from '@microsoft/signalr'

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
let remoteConnectionId = {};
let hostPeerConnection = {};
//[CLIENT] peer
//[ALL]
let isServerOn = false;
//get token from local storage
const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error("No token found in local storage");
    }
    return token;
};

//initialize signalR
const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:3001/webrtc",{
     accessTokenFactory: () => getToken(),
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        withCredentials: true,
    })
    .build();

//webSocket events
connection.on("ready", async => {
    console.log("SignalR ready");
    isServerOn = true;
});
connection.on("message", async message => {
    console.log("Message: " + message);
});
//[HOST]room created
connection.on("roomCreated", async (hostName) => {
    console.log("Room created by: " + hostName);
    console.log("Waiting for client to join...");
});
connection.on("roomLeft", async (room, clientId) => {
    console.log("Client left: " + clientId);
    hostPeerConnection[clientId].close();
    hostPeerConnection[clientId] = null;
})
//[HOST]roomJoined by client
/*
    Khi client join room, host sẽ bắt đầu gửi offer cho client
*/
connection.on("roomJoined", async (room, viewerConnectionId) => {
    console.log("Room joined by: " + room);
    try{
        remoteConnectionId.push(viewerConnectionId);
        console.log("Viewer Connection Id: " + viewerConnectionId);
        hostPeerConnection[viewerConnectionId] = new RTCPeerConnection(servers);
        await SignalRTest.makeCall(hostPeerConnection[viewerConnectionId], viewerConnectionId);
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
    console.log("Received Answer from" + remoteConnectionId.find(client));
    await PeerHandler.handleAnswer(answer, client);
});
connection.on("sendMessage", async (message, sender) => {
    console.log("Message from " + sender + ": " + message);
});
/*
    Sau khi tạo kêt nối, test connection bằng iceCandidate để đổi connectionState
*/

//[ALL]start ice candidates
connection.on("startIceCandidate", async (clientConnectionId) => {
    console.log("Start Ice Candidates");
    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            connection.invoke("sendIceCandidate", event.candidate, clientConnectionId);
        }
    };
});
//[ALL]received ice candidates
connection.on("receiveIceCandidate", async (candidate) => {
    console.log("Received Ice Candidate");
    await PeerHandler.handleIceCandidate(candidate);
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
peerConnection.onconnectionstatechange = (event) => {
    if(peerConnection.connectionState === 'connected'){
        console.log("Connected");
    }
}


export const SignalRTest = {
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
            if(localStream != null){
                await this.serverOn(); //Turn server on
                connection.invoke("createRoom", hostName); //Create room and wait for offer from client
            }
            else alert("Please start preview first");
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
        async makeCall(toViewerPeer, clientConnectionId) {
            try {
                localStream.getTracks().forEach(track => toViewerPeer.addTrack(track, localStream));
                const offer = await toViewerPeer.createOffer();
                await toViewerPeer.setLocalDescription(offer);
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
        async leaveRoom(leaver) {
            peerConnection.close();
            peerConnection = null;
            remoteStream.getTracks().forEach(track => track.stop());
            remoteStream = null;
            connection.invoke("leaveRoom", leaver, hostConnectionId);
        }

}

//Message handler (Offer, Answer, IceCandidate)
const PeerHandler = {
    async handleOffer(offer) {
        //tiến hành set remote description bên client và tạo answer
        peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        connection.invoke("sendAnswer", answer, hostConnectionId); //gửi answer cho host
    },
    async handleAnswer(answer, clientConnectionId) {
        
        const remoteDesc = new RTCSessionDescription(answer);
        peerConnection[clientConnectionId].setRemoteDescription(remoteDesc);
        connection.invoke("doneAnswer", clientConnectionId);
    },
    async handleIceCandidate(candidate) {
        try{
            peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
            peerConnection.addEventListener('track', async (event) => {
                const remoteVideo = document.getElementById('remote__stream');
                const [remoteStream] = event.streams;
                remoteVideo.srcObject = remoteStream;
            });
        }
        catch(err){
            console.error("Error adding received ice candidate: ", err);
        }
    },
}
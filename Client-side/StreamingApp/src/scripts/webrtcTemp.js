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
let remoteStream;


//[HOST] peer

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
//[HOST]room created
connection.on("roomCreated", async (hostName) => {
    console.log("Room created by: " + hostName);
    console.log("Waiting for client to join...");
});
//[HOST]roomJoined by client
/*
    Khi client join room, host sẽ bắt đầu gửi offer cho client
*/
connection.on("roomJoined", async (hostId) => {
    console.log("Room joined by: " + hostId);
    await makeCall(); //send offer to client
});
/*
    Client nhận offer từ host và gửi lại answer cho host
*/
//[CLIENT]received offer
connection.on("receivedOffer", async (offer) => {
    console.log("Received Offer");
    await PeerHandler.handleOffer(offer);
});
/*
    Host nhận answer và tiền hành xử lí
*/
//[HOST]received answer
connection.on("receivedAnswer", async (answer) => {
    console.log("Received Answer");
    await PeerHandler.handleAnswer(answer);
});
connection.on("sendMessage", async (message, sender) => {
    console.log("Message from " + sender + ": " + message);
});
/*
    Sau khi tạo kêt nối, test connection bằng iceCandidate để đổi connectionState
*/

//[ALL]start ice candidates
connection.on("startIceCandidates", async () => {
    console.log("Start Ice Candidates");
    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            connection.invoke("sendIceCandidate", event.candidate);
        }
    };
});
//[ALL]received ice candidates
connection.on("receivedIceCandidate", async (candidate) => {
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
        async makeCall() {
            localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));
            await PeerHandler.makeOffer(peerConnection);
            const offer = await peerConnection.createOffer();
            await peerConnection.setLocalDescription(offer);
            connection.invoke("sendOffer", offer);
        },
        //[CLIENT]join room
        async joinRoom(joiner ,hostName) {
            await this.serverOn(); //Turn server on
            if(isServerOn){
                connection.invoke("joinRoom", joiner, hostName); //Join room and send offer
            }
            else alert("Server is off");
        }

}

//Message handler (Offer, Answer, IceCandidate)
const PeerHandler = {
    async handleOffer(offer) {
        peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        connection.invoke("sendAnswer", answer); //gửi answer cho host
    },
    async handleAnswer(answer) {
        
        const remoteDesc = new RTCSessionDescription(answer);
        peerConnection.setRemoteDescription(remoteDesc);
        connection.invoke("doneAnwser");
    },
    async handleIceCandidate(candidate) {
        try{
            await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
        catch(err){
            console.error("Error adding received ice candidate: ", err);
        }
    },
}
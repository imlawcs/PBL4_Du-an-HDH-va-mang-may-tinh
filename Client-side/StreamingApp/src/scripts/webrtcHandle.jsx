import * as signalR from '@microsoft/signalr'
import ChatComp from '../components/ChatComp';

const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.error("No token found in local storage");
    }
    return token;
};


const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:3001/webrtc",{
        accessTokenFactory: () => getToken(),
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
        withCredentials: true
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();

const servers = {
    iceServers: [
        { urls: "stun:stun.l.google.com:19302" }
    ]
};

let localStream;
let peerConnection;

export const WebRTCHandle = {
    async start() {
        try {
            connection.on("created", async (roomId, hostId) => {
                console.log("Room Created: " + roomId + ' by ' + hostId);
            });
            connection.on("joined", async (roomId, clientId) => {
                console.log("Room Joined: " + roomId + ' by ' + clientId);
                this.createOffer(clientId);
            });
            connection.on("ReceiveMessage", (message, clientId) => {
                this.appendChatMessage(message, clientId);
            });

            connection.on("ReceiveOffer", async (offer, clientId) => {
                await this.handleOffer(offer, clientId);
            });

            connection.on("ReceiveAnswer", async (answer, clientId) => {
                await this.handleAnswer(answer, clientId);
            });

            connection.on("ReceiveIceCandidate", async (candidate) => {
                await this.handleIceCandidate(candidate);
            });
            connection.on('updateRoom', async (data) => {
                console.log("updateRoom", JSON.parse(data));
            });
            connection.on("leave", async (roomId, clientId) => {
                console.log("Room Left: " + roomId + ' by ' + clientId);
            }); 
            connection.on("error", (err) => {
                console.error(err.toString());
            });
            await connection.start();
            console.log("SignalR Connected.");
        } catch (err) {
            console.error(err);
        }
    },
    async startStream() {
        try {
            localStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
            document.getElementById('localVideo').srcObject = localStream;
        } catch (err) {
            console.error("Error: " + err);
        }
    },
    async createOffer(clientId) {
        peerConnection = new RTCPeerConnection(servers);
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        peerConn.onicecandidate = (event) => {
            if (event.candidate) {
                connection.invoke("SendIceCandidate", event.candidate);
            }
        };

        const offer = await peerConn.createOffer();
        await peerConn.setLocalDescription(offer);
        connection.invoke("SendOffer", clientId, offer);
    },
    async handleOffer(offer, sender) {
        peerConnection = new RTCPeerConnection(servers);
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        peerConnection.onicecandidate = (event) => {
            if (event.candidate) {
                connection.invoke("SendIceCandidate", clientId, event.candidate);
            }
        };

        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        connection.invoke("SendAnswer", sender, answer);
    },

    async handleAnswer(answer) {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    },

    async handleIceCandidate(candidate) {
        await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    },

    async previewDisplayMedia() {
        try {
            const displayStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
            document.getElementById('displayVideo').srcObject = displayStream;
        } catch (err) {
            console.error("Error: " + err);
        }
    },
    async CreateRoom(roomId, clientId){
        await connection.invoke("CreateRoom", roomId, clientId);
    },
    async JoinRoom(roomId, clientId) {
        await connection.invoke("JoinRoom", roomId, clientId);
    },
    async LeaveRoom(roomId) {
        await connection.invoke("LeaveRoom", roomId, clientId);
    },
    async SendMessage(roomId, clientId, message) {
        await connection.invoke("SendMessage", roomId, clientId, message);
    },
    appendChatMessage(message, clientId) {
        const chatContents = document.getElementById('chat__contents');
        const chatComponent = (
            <ChatComp
                badge={null}
                timeStamp={new Date().toLocaleTimeString()}
                userName={clientId}
                chatContext={message}
            />
        );
        ReactDOM.render(chatComponent, chatContents.appendChild(document.createElement('div')));
    }
}
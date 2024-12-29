import { useEffect, useRef, useState } from "react";
import { ApiConstants } from "../API/ApiConstants";
import * as signalR from '@microsoft/signalr'
interface ClientPeerTuple{
    connectionId: string,
    rtcConn: RTCPeerConnection,
}

/*
WIP: WebRTC Provider
*/


export default function WebRtcProvider({ children }) {
    const iceServers = {
        iceServers: [
            {
                urls: "stun:stun.l.google.com:19302"
            }
        ]
    };
    const [isReady, setIsReady] = useState(false);
    const [clientPeer, setClientPeer] = useState<RTCPeerConnection | null>(new RTCPeerConnection(iceServers));
    const [hostPeers, setHostPeers] = useState<ClientPeerTuple[] | null>([]);

    //Stream configuration
    const constraints = {
        video: true,
        audio: true
    };

    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<any | null>(null);



    const ws = useRef<signalR.HubConnection | null>(null);
    useEffect(() => {

            //Hub Initialization
            const WebRtcHub = new signalR.HubConnectionBuilder()
            .withUrl(ApiConstants.BASE_URL + "/webrtc",{
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets,
                withCredentials: true
            })
            .configureLogging(signalR.LogLevel.Information)
            .build();

            //Connections and Reconnections

            WebRtcHub.onreconnecting((error) => {
                console.log('Reconnecting...', error);
            });
            WebRtcHub.onreconnected((connectionId) => {
                console.log('Reconnected with connectionId: ' + connectionId);
            });

            WebRtcHub.start().then(() => {
                setIsReady(true);
                console.log("WebRtc ready");
            });

            //Room Events

            //[HOST]room created
            WebRtcHub.on("roomCreated", async (hostName) => {
                console.log("Room created by: " + hostName);
                console.log("Waiting for client to join...");
            });
            WebRtcHub.on("roomLeft", async (clientId) => {
                console.log("Client left: " + clientId);
                // hostPeerConnection[clientId].close();
                setHostPeers(hostPeers => {
                    hostPeers?.filter((peer) => peer.connectionId == clientId).map((peer) => {
                        peer.rtcConn.close();
                    });
                    return hostPeers
                });
            })
            //[HOST] room remove
            WebRtcHub.on("roomRemoved", async (hostName) => {
                let tempLocal = localStream;
                setLocalStream(localStream => {
                    localStream?.getTracks().forEach((track) => {
                        track.stop();
                    });
                    return localStream;
                })
                console.log("Room removed by: " + hostName);
            });
            //[HOST]roomJoined by client
            /*
                Khi client join room, host sẽ bắt đầu gửi offer cho client
            */
            WebRtcHub.on("roomJoined", async (room, viewerConnectionId) => {
                console.log("Room updated: " + room);
                try{
                    console.log("Viewer Connection Id: " + viewerConnectionId);
                    setHostPeers(hostPeers => {
                        let tempRtc = new RTCPeerConnection(iceServers);
                        //Make Call to Client
                        tempRtc.addTransceiver('video', { direction: 'sendrecv' });
                        localStream?.getTracks().forEach((track) => {tempRtc.addTrack(track, localStream)});
                        tempRtc.onicecandidate = (event) => {
                            if(event.candidate){
                                WebRtcHub.invoke("sendIceCandidate", viewerConnectionId, event.candidate);
                            }
                        }
                        tempRtc.createOffer().then((offer) => {
                            console.log("Offer created: " + JSON.stringify(offer));
                            tempRtc.setLocalDescription(offer);
                            WebRtcHub.invoke("SendOffer", viewerConnectionId, offer);
                        });

                        hostPeers?.push({connectionId: viewerConnectionId, rtcConn: tempRtc});
                        return hostPeers;
                    });
                    
                    // const dataChannel = hostPeerConnection[viewerConnectionId].createDataChannel("media");
                    // setupDataChannel(dataChannel);
                    
                    // await SignalRTest.makeCall(viewerConnectionId);
                }
                catch(err){
                    console.error("Error: " + err);
                }
                //send offer to client[viewerConnectionId]
            });




            ws.current = WebRtcHub;
        return () => {
            WebRtcHub.stop().then(() => {
                setIsReady(false);
            });
        }
        },[]);
    
}




import * as signalR from '@microsoft/signalr'
const getToken = () => {
    const token = localStorage.getItem('token');
    console.log(token);
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
        withCredentials: true,
    })
    .configureLogging(signalR.LogLevel.Information)
    .build();
export const SignalRTest = {
        async start() {
            try {
                connection.on("ready", async => {
                    console.log("signalr ready");
                });
                await connection.start();
                console.log("SignalR Connected.");
                connection.invoke("ready");
            } catch (err) {
                console.error(err);
            }
        },
}
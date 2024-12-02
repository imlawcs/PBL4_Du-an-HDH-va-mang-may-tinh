import React, { createContext, useEffect, useRef, useState } from "react";
import * as signalR from '@microsoft/signalr'
import { ApiConstants } from "../API/ApiConstants";
export const NotiContext = createContext<[boolean, signalR.HubConnection | null]>([false, null]);
//context for notification: isReady, message, function to handle notification
//TODO: implement notification handling
//LOG: 12/01/2024: have not implemented notification handling yet
export default function NotiProvider({ children }) {
    const [isReady, setIsReady] = useState(false);

    const ws = useRef<signalR.HubConnection | null>(null);
    useEffect(() => {
        
            const NotiHub = new signalR.HubConnectionBuilder()
            .withUrl(ApiConstants.BASE_URL + "/notification",{
                skipNegotiation: true,
                transport: signalR.HttpTransportType.WebSockets,
                withCredentials: true
            })
            .configureLogging(signalR.LogLevel.Information)
            .build();


            NotiHub.onreconnecting((error) => {
                console.log('Reconnecting...', error);
            });
            NotiHub.onreconnected((connectionId) => {
                console.log('Reconnected with connectionId: ' + connectionId);
            });
            

            NotiHub.start().then(() => {
                setIsReady(true);
            });
            
            ws.current = NotiHub;
        return () => {
          NotiHub.stop().then(() => {
            setIsReady(false);
          });
        }
      }, []);



      const ret: [boolean, signalR.HubConnection | null] = [isReady, ws.current];
      return (
        <NotiContext.Provider value={ret}>
            {children}
        </NotiContext.Provider>
      )

}
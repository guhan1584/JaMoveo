import { createContext, useContext, useEffect, useState } from "react";
import { connectSocket, disconnectSocket } from "@/sockets/sockets";

const SocketContext = createContext<{ isConnected: boolean }>({
  isConnected: false,
});

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect socket when app starts
    connectSocket();
    setIsConnected(true);

    // Only disconnect when app unmounts
    return () => {
      disconnectSocket();
      setIsConnected(false);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

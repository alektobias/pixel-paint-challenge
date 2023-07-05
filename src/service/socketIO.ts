import { io } from "socket.io-client";

let socket: any | null;
type Canvas = Record<string, { x: number; y: number; color: string }>;

export const initiateSocketConnection = (
  drawFN: (data: any) => void,
  updateUsers: (data: ConnectedUsers) => void
) => {
  console.log(`Connecting socket...`);
  socket = io("http://localhost:3001", {});
  socket.on("drawOnClient", drawFN);
  socket.on("canvas", (canvas: Canvas) =>
    Object.values(canvas).forEach((data: any) => {
      drawFN(data);
    })
  );
  socket.on("no-user-found", (err: any) => {
    alert(err);
  });
  socket.on("users", (users: ConnectedUsers) => updateUsers(users));
};

export const joinCanvas = (name: string, color: string) => {
  if (!socket) return;
  socket.emit("joinCanvas", { name, color });
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};

interface DrawProps {
  x: number;
  y: number;
  color: string;
}
export const drawOnServer = (data: DrawProps) => {
  if (!socket) return;
  socket.emit("drawOnServer", data);
};

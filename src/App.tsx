import { useEffect, useRef, useState } from "react";
import "./App.css";
import pixelPositionHelper from "./utils/pixelPositionHelper";
import {
  disconnectSocket,
  drawOnServer,
  initiateSocketConnection,
} from "./service/socketIO";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SideBar from "./components/Sidebar";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [color, setColor] = useState("#000000");
  const pixelSize = 5;

  const [connectedUsers, setConnectedUsers] = useState<ConnectedUsers>({});
  const drawOnCanvas = (data: any) => {
    const context = contextRef.current;
    if (!context) return;
    context.fillStyle = data.color;
    context.fillRect(data.x, data.y, pixelSize, pixelSize);
  };

  const draw = (e: any) => {
    drawOnServer({
      x: pixelPositionHelper(e.nativeEvent.offsetX, pixelSize),
      y: pixelPositionHelper(e.nativeEvent.offsetY, pixelSize),
      color,
    });
  };

  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) return console.error("Could not get canvas element");

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    contextRef.current = canvasRef.current.getContext("2d");
  };

  // initialize the canvas context
  useEffect(() => {
    initiateSocketConnection(drawOnCanvas, setConnectedUsers);

    return () => disconnectSocket();
  }, []);

  useEffect(getCanvasContext, [canvasRef]);

  return (
    <>
      <Header />
      <main className="grid grid-cols-[80%,_20%] mx-auto h-[90vh]">
        <canvas
          ref={canvasRef}
          id="canvas"
          className="w-full h-full grid-8"
          onMouseDownCapture={draw}
        />
        <SideBar color={color} setColor={setColor} />
      </main>
      <Footer connectedUsers={connectedUsers} />
    </>
  );
}

export default App;

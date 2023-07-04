import { useEffect, useRef, useState } from "react";
import "./App.css";
import pixelPositionHelper from "./utils/pixelPositionHelper";

const predefinedColors = [
  "#000000",
  "#FFFFFF",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFFF00",
  "#00FFFF",
  "#FF00FF",
];

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  // let ctx: CanvasRenderingContext2D | null = null;
  const pixelSize = 5;
  const [color, setColor] = useState("#000000");

  const draw = (e: any) => {
    // console.log(e.nativeEvent.offsetX + " " + e.nativeEvent.offsetY);

    // console.log(contextRef.current);
    // if (!contextRef.current) return;

    // console.log(color);
    // contextRef.current.fillStyle = color;

    // const canvas = document?.getElementById("canvas") as HTMLCanvasElement;
    // if (!canvas) return;
    // const context = canvas?.getContext("2d");
    const context = contextRef.current;
    if (!context) return;
    context.fillStyle = color;
    context.fillRect(
      pixelPositionHelper(e.nativeEvent.offsetX, pixelSize),
      pixelPositionHelper(e.nativeEvent.offsetY, pixelSize),
      pixelSize,
      pixelSize
    );
  };

  const getCanvasContext = () => {
    const canvas = canvasRef.current;
    if (!canvas) return console.error("Could not get canvas element");

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    contextRef.current = canvasRef.current.getContext("2d");
  };
  // initialize the canvas context
  useEffect(getCanvasContext, [canvasRef]);

  return (
    <>
      <header className="flex justify-between px-6 items-center h-[5vh] bg-slate-400 text-white">
        <h1 className="text-xl font-bold">Pixel Paint</h1>
      </header>
      <main className="grid grid-cols-[80%,_20%] mx-auto h-[90vh]">
        <canvas
          ref={canvasRef}
          id="canvas"
          className="w-full h-full grid-8"
          onMouseDownCapture={draw}
        />
        <div className="border px-6 flex gap-2 pt-8 flex-col bg-slate-100">
          <label>
            Enter your name:
            <input placeholder="John Doe" className="px-2 py-1 rounded-sm" />
          </label>

          <label>
            Pick a color:
            <div className="grid grid-cols-8 gap-1">
              {predefinedColors.map((buttonColor) => (
                <div
                  className={`p-0.5 flex items-center justify-center border ${
                    buttonColor === color
                      ? " border-slate-600"
                      : " border-transparent"
                  }`}
                >
                  <button
                    className={`block h-5 w-5 cursor-pointer`}
                    style={{ backgroundColor: buttonColor }}
                    onClick={() => setColor(buttonColor)}
                  />
                </div>
              ))}
            </div>
            <div
              className={`border  rounded flex items-center py-1 px-1 justify-between border ${
                !predefinedColors.includes(color)
                  ? "border-slate-600"
                  : "border-slate-400"
              }`}
            >
              <span className="text-slate-500">Custom Color</span>
              <input
                type="color"
                className="w-6 h-6 rounded-full"
                onChange={(e) => setColor(e.target.value)}
              />
            </div>
          </label>
        </div>
      </main>
      <footer className="connected_users h-[5vh] border flex items-center px-6 bg-slate-200">
        TO BE IMPLEMENTED: Connected users go here.
      </footer>
    </>
  );
}

export default App;

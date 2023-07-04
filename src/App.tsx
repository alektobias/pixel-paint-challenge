import { useRef } from "react";
import "./App.css";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div className="app">
      <header>
        <h1>Pixel paint</h1>
        <div className="color_selection">
          TO BE IMPLEMENTED: Color selection goes here.
        </div>
      </header>
      <main className="main_content">
        <div className="canvas_container">
          <canvas
            width={300}
            height={200}
            ref={canvasRef}
            style={{ border: "1px solid red" }}
          />
        </div>
        <div className="connected_users">
          TO BE IMPLEMENTED: Connected users go here.
        </div>
      </main>
    </div>
  );
}

export default App;

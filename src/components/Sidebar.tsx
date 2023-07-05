import { useRef, useState } from "react";
import { joinCanvas } from "../service/socketIO";

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

function SideBar({
  color,
  setColor,
}: {
  color: string;
  setColor: (data: string) => void;
}) {
  const nameRef = useRef<HTMLInputElement>(null);


  const joinName = (e?: any) => {
    try {
      e.preventDefault();
      const name = nameRef.current?.value;
      if (!name) return;
      joinCanvas(name, color);

      nameRef.current.disabled = true;
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <aside className="border px-6 flex gap-2 pt-8 flex-col bg-slate-100">
      <form onSubmit={joinName} className="flex items-end gap-1">
        <label>
          <strong className="text-slate-600">Enter your name:</strong>
          <input
            placeholder="John Doe"
            className="px-2 py-1 rounded-sm"
            ref={nameRef}
          />
        </label>
        <button
          type="submit"
          disabled={nameRef?.current?.disabled}
          className={`p-1 text-slate-600 ${
            nameRef?.current?.disabled ? "bg-transparent" : "bg-slate-200"
          }`}
        >
          {!nameRef?.current?.value && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M3 20v-6l8-2l-8-2V4l19 8l-19 8Z" />
            </svg>
          )}
          {nameRef?.current?.disabled && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4L9.55 18Z"
              />
            </svg>
          )}
        </button>
      </form>

      <label>
        <strong className="text-slate-600">Pick a color:</strong>
        <div className="flex items-center gap-1">
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
          className={`border  rounded flex items-center py-1 px-1 justify-between border cursor-pointer ${
            !predefinedColors.includes(color)
              ? "border-slate-600"
              : "border-slate-400"
          }`}
        >
          <label className="flex flex-row justify-between items-center w-full">
            <span className="text-slate-600">Custom Color</span>
            <input
              type="color"
              className="w-6 h-6 rounded-full"
              onChange={(e) => setColor(e.target.value)}
            />
          </label>
        </div>
      </label>
    </aside>
  );
}

export default SideBar;

import { useState } from "react";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  const duration = 198;

  const formatTime = (time) => {
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${min}:${sec}`;
  };

  return (
    <div className="w-full flex items-center gap-3 text-sm text-gray-400">
      <span className="w-10 text-right">{formatTime(progress)}</span>

      <div className="relative flex-1 h-2 bg-neutral-700 rounded-full">
        <div
          className="absolute h-2 bg-green-500 rounded-full"
          style={{ width: `${(progress / duration) * 100}%` }}
        />

        <div
          className="absolute top-1/2 w-4 h-4 bg-green-400 rounded-full -translate-y-1/2"
          style={{
            left: `calc(${(progress / duration) * 100}% - 8px)`,
          }}
        />

        <input
          type="range"
          min="0"
          max={duration}
          value={progress}
          onChange={(e) => setProgress(Number(e.target.value))}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      <span className="w-10">{formatTime(duration)}</span>
    </div>
  );
}

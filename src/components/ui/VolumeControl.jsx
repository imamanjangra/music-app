import { useState } from "react";
import { Volume2 } from "lucide-react";

export default function VolumeControl() {
  const [volume, setVolume] = useState(70);

  return (
    <div className="flex items-center gap-3">
    
      <Volume2 className="text-white w-5 h-5" />

    
      <div className="relative w-28 h-2 bg-neutral-700 rounded-full">
       
        <div
          className="absolute h-2 bg-green-500 rounded-full"
          style={{ width: `${volume}%` }}
        />

    
        <div
          className="absolute top-1/2 w-4 h-4 bg-green-400 rounded-full -translate-y-1/2 cursor-pointer"
          style={{ left: `calc(${volume}% - 8px)` }}
        />
        
       
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>
    </div>
  );
}

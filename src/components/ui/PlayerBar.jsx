import { SkipBack, SkipForward } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import VolumeControl from "./VolumeControl";
import ProgressBar from "./ProgressBar";
import song_details from "../Hooks/song_details";

export default function PlayerBar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const api_data = song_details()
  const song_ref = useRef()

  if(!api_data){
    return;
  }

  useEffect(() => {
    
  } , [])

  const handlingPlaying = () => {
    setIsPlaying(!isPlaying)
    if(isPlaying == true){
      const song_url = song.downloadUrl?.[4].url
      song_url.play();
    }
  }

  // console.log(api_data)

  const song = api_data?.data?.[0]

  console.log(song);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#111] text-white">
      <div className="px-6 pt-2">
        <ProgressBar />
      </div>

      <div className="h-20 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 w-1/3">
          <img
            src={song.image?.[0].url}
            alt="song"
            className="w-12 h-12 rounded"
          />
          <div>
            <p className="text-sm font-medium">{song.name}</p>
            <p className="text-xs text-gray-400">The Wanderers</p>
          </div>
        </div>

        <div className="flex items-center gap-6 w-1/3 justify-center">
          <SkipBack className="cursor-pointer text-gray-300 hover:text-white" />

          <div
            onClick={handlingPlaying}
            className="w-10 h-10 rounded-full bg-[#00FF88] flex items-center justify-center text-black cursor-pointer"
          >
            {isPlaying ? (
              <svg
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5" />
              </svg>
            ) : (
              <svg
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
              </svg>
            )}
          </div>

          <SkipForward className="cursor-pointer text-gray-300 hover:text-white" />
        </div>

        <div className="w-1/3 flex justify-end">
          <VolumeControl />
        </div>
      </div>
    </div>
  );
}

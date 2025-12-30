import { SkipBack, SkipForward } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import VolumeControl from "./VolumeControl";
import ProgressBar from "./ProgressBar";
import Song_details from "../Hooks/song_details";

export default function PlayerBar({
  mainId,
  value,
  isPlay,
  setIsPlay,
  setMainId,
}) {
  const [volume, setVolume] = useState(50);
  const [id, setId] = useState(null);
  const [progress, setProgress] = useState(0);

  const audioRef = useRef(null);

  useEffect(() => {
    if (mainId === null || !value?.length) return;
    setId(value[mainId]);
  }, [mainId, value]);

  const NextSong = () => {
    if (mainId == value.length - 1) {
      setMainId(0);
    } else {
      setMainId(mainId + 1);
    }
  };

  const BackSong = () => {
    if (mainId == 0) {
      setMainId(value.length - 1);
    } else {
      setMainId(mainId - 1);
    }
  };
  const api_data = Song_details(id);
  const song = api_data?.data?.[0];
  const duration = Number(song?.duration || 0);

  useEffect(() => {
    if (!song) return;

    const songUrl = song.downloadUrl?.[4]?.url;
    if (!songUrl) return;

    const audio = new Audio(songUrl);
    audio.volume = volume / 100;
    audioRef.current = audio;

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    const handleEnded = () => {
      setMainId((prev) => (prev === value.length - 1 ? 0 : prev + 1));
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    if (isPlay) audio.play();

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [song]);

  useEffect(() => {
    if (!audioRef.current) return;

    isPlay ? audioRef.current.play() : audioRef.current.pause();
  }, [isPlay]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  if (!song) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#111] text-white">
      <div className="px-6 pt-2">
        <ProgressBar
          progress={progress}
          setProgress={setProgress}
          duration={duration}
          audioRef={audioRef}
        />
      </div>

      <div className="h-20 px-6 flex items-center justify-between">
        <div className="flex items-center gap-4 w-1/3">
          <img
            src={song.image?.[0]?.url}
            alt="song"
            className="w-12 h-12 rounded"
          />
          <div>
            <p className="text-sm font-medium">{song.name}</p>
            <p className="text-xs text-gray-400">
              {song.artists?.primary?.[0]?.name}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 w-1/3 justify-center">
          <SkipBack onClick={BackSong} />
          <div
            onClick={() => setIsPlay(!isPlay)}
            className="w-10 h-10 rounded-full bg-[#00FF88] flex items-center justify-center text-black"
          >
            {isPlay ? (
              <svg width="24" height="24" fill="currentColor">
                <rect x="5" y="4" width="4" height="16" />
                <rect x="15" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="currentColor">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </div>
          <SkipForward onClick={NextSong} />
        </div>

        <div className="w-1/3 flex justify-end">
          <VolumeControl
            volume={volume}
            setVolume={setVolume}
            audioRef={audioRef}
          />
        </div>
      </div>
    </div>
  );
}

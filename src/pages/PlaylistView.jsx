import { Play, Pause, Shuffle, Heart } from "lucide-react";
import { Sidebar } from "../components/sidebar";
import { useParams } from "react-router-dom";
import AlbumSongs from "../components/Hooks/AlbumSongs";
import { useEffect, useState } from "react";
import PlayerBar from "../components/ui/PlayerBar";

export default function AlbumPage() {
  const { id } = useParams();

  const [ids, setIds] = useState([]); // all song ids
  const [playId, setPlayId] = useState(null); // clicked song id
  const [isPlay, setIsPlay] = useState(false);
  const [mainId, setMainId] = useState(null); // index of playing song

  const songs = AlbumSongs(id);
  const sdata = songs?.data;

  // 🔹 create id array
  useEffect(() => {
    if (sdata?.songs) {
      const songIds = sdata.songs.map((song) => song.id);
      setIds(songIds);
    }
  }, [sdata]);

  // 🔹 find index of playing song
  useEffect(() => {
    if (!playId || ids.length === 0) return;

    const currentIndex = ids.indexOf(playId);

    if (currentIndex !== -1) {
      setMainId(currentIndex);
    }
  }, [playId, ids]);

  if (!sdata) {
    return (
      <div className="p-8 ml-64">
        <Sidebar />
        <p>Loading Top Songs...</p>
      </div>
    );
  }

  console.log("array", ids);
  console.log("playid", playId);
  console.log("isplaying", isPlay);
  console.log("mainID", mainId);

  return (
    <div className="p-8 ml-64">
      <Sidebar />

      {/* Album Header */}
      <div className="flex flex-col md:flex-row gap-6 py-10">
        <img
          src={sdata?.image?.[2]?.url}
          alt={sdata.name}
          className="w-56 h-56 rounded-xl shadow-lg"
        />

        <div className="flex flex-col justify-end">
          <p className="uppercase text-sm text-gray-400">Album</p>
          <h1 className="text-4xl md:text-6xl font-bold">{sdata.name}</h1>
          <p className="text-gray-400 mt-2">{sdata.description}</p>

          <div className="flex gap-4 mt-6">
            <button
              onClick={() => {
                if (mainId === null && ids.length > 0) {
                  setMainId(0);
                  setPlayId(ids[0]);
                }
                setIsPlay((prev) => !prev);
              }}
              className="flex items-center gap-2 bg-green-500 px-6 py-3 rounded-full font-medium hover:bg-green-600"
            >
              {isPlay ? (
                <Pause size={16} className="text-white" />
              ) : (
                <Play size={16} className="text-white" />
              )}
            </button>

            <button className="flex items-center gap-2 bg-white/20 px-6 py-3 rounded-full hover:bg-white/30">
              <Shuffle size={18} /> Shuffle
            </button>
          </div>
        </div>
      </div>

      {/* Song List */}
      <div className="mt-10">
        <div className="grid grid-cols-[40px_1fr_40px_80px] text-gray-400 text-sm px-5 pb-2 border-b border-white/10">
          <span>#</span>
          <span>Title</span>
          <span></span>
          <span className="text-right">Time</span>
        </div>

        {sdata.songs.map((song, index) => (
          <div
            key={song.id}
            className={`group grid grid-cols-[40px_1fr_40px_80px] items-center px-5 py-3 rounded-lg cursor-pointer
              ${mainId === index ? "bg-white/10" : "hover:bg-white/10"}
            `}
          >
            {/* Index / Play */}
            <div className="relative flex items-center justify-center text-gray-400">
              {/* Track number */}
              <span
                className={`mr-7 transition
                  ${mainId === index && isPlay ? "opacity-0" : "group-hover:opacity-0"}
                `}
              >
                {index + 1}
              </span>

              {/* Play / Pause Icon */}
              <span
                onClick={() => {
                  setPlayId(song.id);
                  setIsPlay((prev) => (mainId === index ? !prev : true));
                }}
                className={`absolute mr-7 transition cursor-pointer
                  ${
                    mainId === index && isPlay
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }
                `}
              >
                {mainId === index && isPlay ? (
                  <Pause size={16} className="text-white" />
                ) : (
                  <Play size={16} className="text-white" />
                )}
              </span>
            </div>

            {/* Title */}
            <div>
              <p className="font-medium">{song.name}</p>
              <p className="text-sm text-gray-400">
                {song.artists.primary?.[0]?.name}
              </p>
            </div>

            {/* Like */}
            <button className="text-gray-400 hover:text-green-500 transition">
              <Heart size={18} />
            </button>

            {/* Duration */}
            <span className="text-right text-gray-400">
              {Math.floor(song.duration / 60)}:
              {(song.duration % 60).toString().padStart(2, "0")}
            </span>
          </div>
        ))}

        {/* Player */}
        <PlayerBar
          mainId={mainId}
          value={ids}
          isPlay={isPlay}
          setIsPlay={setIsPlay}
        />
      </div>
    </div>
  );
}

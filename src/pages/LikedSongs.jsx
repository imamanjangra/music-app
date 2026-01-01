import { Heart, Play, MoreHorizontal } from "lucide-react";

const likedSongs = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "Luna Eclipse",
    duration: "4:05",
    image:
      "https://images.unsplash.com/photo-1644855640845-ab57a047320e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
];

export default function LikedSongs() {
  const handlePlayAll = () => {
    console.log("Play all liked songs");
  };

  const handlePlaySong = (song) => {
    console.log("Playing:", song.title);
  };

  return (
    <div className="p-8 pb-32 ">
      <div className="mb-8">
        <div className="flex items-end gap-6 mb-6">
          <div className="w-48 h-48 rounded-lg bg-linear-to-br from-[#00ff88] to-[#00cc6f] flex items-center justify-center shadow-2xl">
            <Heart className="w-24 h-24 text-white" />
          </div>

          <div>
            <p className="text-sm mb-2">PLAYLIST</p>
            <h1 className="mb-4 text-4xl font-bold">Liked Songs</h1>
            <p className="text-muted-foreground">{likedSongs.length} songs</p>
          </div>
        </div>

        <button
          onClick={handlePlayAll}
          className="flex items-center gap-2 h-10 px-6 rounded-full bg-[#00ff88] hover:bg-[#00cc6f] text-black font-medium transition"
        >
          <Play className="w-5 h-5 fill-black" />
          Play
        </button>
      </div>

      <div className="space-y-1">
        {likedSongs.map((song) => (
          <div
            key={song.id}
            className="group flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition cursor-pointer"
          >
            <div className="relative w-12 h-12 rounded-md overflow-hidden shrink-0">
              <img
                src={song.image}
                alt={song.title}
                className="w-full h-full object-cover"
              />

              <div
                onClick={() => handlePlaySong(song)}
                className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Play className="w-5 h-5 text-white fill-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium">{song.title}</p>
              <p className="truncate text-xs text-muted-foreground">
                {song.artist}
              </p>
            </div>

            <span className="text-xs text-muted-foreground">
              {song.duration}
            </span>

            <button className="size-9 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent flex items-center justify-center">
              <Heart className="w-4 h-4 fill-[#00ff88] text-[#00ff88]" />
            </button>

            <button className="size-9 rounded-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-accent flex items-center justify-center">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

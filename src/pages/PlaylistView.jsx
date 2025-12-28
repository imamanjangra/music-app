import { Play, Ellipsis, Heart, Trash2 } from "lucide-react";

export default function PlaylistView() {
  return (
    <div className="p-8 pb-32">
      {/* Playlist Header */}
      <div className="mb-8">
        <div className="flex items-end gap-6 mb-6">
          <div className="w-48 h-48 rounded-lg overflow-hidden shadow-2xl bg-muted">
            <img
              src="https://images.unsplash.com/photo-1644855640845-ab57a047320e?auto=format&fit=crop&w=400&q=80"
              alt="Chill Vibes"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="flex-1">
            <p className="text-sm mb-2">PLAYLIST</p>
            <h1 className="text-3xl font-bold mb-2">Chill Vibes</h1>
            <p className="text-muted-foreground mb-4">
              Relaxing tunes for a calm evening
            </p>
            <p className="text-sm text-muted-foreground">You • 1 song</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-6 h-10 rounded-full bg-[#00ff88] hover:bg-[#00cc6f] text-black font-medium">
            <Play className="w-5 h-5 fill-black" />
            Play
          </button>

          <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-muted">
            <Ellipsis className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Single Song */}
      <div className="group relative flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition">
        <div className="relative w-12 h-12 rounded-md overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1644855640845-ab57a047320e?auto=format&fit=crop&w=400&q=80"
            alt="Midnight Dreams"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <Play className="w-5 h-5 text-white fill-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <p className="truncate text-sm">Midnight Dreams</p>
          <p className="truncate text-xs text-muted-foreground">Luna Eclipse</p>
        </div>

        <span className="text-xs text-muted-foreground">4:05</span>

        <button className="w-9 h-9 rounded-md opacity-0 group-hover:opacity-100 transition hover:bg-accent">
          <Heart className="w-4 h-4 text-[#00ff88] fill-[#00ff88]" />
        </button>

        <button className="w-9 h-9 rounded-md opacity-0 group-hover:opacity-100 transition hover:bg-accent">
          <Ellipsis className="w-4 h-4" />
        </button>

        <button className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-md opacity-0 group-hover:opacity-100 transition hover:bg-accent">
          <Trash2 className="w-4 h-4 text-destructive" />
        </button>
      </div>
    </div>
  );
}

import { Play, Pause } from "lucide-react";
import { useMusicPlayer } from "../../context/MusicContext";

export default function SongList({ songs, title = "Songs" }) {
  const { currentSong, isPlaying, playSelectedSong, togglePlayPause } =
    useMusicPlayer();

  const extractImageUrl = (song) => {
    if (!song.image) return null;

    if (Array.isArray(song.image)) {
      // If image is an array, try to get the highest quality
      return (
        song.image[song.image.length - 1]?.link ||
        song.image[song.image.length - 1]?.url ||
        song.image[2]?.link ||
        song.image[1]?.link ||
        song.image[0]?.link ||
        song.image[2]?.url ||
        song.image[1]?.url ||
        song.image[0]?.url
      );
    } else if (typeof song.image === "string") {
      // If image is a direct string URL
      return song.image;
    } else if (song.image.link || song.image.url) {
      // If image is an object with link or url property
      return song.image.link || song.image.url;
    }

    return null;
  };

  const handleSongClick = (song) => {
    console.log("Song clicked:", song.name || song.title);
    console.log("Current song:", currentSong?.name || currentSong?.title);
    console.log("Is same song?", currentSong?.id === song.id);

    if (currentSong?.id === song.id) {
      console.log("Toggling play/pause for current song");
      togglePlayPause();
    } else {
      console.log("Playing new song:", song.name || song.title);
      playSelectedSong(song);
    }
  };

  if (!songs || songs.length === 0) {
    return (
      <div className="bg-card border border-border rounded-2xl p-6">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="text-muted-foreground">No songs available</p>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-2">
        {songs.map((song, index) => {
          const isCurrentSong = currentSong?.id === song.id;
          const isCurrentlyPlaying = isCurrentSong && isPlaying;
          const imageUrl = extractImageUrl(song);

          return (
            <div
              key={song.id || index}
              onClick={() => handleSongClick(song)}
              className="group flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
            >
              <div className="relative flex-shrink-0">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={song.name || song.title}
                    className="w-12 h-12 rounded-lg object-cover"
                    onError={(e) => {
                      console.error("Song image failed to load:", imageUrl);
                      e.target.style.display = "none";
                      e.target.nextSibling.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                  {isCurrentlyPlaying ? (
                    <Pause className="w-4 h-4 text-white" />
                  ) : (
                    <Play className="w-4 h-4 text-white" />
                  )}
                </div>
                <div
                  className={`absolute inset-0 w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${imageUrl ? "hidden" : ""}`}
                >
                  <Play className="w-6 h-6 text-muted-foreground" />
                </div>
                {isCurrentSong && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-neon-green rounded-full animate-pulse" />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3
                  className={`font-medium truncate ${isCurrentSong ? "text-neon-green" : ""}`}
                >
                  {song.name || song.title}
                </h3>
                <p className="text-sm text-muted-foreground truncate">
                  {song.primaryArtists ||
                    song.artist ||
                    song.artists?.primary
                      ?.map((artist) => artist.name)
                      .join(", ") ||
                    "Unknown Artist"}
                </p>
              </div>

              <div className="text-sm text-muted-foreground">
                {song.duration
                  ? `${Math.floor(song.duration / 60)}:${(song.duration % 60).toString().padStart(2, "0")}`
                  : ""}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

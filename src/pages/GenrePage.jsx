import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import PlayerBar from "../components/ui/PlayerBar";
import SongList from "../components/ui/SongList";
import useGenresApi from "../components/Hooks/genres_api";
import { Music, Loader2 } from "lucide-react";

function GenrePage() {
  const { genres, loading, error } = useGenresApi();
  const [selectedGenre, setSelectedGenre] = useState(null);

  if (loading) {
    return (
      <>
        <Sidebar />
        <div className="min-h-screen bg-background text-foreground p-8 ml-64">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-neon-green" />
            <span className="ml-2 text-muted-foreground">
              Loading genres...
            </span>
          </div>
        </div>
        <PlayerBar />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Sidebar />
        <div className="min-h-screen bg-background text-foreground p-8 ml-64">
          <div className="text-center text-destructive">
            <p>Error loading genres: {error}</p>
          </div>
        </div>
        <PlayerBar />
      </>
    );
  }

  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-background text-foreground p-8 ml-64 pb-32">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Music className="text-neon-green h-8 w-8" />
            <h1 className="text-3xl font-bold">Browse Genres</h1>
          </div>
        </header>

        <main>
          {!selectedGenre ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {genres.map((genre, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedGenre(genre)}
                  className="group relative bg-card border border-border rounded-2xl p-6 cursor-pointer hover:bg-accent/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="aspect-square mb-4 rounded-xl overflow-hidden bg-muted relative">
                    {genre.image ? (
                      <>
                        <img
                          src={genre.image}
                          alt={genre.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            console.error(
                              "Genre image failed to load:",
                              genre.image,
                            );
                            e.target.style.display = "none";
                            const fallback =
                              e.target.parentElement.querySelector(
                                ".fallback-icon",
                              );
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                        <div
                          className="fallback-icon absolute inset-0 w-full h-full flex items-center justify-center"
                          style={{ display: "none" }}
                        >
                          <Music className="w-12 h-12 text-muted-foreground" />
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Music className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-center group-hover:text-neon-green transition-colors">
                    {genre.name}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center mt-1">
                    {genre.songs.length} songs
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={() => setSelectedGenre(null)}
                  className="text-neon-green hover:text-neon-green-hover transition-colors"
                >
                  ← Back to Genres
                </button>
              </div>

              <div className="bg-card border border-border rounded-2xl p-8 mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 rounded-xl overflow-hidden bg-muted flex-shrink-0 relative">
                    {selectedGenre.image ? (
                      <>
                        <img
                          src={selectedGenre.image}
                          alt={selectedGenre.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error(
                              "Selected genre image failed to load:",
                              selectedGenre.image,
                            );
                            e.target.style.display = "none";
                            const fallback =
                              e.target.parentElement.querySelector(
                                ".fallback-icon",
                              );
                            if (fallback) fallback.style.display = "flex";
                          }}
                        />
                        <div
                          className="fallback-icon absolute inset-0 w-full h-full flex items-center justify-center"
                          style={{ display: "none" }}
                        >
                          <Music className="w-16 h-16 text-muted-foreground" />
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Music className="w-16 h-16 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold mb-2">
                      {selectedGenre.name}
                    </h1>
                    <p className="text-muted-foreground">
                      {selectedGenre.songs.length} songs in this genre
                    </p>
                  </div>
                </div>
              </div>

              <SongList songs={selectedGenre.songs} title="Popular Songs" />
            </div>
          )}
        </main>
      </div>
      <PlayerBar />
    </>
  );
}

export default GenrePage;

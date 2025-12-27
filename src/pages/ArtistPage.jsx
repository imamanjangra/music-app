import { useState } from "react";
import { Sidebar } from "../components/sidebar";
import PlayerBar from "../components/ui/PlayerBar";
import SongList from "../components/ui/SongList";
import useArtistsApi from "../components/Hooks/artists_api";
import { Users, Loader2 } from "lucide-react";

function ArtistPage() {
  const { artists, loading, error } = useArtistsApi();
  const [selectedArtist, setSelectedArtist] = useState(null);

  if (loading) {
    return (
      <>
        <Sidebar />
        <div className="min-h-screen bg-background text-foreground p-8 ml-64">
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-neon-green" />
            <span className="ml-2 text-muted-foreground">
              Loading artists...
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
            <p>Error loading artists: {error}</p>
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
            <Users className="text-neon-green h-8 w-8" />
            <h1 className="text-3xl font-bold">Popular Artists</h1>
          </div>
        </header>

        <main>
          {!selectedArtist ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {artists.map((artist, index) => (
                <div
                  key={artist.id || index}
                  onClick={() => setSelectedArtist(artist)}
                  className="group relative bg-card border border-border rounded-2xl p-6 cursor-pointer hover:bg-accent/50 transition-all duration-300 hover:scale-105"
                >
                  <div className="aspect-square mb-4 rounded-full overflow-hidden bg-muted mx-auto relative">
                    {artist.image ? (
                      <>
                        <img
                          src={artist.image}
                          alt={artist.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            console.error(
                              "Artist image failed to load:",
                              artist.image,
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
                          <Users className="w-12 h-12 text-muted-foreground" />
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-center group-hover:text-neon-green transition-colors">
                    {artist.name}
                  </h3>
                  <p className="text-sm text-muted-foreground text-center mt-1">
                    {artist.followers?.toLocaleString()} followers
                  </p>
                  <p className="text-xs text-muted-foreground text-center">
                    {artist.songs.length} songs
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={() => setSelectedArtist(null)}
                  className="text-neon-green hover:text-neon-green-hover transition-colors"
                >
                  ← Back to Artists
                </button>
              </div>

              <div className="bg-card border border-border rounded-2xl p-8 mb-8">
                <div className="flex items-center gap-6">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-muted flex-shrink-0 relative">
                    {selectedArtist.image ? (
                      <>
                        <img
                          src={selectedArtist.image}
                          alt={selectedArtist.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            console.error(
                              "Selected artist image failed to load:",
                              selectedArtist.image,
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
                          <Users className="w-16 h-16 text-muted-foreground" />
                        </div>
                      </>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Users className="w-16 h-16 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  <div>
                    <h1 className="text-4xl font-bold mb-2">
                      {selectedArtist.name}
                    </h1>
                    <p className="text-muted-foreground flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      {selectedArtist.followers?.toLocaleString()} followers
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {selectedArtist.songs.length} popular songs
                    </p>
                  </div>
                </div>
              </div>

              <SongList songs={selectedArtist.songs} title="Popular Songs" />
            </div>
          )}
        </main>
      </div>
      <PlayerBar />
    </>
  );
}

export default ArtistPage;

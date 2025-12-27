import { useAuth } from "../context/FirebaseContext";
import { useMusicPlayer } from "../context/MusicContext";
import { Button } from "@/components/shad/button";
import { LogOut, Music } from "lucide-react";
import { Sidebar } from "../components/sidebar";
import PlayerBar from "../components/ui/PlayerBar";
import Banner from "../components/ui/Banner";
import SongList from "../components/ui/SongList";

function Home() {
  const { user, logout } = useAuth();
  const { songs, loading } = useMusicPlayer();

  return (
    <>
      <Sidebar />
      <div className="min-h-screen bg-background text-foreground p-8 ml-64 pb-32">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <Music className="text-neon-green h-8 w-8" />
            <h1 className="text-2xl font-bold">MusicFlow</h1>
          </div>
        </header>

        <main className="space-y-8">
          {/* Banner Section */}
          <Banner />

          {/* Welcome Section */}
          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-neon-green">
              Welcome Back!
            </h2>
            <p className="text-muted-foreground">
              You are successfully logged in. Start exploring your favorite
              tracks.
            </p>
          </div>

          {/* Popular Songs Section */}
          {loading ? (
            <div className="bg-card border border-border rounded-2xl p-8">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-muted rounded w-1/4"></div>
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-muted rounded-lg"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-3 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <SongList songs={songs.slice(0, 10)} title="Popular Songs" />
          )}
        </main>
      </div>
      <PlayerBar />
    </>
  );
}

export default Home;

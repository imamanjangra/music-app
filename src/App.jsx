import PlayerBar from "./components/ui/PlayerBar";
import Sidebar from "./components/ui/Sidebar";
import Trending from "./components/ui/Trending";


export default function App() {
  return (
    <div className="flex bg-black text-white min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6">
        <Trending />
      </main>

      <PlayerBar />
    </div>
  );
}

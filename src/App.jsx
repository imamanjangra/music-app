import Topsong_api from "./components/Hooks/Topsong_api";
import PlayerBar from "./components/ui/PlayerBar";



export default function App() {

  const api_data = Topsong_api()
  console.log(api_data);
  return (
    <div className="flex bg-black text-white min-h-screen">
      <PlayerBar />
    </div>
  );
}

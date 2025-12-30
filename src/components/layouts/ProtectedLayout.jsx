import { Outlet } from "react-router-dom";
import PlayerBar from "../ui/PlayerBar";
import { Sidebar } from "../sidebar";

export default function ProtectedLayout({
  mainId,
  value,
  setMainId,
  isPlay,
  setIsPlay,
}) {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <Sidebar />

      <div className="flex-1 ml-64 pb-24">
        <Outlet />
      </div>

      <PlayerBar
        value={value}
        mainId={mainId}
        isPlay={isPlay}
        setIsPlay={setIsPlay}
        setMainId={setMainId}
      />
    </div>
  );
}

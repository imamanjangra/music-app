import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Sidebar } from "../sidebar.jsx";
import PlayerBar from "../ui/PlayerBar.jsx";

export default function MainLayout() {
  const [ids, setIds] = useState([]);
  const [mainId, setMainId] = useState(null);
  const [isPlay, setIsPlay] = useState(false);

  return (
    <div className="flex min-h-screen bg-black text-white">
      <Sidebar />

      <div className="flex-1 ml-64 pb-28 overflow-y-auto">
        <Outlet
          context={{
            ids,
            setIds,
            mainId,
            setMainId,
            isPlay,
            setIsPlay,
          }}
        />
      </div>

      {mainId !== null && (
        <PlayerBar
          mainId={mainId}
          value={ids}
          isPlay={isPlay}
          setIsPlay={setIsPlay}
          setMainId={setMainId}
        />
      )}
    </div>
  );
}

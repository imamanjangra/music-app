import { SkipBack, SkipForward, Pause } from "lucide-react";
import { useState } from "react";

export default function PlayerBar() {
  const [p_value, setP_value] = useState(true);
  const handle_click_start_btn = () => {
    setP_value(!p_value);
  };
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#111] h-20 flex items-center px-6">
      <div className="flex-1">
        <p className="text-sm">City Lights</p>
        <p className="text-xs text-gray-400">Urban Soul</p>
      </div>

      <div className="flex items-center gap-6">
        <SkipBack />

        <div
          onClick={handle_click_start_btn}
          className="w-10 h-10 rounded-full bg-[#00FF88] flex items-center justify-center text-black"
        >
          {p_value ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="block"
            >
              <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-pause-fill"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5" />
            </svg>
          )}
        </div>

        <SkipForward />
      </div>

      <div className="flex-1 text-right text-sm text-gray-400">0:00 / 3:32</div>
    </div>
  );
}

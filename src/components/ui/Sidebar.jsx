export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#0f0f0f] p-5 text-gray-300">
      <h1 className="text-green-400 text-xl font-bold mb-8">
         MusicFlow
      </h1>

      <ul className="space-y-4">
        <li className="text-green-400">Home</li>
        <li>Search</li>
        <li>Your Library</li>
        <li>Liked Songs</li>
      </ul>

      <div className="mt-10">
        <h2 className="text-sm text-gray-500 mb-3">Playlists</h2>
        <ul className="space-y-2 text-sm">
          <li>Chill Vibes</li>
          <li>Workout Energy</li>
          <li>Focus Flow</li>
        </ul>
      </div>
    </aside>
  );
}

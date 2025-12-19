export default function PlaylistCard({ title, artist }) {
  return (
    <div className="bg-[#181818] rounded-xl p-4 hover:bg-[#222] transition">
      <div className="h-32 bg-gray-700 rounded-lg mb-3"></div>
      <h3 className="font-medium">{title}</h3>
      <p className="text-sm text-gray-400">{artist}</p>
    </div>
  );
}

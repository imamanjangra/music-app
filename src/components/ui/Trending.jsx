import PlaylistCard from "./PlaylistCard";

export default function Trending() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">
        Trending Now
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        <PlaylistCard title="Midnight Dreams" artist="Luna Eclipse" />
        <PlaylistCard title="Echoes in the Wind" artist="The Wanderers" />
        <PlaylistCard title="City Lights" artist="Urban Soul" />
        <PlaylistCard title="Sunset Boulevard" artist="Neon Vibes" />
        <PlaylistCard title="Acoustic Dreams" artist="Sarah Mitchell" />
      </div>
    </section>
  );
}

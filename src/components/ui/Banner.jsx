import { useState, useEffect } from "react";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { useMusicPlayer } from "../../context/MusicContext";
import useBannersApi from "../Hooks/banners_api";

export default function Banner() {
  const { banners, loading, error } = useBannersApi();
  const { playSelectedSong } = useMusicPlayer();
  const [currentBanner, setCurrentBanner] = useState(0);

  // Auto-slide banners
  useEffect(() => {
    if (banners.length === 0) return;

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const handlePlayBanner = (song) => {
    playSelectedSong(song);
  };

  if (loading) {
    return (
      <div className="relative w-full h-64 bg-muted rounded-2xl animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-muted-foreground">Loading banners...</div>
        </div>
      </div>
    );
  }

  if (error || banners.length === 0) {
    return (
      <div className="relative w-full h-64 bg-muted rounded-2xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-muted-foreground">No banners available</div>
        </div>
      </div>
    );
  }

  const banner = banners[currentBanner];

  console.log("Current banner:", banner);
  console.log("Banner image URL:", banner?.image);

  return (
    <div className="relative w-full h-64 rounded-2xl overflow-hidden group">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: banner?.image
            ? `url(${banner.image})`
            : "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
        onError={(e) => {
          console.error("Banner image failed to load:", banner?.image);
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center p-8">
        <div className="text-white max-w-md">
          <h2 className="text-3xl font-bold mb-2 line-clamp-2">
            {banner.title}
          </h2>
          <p className="text-lg text-gray-200 mb-4">{banner.subtitle}</p>
          <button
            onClick={() => handlePlayBanner(banner.song)}
            className="flex items-center gap-2 bg-neon-green hover:bg-neon-green-hover text-black px-6 py-3 rounded-full font-semibold transition-colors"
          >
            <Play className="w-5 h-5" />
            Play Now
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevBanner}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextBanner}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentBanner ? "bg-neon-green" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

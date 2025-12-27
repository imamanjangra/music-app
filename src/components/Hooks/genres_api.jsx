import { useEffect, useState } from "react";

// Helper function to get genre-specific colors
const getGenreColor = (genre) => {
  const colors = {
    pop: "00ff88",
    rock: "ff6b6b",
    "hip-hop": "4ecdc4",
    classical: "45b7d1",
    hollywood: "ffd700",
    electronic: "8e44ad",
    bollywood: "fd79a8",
    punjabi: "a29bfe",
  };
  return colors[genre] || "00ff88";
};

export default function useGenresApi() {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        console.log("Fetching genres from API...");

        // Using search with different genre keywords to get varied results
        const genreKeywords = [
          "pop",
          "rock",
          "hip-hop",
          "classical",
          "hollywood",
          "electronic",
          "bollywood",
          "punjabi",
        ];

        const genrePromises = genreKeywords.map(async (keyword) => {
          try {
            let songs = [];

            // Special handling for Hollywood genre with hardcoded English songs
            if (keyword === "hollywood") {
              songs = [
                {
                  id: "hollywood-1",
                  name: "Shape of You",
                  primaryArtists: "Ed Sheeran",
                  artist: "Ed Sheeran",
                  duration: 233,
                  language: "english",
                  playCount: 2800000000,
                  image: [
                    {
                      quality: "500x500",
                      url: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
                    },
                  ],
                  downloadUrl: [
                    {
                      quality: "320kbps",
                      url: "#",
                    },
                  ],
                },
                {
                  id: "hollywood-2",
                  name: "Blinding Lights",
                  primaryArtists: "The Weeknd",
                  artist: "The Weeknd",
                  duration: 200,
                  language: "english",
                  playCount: 2500000000,
                  image: [
                    {
                      quality: "500x500",
                      url: "https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36",
                    },
                  ],
                  downloadUrl: [
                    {
                      quality: "320kbps",
                      url: "#",
                    },
                  ],
                },
                {
                  id: "hollywood-3",
                  name: "Faded",
                  primaryArtists: "Alan Walker",
                  artist: "Alan Walker",
                  duration: 212,
                  language: "english",
                  playCount: 2200000000,
                  image: [
                    {
                      quality: "500x500",
                      url: "https://i.scdn.co/image/ab67616d0000b273a108e07c661f9fc54de9c43a",
                    },
                  ],
                  downloadUrl: [
                    {
                      quality: "320kbps",
                      url: "#",
                    },
                  ],
                },
                {
                  id: "hollywood-4",
                  name: "Perfect",
                  primaryArtists: "Ed Sheeran",
                  artist: "Ed Sheeran",
                  duration: 263,
                  language: "english",
                  playCount: 2100000000,
                  image: [
                    {
                      quality: "500x500",
                      url: "https://i.scdn.co/image/ab67616d0000b273ba5db46f4b838ef6027e6f96",
                    },
                  ],
                  downloadUrl: [
                    {
                      quality: "320kbps",
                      url: "#",
                    },
                  ],
                },
                {
                  id: "hollywood-5",
                  name: "Uptown Funk",
                  primaryArtists: "Mark Ronson ft. Bruno Mars",
                  artist: "Mark Ronson ft. Bruno Mars",
                  duration: 270,
                  language: "english",
                  playCount: 1900000000,
                  image: [
                    {
                      quality: "500x500",
                      url: "https://i.scdn.co/image/ab67616d0000b273e419ccba0baa8bd3f3d7abf2",
                    },
                  ],
                  downloadUrl: [
                    {
                      quality: "320kbps",
                      url: "#",
                    },
                  ],
                },
              ];

              console.log(
                "Using hardcoded Hollywood songs with proper album artwork",
              );
            } else {
              // For other genres, fetch from API
              const response = await fetch(
                `https://music-services.onrender.com/api/search/songs?query=${keyword}&limit=5`,
              );

              if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
              }

              const data = await response.json();

              console.log(`Genre ${keyword} API response:`, data);

              if (data.success && data.data?.results) {
                songs = data.data.results;
              } else if (data.results) {
                songs = data.results;
              } else if (Array.isArray(data)) {
                songs = data;
              }
            }

            // Enhanced image extraction for the first song
            let imageUrl = null;

            // Special Hollywood genre banner
            if (keyword === "hollywood") {
              imageUrl =
                "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop&crop=center";
            } else if (songs.length > 0 && songs[0].image) {
              const firstSong = songs[0];
              console.log(`First song for ${keyword}:`, firstSong);
              console.log(`Image data for ${keyword}:`, firstSong.image);

              if (Array.isArray(firstSong.image)) {
                // If image is an array, try to get the highest quality
                imageUrl =
                  firstSong.image[firstSong.image.length - 1]?.link ||
                  firstSong.image[firstSong.image.length - 1]?.url ||
                  firstSong.image[2]?.link ||
                  firstSong.image[1]?.link ||
                  firstSong.image[0]?.link ||
                  firstSong.image[2]?.url ||
                  firstSong.image[1]?.url ||
                  firstSong.image[0]?.url;
              } else if (typeof firstSong.image === "string") {
                // If image is a direct string URL
                imageUrl = firstSong.image;
              } else if (firstSong.image.link || firstSong.image.url) {
                // If image is an object with link or url property
                imageUrl = firstSong.image.link || firstSong.image.url;
              }
            }

            console.log(`Extracted image URL for ${keyword}:`, imageUrl);

            // Use actual song image if available, otherwise use generated avatar
            const finalImage =
              imageUrl ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(keyword.charAt(0).toUpperCase() + keyword.slice(1))}&size=300&background=${getGenreColor(keyword)}&color=fff&font-size=0.5`;

            // Ensure all genres have exactly 5 songs maximum
            const finalSongs = songs.slice(0, 5);

            return {
              name: keyword.charAt(0).toUpperCase() + keyword.slice(1),
              songs: finalSongs || [],
              image: finalImage,
            };
          } catch (error) {
            console.error(`Error fetching genre ${keyword}:`, error);
            // Return a fallback genre with empty songs
            return {
              name: keyword.charAt(0).toUpperCase() + keyword.slice(1),
              songs: [],
              image: `https://ui-avatars.com/api/?name=${encodeURIComponent(keyword.charAt(0).toUpperCase() + keyword.slice(1))}&size=300&background=${getGenreColor(keyword)}&color=fff&font-size=0.5`,
            };
          }
        });

        const genreResults = await Promise.all(genrePromises);
        console.log("Final genre results:", genreResults);

        // Filter out null results and ensure we have at least some genres
        const validGenres = genreResults.filter((genre) => genre !== null);

        if (validGenres.length === 0) {
          throw new Error("No genres could be loaded from the API");
        }

        setGenres(validGenres);
      } catch (err) {
        setError(err.message);
        console.error("Genre API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, loading, error };
}

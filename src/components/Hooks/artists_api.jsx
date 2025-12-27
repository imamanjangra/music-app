import { useEffect, useState } from "react";

export default function useArtistsApi() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        setArtists([]); // Clear existing artists
        console.log("Fetching artists from API...");

        // Helper function to extract image URL
        const extractImageUrl = (item) => {
          if (!item || !item.image) return null;

          if (Array.isArray(item.image)) {
            // If image is an array, try to get the highest quality
            return (
              item.image[item.image.length - 1]?.link ||
              item.image[item.image.length - 1]?.url ||
              item.image[2]?.link ||
              item.image[1]?.link ||
              item.image[0]?.link ||
              item.image[2]?.url ||
              item.image[1]?.url ||
              item.image[0]?.url
            );
          } else if (typeof item.image === "string") {
            // If image is a direct string URL
            return item.image;
          } else if (item.image.link || item.image.url) {
            // If image is an object with link or url property
            return item.image.link || item.image.url;
          }

          return null;
        };

        // Popular artists to search for with music-themed fallback images
        const artistsData = [
          {
            name: "Arijit Singh",
            fallbackImage:
              "https://ui-avatars.com/api/?name=Arijit+Singh&size=300&background=00ff88&color=000&font-size=0.4",
            followers: 2500000,
          },
          {
            name: "Shreya Ghoshal",
            fallbackImage:
              "https://ui-avatars.com/api/?name=Shreya+Ghoshal&size=300&background=ff6b6b&color=fff&font-size=0.4",
            followers: 1800000,
          },
          {
            name: "A.R. Rahman",
            fallbackImage:
              "https://ui-avatars.com/api/?name=A.R.+Rahman&size=300&background=4ecdc4&color=000&font-size=0.4",
            followers: 3200000,
          },
          {
            name: "Lata Mangeshkar",
            fallbackImage:
              "https://ui-avatars.com/api/?name=Lata+Mangeshkar&size=300&background=45b7d1&color=fff&font-size=0.4",
            followers: 5000000,
          },
          {
            name: "Kishore Kumar",
            fallbackImage:
              "https://ui-avatars.com/api/?name=Kishore+Kumar&size=300&background=f9ca24&color=000&font-size=0.4",
            followers: 4200000,
          },
          {
            name: "Rahat Fateh Ali Khan",
            fallbackImage: "/images/rahat-fateh-ali-khan.jpg",
            followers: 1500000,
          },
          {
            name: "Sunidhi Chauhan",
            fallbackImage:
              "https://ui-avatars.com/api/?name=Sunidhi+Chauhan&size=300&background=fd79a8&color=fff&font-size=0.4",
            followers: 1200000,
          },
          {
            name: "Sonu Nigam",
            fallbackImage:
              "https://ui-avatars.com/api/?name=Sonu+Nigam&size=300&background=a29bfe&color=fff&font-size=0.4",
            followers: 1900000,
          },
        ];

        const artistPromises = artistsData.map(async (artistData) => {
          try {
            const artistName = artistData.name;

            // First try to get artist info from artist search API
            let artistFollowers = null;
            let artistApiImage = null;

            try {
              const artistResponse = await fetch(
                `https://music-services.onrender.com/api/search/artists?query=${encodeURIComponent(artistName)}&limit=1`,
              );
              const artistDataResponse = await artistResponse.json();

              console.log(
                `Artist search for ${artistName}:`,
                artistDataResponse,
              );

              if (
                artistDataResponse.success &&
                artistDataResponse.data?.results?.length > 0
              ) {
                const artistInfo = artistDataResponse.data.results[0];
                if (
                  artistInfo.name.toLowerCase() === artistName.toLowerCase()
                ) {
                  artistApiImage = extractImageUrl(artistInfo);
                  // Note: Artist API doesn't seem to have follower count, we'll get it from song data
                }
              }
            } catch (error) {
              console.log(
                `Artist API call failed for ${artistName}, continuing with song search...`,
              );
            }

            // Use song search to get songs by the artist and extract popularity data
            // Special handling for Rahat Fateh Ali Khan to get more songs
            let songLimit = 12;
            let additionalQueries = [];

            if (artistName === "Rahat Fateh Ali Khan") {
              songLimit = 20; // Get more songs for RFAK
              // Additional search queries to get more diverse songs
              additionalQueries = [
                "Rahat Fateh Ali Khan qawwali",
                "Rahat Fateh Ali Khan bollywood",
                "RFAK songs",
                "Rahat Fateh Ali Khan sufi",
              ];
            }

            const songResponse = await fetch(
              `https://music-services.onrender.com/api/search/songs?query=${encodeURIComponent(artistName)}&limit=${songLimit}`,
            );
            const songDataResponse = await songResponse.json();

            console.log(`Song search for ${artistName}:`, songDataResponse);

            let songs = [];
            if (songDataResponse.success && songDataResponse.data?.results) {
              songs = songDataResponse.data.results;
            } else if (songDataResponse.results) {
              songs = songDataResponse.results;
            } else if (Array.isArray(songDataResponse)) {
              songs = songDataResponse;
            }

            // For Rahat Fateh Ali Khan, fetch additional songs from different search queries
            if (
              artistName === "Rahat Fateh Ali Khan" &&
              additionalQueries.length > 0
            ) {
              console.log(
                "Fetching additional songs for Rahat Fateh Ali Khan...",
              );

              for (const query of additionalQueries) {
                try {
                  const additionalResponse = await fetch(
                    `https://music-services.onrender.com/api/search/songs?query=${encodeURIComponent(query)}&limit=8`,
                  );
                  const additionalData = await additionalResponse.json();

                  let additionalSongs = [];
                  if (additionalData.success && additionalData.data?.results) {
                    additionalSongs = additionalData.data.results;
                  } else if (additionalData.results) {
                    additionalSongs = additionalData.results;
                  } else if (Array.isArray(additionalData)) {
                    additionalSongs = additionalData;
                  }

                  // Filter and add unique songs
                  const newSongs = additionalSongs.filter((newSong) => {
                    const isDuplicate = songs.some(
                      (existingSong) => existingSong.id === newSong.id,
                    );
                    const isRelevant =
                      newSong.primaryArtists?.toLowerCase().includes("rahat") ||
                      newSong.artists?.primary?.some((artist) =>
                        artist.name?.toLowerCase().includes("rahat"),
                      );
                    return !isDuplicate && isRelevant;
                  });

                  songs = [...songs, ...newSongs];
                  console.log(
                    `Added ${newSongs.length} new songs from query: ${query}`,
                  );
                } catch (error) {
                  console.error(
                    `Error fetching additional songs for query ${query}:`,
                    error,
                  );
                }
              }

              console.log(
                `Total songs found for Rahat Fateh Ali Khan: ${songs.length}`,
              );
            }

            if (songs && songs.length > 0) {
              // Filter songs to get ones that actually match the artist
              const artistSongs = songs.filter((song) => {
                const songArtists = song.primaryArtists || song.artist || "";
                const artistsArray = song.artists?.primary || [];

                return (
                  songArtists
                    .toLowerCase()
                    .includes(artistName.toLowerCase()) ||
                  artistsArray.some(
                    (artist) =>
                      artist.name &&
                      artist.name
                        .toLowerCase()
                        .includes(artistName.toLowerCase()),
                  )
                );
              });

              // Use filtered songs if available, otherwise use all songs
              // For Rahat Fateh Ali Khan, allow up to 15 songs, for others keep at 8
              const maxSongs = artistName === "Rahat Fateh Ali Khan" ? 15 : 8;
              const finalSongs =
                artistSongs.length > 0
                  ? artistSongs.slice(0, maxSongs)
                  : songs.slice(0, maxSongs);

              // Calculate follower count based on average play count of top songs
              let totalPlayCount = 0;
              let songCount = 0;

              finalSongs.forEach((song) => {
                if (song.playCount && typeof song.playCount === "number") {
                  totalPlayCount += song.playCount;
                  songCount++;
                }
              });

              // Calculate estimated followers based on average play count
              // Using a formula: average play count / 10 (rough estimation)
              if (songCount > 0) {
                const avgPlayCount = totalPlayCount / songCount;
                artistFollowers = Math.floor(avgPlayCount / 10);
                console.log(
                  `${artistName} - Avg play count: ${avgPlayCount}, Estimated followers: ${artistFollowers}`,
                );
              }

              // If no play count data available, use static fallback
              if (!artistFollowers || artistFollowers < 10000) {
                artistFollowers = artistData.followers;
                console.log(
                  `${artistName} - Using fallback followers: ${artistFollowers}`,
                );
              }

              // Try to get artist image from the API first
              let artistImage = null;

              // Special case for Rahat Fateh Ali Khan - always use local image
              if (artistName === "Rahat Fateh Ali Khan") {
                artistImage = "/images/rahat-fateh-ali-khan.jpg";
              } else {
                // Use artist API image if available
                if (artistApiImage) {
                  artistImage = artistApiImage;
                } else {
                  // Look for artist-specific images in the song data
                  for (const song of finalSongs) {
                    if (song.artists?.primary) {
                      for (const artist of song.artists.primary) {
                        if (
                          artist.name &&
                          artist.name
                            .toLowerCase()
                            .includes(artistName.toLowerCase()) &&
                          artist.image
                        ) {
                          artistImage = extractImageUrl(artist);
                          if (artistImage) break;
                        }
                      }
                      if (artistImage) break;
                    }
                  }
                }
              }

              // If no artist image found, use a high-quality placeholder with cache busting
              if (!artistImage) {
                // Special case for Rahat Fateh Ali Khan - use local image
                if (artistName === "Rahat Fateh Ali Khan") {
                  artistImage = "/images/rahat-fateh-ali-khan.jpg";
                } else {
                  artistImage = `${artistData.fallbackImage}&t=${Date.now()}`;
                }
              } else {
                // Add cache busting to API images too
                artistImage = `${artistImage}${artistImage.includes("?") ? "&" : "?"}t=${Date.now()}`;
              }

              console.log(`Final image URL for ${artistName}:`, artistImage);
              console.log(
                `Final followers for ${artistName}:`,
                artistFollowers,
              );

              return {
                id: artistName.replace(/\s+/g, "-").toLowerCase(),
                name: artistName,
                image: artistImage,
                songs: finalSongs,
                followers: artistFollowers, // Use API-derived follower count
              };
            }
          } catch (error) {
            console.error(`Error fetching data for ${artistData.name}:`, error);
          }
          return null;
        });

        const artistResults = await Promise.all(artistPromises);
        console.log("Final artist results:", artistResults);
        setArtists(artistResults.filter((artist) => artist !== null));
      } catch (err) {
        setError(err.message);
        console.error("Artist API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtists();
  }, []);

  return { artists, loading, error };
}

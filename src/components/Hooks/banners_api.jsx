import { useEffect, useState } from "react";

export default function useBannersApi() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);

        console.log("Fetching banners from API...");

        // Fetch trending songs for banners from the new API
        const response = await fetch(
          "https://music-services.onrender.com/api/search/songs?query=trending&limit=5",
        );
        const data = await response.json();

        console.log("Banner API Response:", data);

        let bannerData = [];

        if (data.success && data.data?.results) {
          console.log("Using data.data.results structure");
          bannerData = data.data.results.map((song, index) => {
            console.log(`Song ${index}:`, song);
            console.log(`Song ${index} image:`, song.image);

            // Try multiple ways to extract image URL
            let imageUrl = null;
            if (song.image) {
              if (Array.isArray(song.image)) {
                // If image is an array, try to get the highest quality
                imageUrl =
                  song.image[song.image.length - 1]?.link ||
                  song.image[song.image.length - 1]?.url ||
                  song.image[2]?.link ||
                  song.image[1]?.link ||
                  song.image[0]?.link ||
                  song.image[2]?.url ||
                  song.image[1]?.url ||
                  song.image[0]?.url;
              } else if (typeof song.image === "string") {
                // If image is a direct string URL
                imageUrl = song.image;
              } else if (song.image.link || song.image.url) {
                // If image is an object with link or url property
                imageUrl = song.image.link || song.image.url;
              }
            }

            console.log(`Extracted image URL for song ${index}:`, imageUrl);

            return {
              id: song.id,
              title: song.name || song.title,
              subtitle: song.primaryArtists || song.artist || "Unknown Artist",
              image: imageUrl,
              song: song,
              type: "trending",
            };
          });
        } else if (data.results) {
          console.log("Using data.results structure");
          bannerData = data.results.slice(0, 5).map((song, index) => {
            console.log(`Song ${index}:`, song);
            console.log(`Song ${index} image:`, song.image);

            // Try multiple ways to extract image URL
            let imageUrl = null;
            if (song.image) {
              if (Array.isArray(song.image)) {
                imageUrl =
                  song.image[song.image.length - 1]?.link ||
                  song.image[song.image.length - 1]?.url ||
                  song.image[2]?.link ||
                  song.image[1]?.link ||
                  song.image[0]?.link ||
                  song.image[2]?.url ||
                  song.image[1]?.url ||
                  song.image[0]?.url;
              } else if (typeof song.image === "string") {
                imageUrl = song.image;
              } else if (song.image.link || song.image.url) {
                imageUrl = song.image.link || song.image.url;
              }
            }

            console.log(`Extracted image URL for song ${index}:`, imageUrl);

            return {
              id: song.id,
              title: song.name || song.title,
              subtitle: song.primaryArtists || song.artist || "Unknown Artist",
              image: imageUrl,
              song: song,
              type: "trending",
            };
          });
        } else if (Array.isArray(data)) {
          console.log("Using direct array structure");
          bannerData = data.slice(0, 5).map((song, index) => {
            console.log(`Song ${index}:`, song);
            console.log(`Song ${index} image:`, song.image);

            // Try multiple ways to extract image URL
            let imageUrl = null;
            if (song.image) {
              if (Array.isArray(song.image)) {
                imageUrl =
                  song.image[song.image.length - 1]?.link ||
                  song.image[song.image.length - 1]?.url ||
                  song.image[2]?.link ||
                  song.image[1]?.link ||
                  song.image[0]?.link ||
                  song.image[2]?.url ||
                  song.image[1]?.url ||
                  song.image[0]?.url;
              } else if (typeof song.image === "string") {
                imageUrl = song.image;
              } else if (song.image.link || song.image.url) {
                imageUrl = song.image.link || song.image.url;
              }
            }

            console.log(`Extracted image URL for song ${index}:`, imageUrl);

            return {
              id: song.id,
              title: song.name || song.title,
              subtitle: song.primaryArtists || song.artist || "Unknown Artist",
              image: imageUrl,
              song: song,
              type: "trending",
            };
          });
        }

        console.log("Processed banner data:", bannerData);
        setBanners(bannerData);
      } catch (err) {
        setError(err.message);
        console.error("Banner API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  return { banners, loading, error };
}

import { useEffect, useState } from "react";

export default function useMusicApi() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMusic = async () => {
      try {
        setLoading(true);

        console.log("Fetching music from new API...");

        // Fetch popular songs from the new API
        const response = await fetch(
          "https://music-services.onrender.com/api/search/songs?query=popular&limit=20",
        );
        const data = await response.json();

        console.log("API Response:", data);

        let songsData = [];

        if (data.success && data.data?.results) {
          songsData = data.data.results;
          console.log("Found songs in data.data.results:", songsData.length);
        } else if (data.results) {
          songsData = data.results;
          console.log("Found songs in data.results:", songsData.length);
        } else if (Array.isArray(data)) {
          songsData = data;
          console.log("Found songs in direct array:", songsData.length);
        }

        if (songsData.length > 0) {
          console.log("First song structure:", songsData[0]);
          setSongs(songsData);
          // Set first song as current if none selected
          if (!currentSong) {
            setCurrentSong(songsData[0]);
          }
        } else {
          console.warn("No songs found in API response");
        }
      } catch (err) {
        setError(err.message);
        console.error("Music API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMusic();
  }, []);

  const playSong = (song) => {
    setCurrentSong(song);
  };

  const getNextSong = () => {
    if (!currentSong || songs.length === 0) return null;
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const nextIndex = (currentIndex + 1) % songs.length;
    return songs[nextIndex];
  };

  const getPreviousSong = () => {
    if (!currentSong || songs.length === 0) return null;
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    return songs[prevIndex];
  };

  const playNext = () => {
    const nextSong = getNextSong();
    if (nextSong) setCurrentSong(nextSong);
  };

  const playPrevious = () => {
    const prevSong = getPreviousSong();
    if (prevSong) setCurrentSong(prevSong);
  };

  return {
    songs,
    currentSong,
    loading,
    error,
    playSong,
    playNext,
    playPrevious,
    getNextSong,
    getPreviousSong,
  };
}

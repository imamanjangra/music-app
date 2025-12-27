import React, {
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";

const MusicContext = createContext();

export const useMusicPlayer = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within MusicProvider");
  }
  return context;
};

export const MusicProvider = ({ children }) => {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // Fetch music data
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

  // Initialize audio when current song changes
  useEffect(() => {
    if (!currentSong) return;

    console.log(
      "Setting up audio for song:",
      currentSong.name || currentSong.title,
    );

    // Clean up previous audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.removeEventListener("timeupdate", updateProgress);
      audioRef.current.removeEventListener("loadedmetadata", updateDuration);
      audioRef.current.removeEventListener("ended", handleSongEnd);
      audioRef.current.removeEventListener("error", handleAudioError);
      audioRef.current.removeEventListener("canplay", handleCanPlay);
    }

    // Reset progress when changing songs
    setProgress(0);
    setDuration(0);

    // Get the best quality audio URL - updated for new API structure
    const audioUrl =
      currentSong.downloadUrl?.[4]?.link ||
      currentSong.downloadUrl?.[3]?.link ||
      currentSong.downloadUrl?.[2]?.link ||
      currentSong.downloadUrl?.[1]?.link ||
      currentSong.downloadUrl?.[0]?.link ||
      currentSong.downloadUrl?.[4]?.url ||
      currentSong.downloadUrl?.[3]?.url ||
      currentSong.downloadUrl?.[2]?.url ||
      currentSong.downloadUrl?.[1]?.url ||
      currentSong.downloadUrl?.[0]?.url ||
      currentSong.url ||
      currentSong.streamUrl;

    if (!audioUrl) {
      console.error(
        "No audio URL found for song:",
        currentSong.name || currentSong.title,
      );
      console.log("Song object:", currentSong);
      return;
    }

    console.log("Setting up audio with URL:", audioUrl);

    const audio = new Audio();

    // Set CORS mode for cross-origin requests
    audio.crossOrigin = "anonymous";
    audio.src = audioUrl;

    audioRef.current = audio;

    // Set volume
    audio.volume = volume / 100;

    // Add event listeners
    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleSongEnd);
    audio.addEventListener("error", handleAudioError);
    audio.addEventListener("canplay", handleCanPlay);

    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener("timeupdate", updateProgress);
        audio.removeEventListener("loadedmetadata", updateDuration);
        audio.removeEventListener("ended", handleSongEnd);
        audio.removeEventListener("error", handleAudioError);
        audio.removeEventListener("canplay", handleCanPlay);
      }
    };
  }, [currentSong, volume]);

  const updateProgress = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  const updateDuration = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleCanPlay = () => {
    console.log("Audio can play:", currentSong?.name || currentSong?.title);
  };

  const handleSongEnd = () => {
    console.log("Song ended, playing next...");
    setIsPlaying(false);
    playNext();
  };

  const handleAudioError = (e) => {
    console.error("Audio playback error:", e);
    console.error("Error details:", e.target?.error);
    setIsPlaying(false);
  };

  // Play/pause control
  useEffect(() => {
    if (!audioRef.current) return;

    if (isPlaying) {
      console.log("Starting playback...");
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("Playback started successfully");
          })
          .catch((error) => {
            console.error("Playback failed:", error);
            setIsPlaying(false);
          });
      }
    } else {
      console.log("Pausing playback...");
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  const togglePlayPause = () => {
    console.log("Toggle play/pause. Current state:", isPlaying);
    setIsPlaying(!isPlaying);
  };

  const seekTo = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setProgress(time);
    }
  };

  const changeVolume = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const playSelectedSong = (song) => {
    console.log("Playing selected song:", song.name || song.title);
    setCurrentSong(song);
    setIsPlaying(true);
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
    if (nextSong) {
      console.log("Playing next song:", nextSong.name || nextSong.title);
      setCurrentSong(nextSong);
      setIsPlaying(true);
    }
  };

  const playPrevious = () => {
    const prevSong = getPreviousSong();
    if (prevSong) {
      console.log("Playing previous song:", prevSong.name || prevSong.title);
      setCurrentSong(prevSong);
      setIsPlaying(true);
    }
  };

  const skipNext = () => {
    playNext();
  };

  const skipPrevious = () => {
    playPrevious();
  };

  const value = {
    // Music data
    songs,
    currentSong,
    loading,
    error,

    // Playback state
    isPlaying,
    volume,
    progress,
    duration,

    // Controls
    togglePlayPause,
    seekTo,
    changeVolume,
    playSelectedSong,
    skipNext,
    skipPrevious,

    // Audio ref for advanced controls
    audioRef,
  };

  return (
    <MusicContext.Provider value={value}>{children}</MusicContext.Provider>
  );
};

import axios from "axios";
import { useEffect, useState } from "react";

export default function useAlbumSongs(id) {
  const [value, setValue] = useState(null);
  // console.log("hook id" , id);
  useEffect(() => {
    if (!id) return; // very important

    const fetchSong = async () => {
      try {
        const resp = await axios.get(
          `https://saavn.sumit.co/api/albums?id=${id}`,
        );
        // console.log("API DATA:", resp.data);
        setValue(resp.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchSong();
  }, [id]);

  return value;
}

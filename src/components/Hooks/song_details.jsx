import axios from "axios";
import { useEffect, useState } from "react";

export default function useSongDetails() {
  const [value, setValue] = useState(null);

  const Api = "https://saavn.sumit.co/api/songs/prJPLljw";

  const fetchSong = async () => {
    try {
      const resp = await axios.get(Api);
      console.log(resp.data);
      setValue(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSong();
  }, []);

  return value;
}

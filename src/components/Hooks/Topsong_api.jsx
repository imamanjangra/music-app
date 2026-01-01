import axios from "axios";
import { useEffect, useState } from "react";

export default function Topsong_api() {
  const [value, setvalue] = useState();
  const AlbumApi =
    "https://saavn.sumit.co/api/search/albums?query=arijit&limit=10";

  const fetchData = async () => {
    try {
      const resp = await axios.get(AlbumApi);
      setvalue(resp.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return value;
}

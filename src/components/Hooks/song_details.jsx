import axios from "axios";
import { useEffect, useState } from "react";

export default function Song_details(id) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get(`https://saavn.sumit.co/api/songs/${id}`)
      .then((res) => setData(res.data))
      .catch(console.log);
  }, [id]);

  return data;
}

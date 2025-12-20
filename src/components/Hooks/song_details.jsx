import { useEffect, useState } from "react";

export default function song_details() {
    const [value , setvalue] = useState();
    
    useEffect(()=>{
        fetch(`https://saavn.sumit.co/api/songs/0W6DtW_N`)
        .then(res => res.json())
        .then(data => setvalue(data))
    } ,[])

    return value
};

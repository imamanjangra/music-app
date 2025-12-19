import { useEffect, useState } from "react";

export default function song_details() {
    const [value , setvalue] = useState();
    
    useEffect(()=>{
        fetch(`https://saavn.sumit.co/api/search/songs?query=Believer&page=0&limit=10`)
        .then(res => res.json())
        .then(data => setvalue(data))
    } ,[])

    return value
};

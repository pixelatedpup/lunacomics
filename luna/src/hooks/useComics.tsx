import { useEffect,useState } from "react";
import { fetchComics, type Comic } from "../api/comicApi";

export const useComics = () => {
    const [comicsDb, setComicDB] = useState<Comic[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(()=>{
        fetchComics()
        .then ((data) => {
            setComicDB(data);
            setLoading(false);
        })
        .catch((err)=>{
            console.error(err);
            setError(err);
            setLoading(false);
        });

    }, [])
    return{comicsDb, loading, error};
}


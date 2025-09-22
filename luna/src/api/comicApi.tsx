export interface Comic{
    _id:string;
    title:string;
    description:string;
    author: number;
    imageId: number;
    tag:{_id:string; name:string}[];
    genre:{_id:string; name:string}[];
    volume:number;
}

const API_BASE="http://localhost:8000/api";

export async function fetchComics():Promise<Comic[]> {
    const res = await fetch(`${API_BASE}/comics`);
    if(!res.ok) throw new Error("Failed to fetch comics");
    return res.json();
}

export async function fetchComicByTag(tagName:string):Promise<Comic[]> {
    const res = await fetch(`${API_BASE}/comics/by-tag/${tagName}`);
    if(!res.ok) throw new Error("Failed to fetch comics");
    return res.json();
}
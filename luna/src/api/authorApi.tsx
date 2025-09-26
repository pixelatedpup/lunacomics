export interface Creator{
    _id: string;
    name:string;
    username: string;
    dateCreated: string;
    followersCount: number;
    imageId:number;
    
}

const API_BASE = "http://localhost:8000/api";

//Fetches all creators
export async function fetchCreators():Promise<Creator[]> {
    const res = await fetch(`${API_BASE}/user/creator`);
    if(!res.ok) throw new Error("Failed to fetch creators");
    return res.json();
}

//Fetches on creator based on author id;
export async function fetchCreatorOne(authorId:string):Promise<Creator> {
    const res = await fetch(`${API_BASE}/user/creator/${authorId}`);
    if(!res.ok) throw new Error(`Failed to fetch creator with id: ${authorId}`);
    return res.json();
}
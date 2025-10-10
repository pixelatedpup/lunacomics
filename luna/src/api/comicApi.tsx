export interface Comic{
    _id:string;
    title:string;
    description:string;
    author: {_id:string; name:string; username:string; dateCreated:string; followersCount:number}[];
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

export async function fetchUserLibrary(userId: string): Promise<Comic[]>{
    const res = await fetch(`${API_BASE}/user/library/${userId}`);
    if(!res.ok) throw new Error("Failed to fetch user library");
    return res.json();
}

export async function addToLibrary(comicId: string, token: string): Promise<Comic[]> {
    const res = await fetch(`${API_BASE}/user/library/add`, {
        method: "POST", //Specifise that its a post method
        headers: {
            "Content-Type": "application/json", //Tells the server the body that is being sent is JSON and not html
            "Authorization": `Bearer ${token}` //Proves who the user is through authentication. JSON Web Token
        },
        body:JSON.stringify({comicId})//Turns from the fetch String to a a JSON Object.
    })

    if(!res.ok) throw new Error("Failed to add to library");
    return res.json();
}

export async function removeFromLibrary(comicId: string, token: string): Promise<Comic[]> {
    const res = await fetch(`${API_BASE}/user/library/remove`, {
        method: "POST", //Specifise that its a post method
        headers: {
            "Content-Type": "application/json", //Tells the server the body that is being sent is JSON and not html
            "Authorization": `Bearer ${token}` //Proves who the user is through authentication. JSON Web Token
        },
        body:JSON.stringify({comicId})//Turns from the fetch String to a a JSON Object.
    })

    if(!res.ok) throw new Error("Failed to remove from library");
    return res.json();
}

export async function addComic(comicData:{title: string; description: string; volume: number; genre:string; imageId: number}, token:string):Promise<Comic>{
    const res = await fetch(`${API_BASE}/user/comic/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(comicData)
    })

    if(!res.ok){
     throw new Error("Failed to save new comic");
    }

    return res.json();
}
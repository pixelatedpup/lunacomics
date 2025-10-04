export interface CreatorUse{
    _id: string;
    name:string;
    username: string;
    dateCreated: string;
    followersCount: number;
    followers?:{_id: string; name?:string; username?: string}[];
    imageId:number;
    
}

const API_BASE = "http://localhost:8000/api";

//Fetches all creators
export async function fetchCreators():Promise<CreatorUse[]> {
    const res = await fetch(`${API_BASE}/user/creator`);
    if(!res.ok) throw new Error("Failed to fetch creators");
    return res.json();
}

//Fetches on creator based on author id;
export async function fetchCreatorOne(authorId:string):Promise<CreatorUse> {
    const res = await fetch(`${API_BASE}/user/creator/${authorId}`);
    if(!res.ok) throw new Error(`Failed to fetch creator with id: ${authorId}`);
    return res.json();
}

//Follow authors
export async function followAuthor(creatorId: string, token: string): Promise<CreatorUse> {
    const res = await fetch(`${API_BASE}/user/follow`, {
        method: "POST", //Specifise that its a post method
        headers: {
            "Content-Type": "application/json", //Tells the server the body that is being sent is JSON and not html
            "Authorization": `Bearer ${token}` //Proves who the user is through authentication. JSON Web Token
        },
        body:JSON.stringify({creatorId: creatorId})//Turns from the fetch String to a a JSON Object.
    })

    if(!res.ok) throw new Error("Failed to follow authors");
    return res.json();
}

export async function unfollowAuthor(creatorId: string, token: string): Promise<CreatorUse> {
    const res = await fetch(`${API_BASE}/user/unfollow`, {
        method: "POST", //Specifise that its a post method
        headers: {
            "Content-Type": "application/json", //Tells the server the body that is being sent is JSON and not html
            "Authorization": `Bearer ${token}` //Proves who the user is through authentication. JSON Web Token
        },
        body:JSON.stringify({creatorId: creatorId})//Turns from the fetch String to a a JSON Object.
    })

    if(!res.ok) throw new Error("Failed to unfollow authors");
    return res.json();
}
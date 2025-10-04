export interface UserType{
    _id: string;
    name:string;
    username: string;
    isCreator: boolean;
    
}

const API_BASE = "http://localhost:8000/api";

export async function fetchUserOne(userId:string):Promise<UserType> {
    const res = await fetch(`${API_BASE}/user/${userId}`);
    if(!res.ok) throw new Error(`Failed to fetch user with id: ${userId}`);
    return res.json();
}
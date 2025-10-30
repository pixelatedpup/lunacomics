import { API_BASE } from "../config";

export interface Comic {
  _id: string;
  title: string;
  description: string;
  author: {
    _id: string;
    name: string;
    username: string;
    dateCreated: string;
    followersCount: number;
  }[];
  imageId: number;
  tag: { _id: string; name: string }[];
  genre: { _id: string; name: string }[];
  volume: number;
}

export async function fetchComics(): Promise<Comic[]> {
  const res = await fetch(`${API_BASE}/api/comics`);
  if (!res.ok) throw new Error("Failed to fetch comics");
  return res.json();
}

export async function fetchComicByTag(tagName: string): Promise<Comic[]> {
  const res = await fetch(`${API_BASE}/api/comics/by-tag/${tagName}`);
  if (!res.ok) throw new Error("Failed to fetch comics");
  return res.json();
}

export async function fetchUserLibrary(userId: string): Promise<Comic[]> {
  const res = await fetch(`${API_BASE}/api/user/library/${userId}`);
  if (!res.ok) throw new Error("Failed to fetch user library");
  return res.json();
}

export async function addToLibrary(comicId: string, token: string): Promise<Comic[]> {
  const res = await fetch(`${API_BASE}/api/user/library/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comicId }),
  });

  if (!res.ok) throw new Error("Failed to add to library");
  return res.json();
}

export async function removeFromLibrary(comicId: string, token: string): Promise<Comic[]> {
  const res = await fetch(`${API_BASE}/api/user/library/remove`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ comicId }),
  });

  if (!res.ok) throw new Error("Failed to remove from library");
  return res.json();
}

export async function addComic(
  comicData: { title: string; description: string; volume: number; genre: string; imageId: number },
  token: string
): Promise<Comic> {
  const res = await fetch(`${API_BASE}/api/user/comic/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(comicData),
  });

  if (!res.ok) throw new Error("Failed to save new comic");
  return res.json();
}

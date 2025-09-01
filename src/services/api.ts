import {BASE_URL} from "../constants/apiUrl.ts";

export const fetchUsers = async () => {
  const res = await fetch(`${BASE_URL}/users?select=id,firstName,lastName,age,email,username,bank`);
  if (!res.ok) throw new Error("Failed to fetch users");
  const data = await res.json();
  return data.users;
};

export const fetchUserDetailById = async (userId) => {
  const res = await fetch(`${BASE_URL}/users/${userId}?select=id,firstName,lastName,age,email,username,bank`);
  if (!res.ok) throw new Error("Failed to fetch user details");
  const data = await res.json();
  return data;
};

export const fetchLimits = async () => {
  const res = await fetch(`${BASE_URL}/c/a022-21ef-4179-910f`);
  if (!res.ok) throw new Error("Failed to fetch limits");
  const data = await res.json();
  return data;
};

export const fetchAvatars = async () => {
  const res = await fetch(`https://picsum.photos/v2/list?page=2&limit=10`);
  if (!res.ok) throw new Error("Failed to fetch avatars");
  const data = await res.json();
  return data;
};

export const fetchAvatar = async (id : number) => {
  const res = await fetch(`https://picsum.photos/id/${id}/info`);
  if (!res.ok) throw new Error("Failed to fetch avatar");
  const data = await res.json();
  return data;
};



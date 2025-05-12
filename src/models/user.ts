import { v4 as uuid } from 'uuid';

export interface UserEntity {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

// In‑memory “DB”
export const users: UserEntity[] = [];

export const createUser = (data: Omit<UserEntity, 'id'>): UserEntity => {
  const user = { ...data, id: uuid() };
  users.push(user);
  return user;
};

export const findUser = (id: string) => users.find((u) => u.id === id);

export const updateUser = (id: string, payload: Partial<UserEntity>) => {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return null;
  users[idx] = { ...users[idx], ...payload, id };
  return users[idx];
};

export const deleteUser = (id: string) => {
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) return false;
  users.splice(idx, 1);
  return true;
};

import { urls } from "./urls";
import { generateClient } from "./client";
import { IUser } from "../types/users.type";

type fetchAllUsers = (page: number, limit: number) => Promise<IUser[]>;
export const fetchAllUsers: fetchAllUsers = async (page, limit) => {
  const client = generateClient();
  const response = await client.get<{ users: IUser[] }>(
    `/users?skip=${(page - 1) * limit}&limit=${limit}`
  );
  return response.data.users;
};


type fetchUsersListByIds = (_: Array<number>) => Promise<Array<IUser>>;
export const fetchUsersListByIds: fetchUsersListByIds = async (ids) => {
  const client = generateClient();
  const responses = await Promise.all(
    ids.map((id) => {
      return client.get<IUser>(urls.users.byId(id));
    })
  );
  const data: IUser[] = [];
  for (const r of responses) {
    data.push(r.data);
  }
  return data;
};

type fetchSingleUserById = (_: number) => Promise<IUser>;
export const fetchSingleUserById: fetchSingleUserById = async (id) => {
  const client = generateClient();
  const response = await client.get<IUser>(urls.users.byId(id));
  return response.data;
};

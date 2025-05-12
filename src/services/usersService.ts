import {
  UserEntity,
  users,
  findUser,
  createUser,
  updateUser,
  deleteUser,
} from '../models/user';
import { isUuid } from '../utils/uuid';

export class UsersService {
  getAll() {
    return users;
  }

  getOne(id: string) {
    if (!isUuid(id)) throw new TypeError('Invalid UUID');
    const user = findUser(id);
    if (!user) throw new ReferenceError('User not found');
    return user;
  }

  create(payload: Partial<UserEntity>) {
    const { username, age, hobbies } = payload;
    if (
      typeof username !== 'string' ||
      typeof age !== 'number' ||
      !Array.isArray(hobbies)
    )
      throw new SyntaxError('Missing required fields');
    return createUser({ username, age, hobbies });
  }

  update(id: string, payload: Partial<UserEntity>) {
    if (!isUuid(id)) throw new TypeError('Invalid UUID');
    const updated = updateUser(id, payload);
    if (!updated) throw new ReferenceError('User not found');
    return updated;
  }

  remove(id: string) {
    if (!isUuid(id)) throw new TypeError('Invalid UUID');
    const ok = deleteUser(id);
    if (!ok) throw new ReferenceError('User not found');
  }
}

export const usersService = new UsersService();

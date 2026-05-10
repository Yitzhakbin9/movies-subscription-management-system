import { promises as fs } from 'fs';
import path from 'path';
import * as userRepository from '../repositories/userRepository';
import { USER_FIELDS } from '../constants/userFields';
import ApiError from '../utils/apiError';
import { PartialUserData, UserData } from '../models/userInterface';

const USERS_FILE_PATH = path.join(__dirname, '../../data/Users.json');

const getAllUsers = (filter: Record<string, unknown> = {}) =>
  userRepository.getAllUsers(filter);

const getUserById = async (id: string) => {
  const user = await userRepository.getUserById(id);

  if (!user) {
    throw new ApiError('User not found', 404);
  }

  return user;
};

const createUser = async (userData: UserData) => {
  // Separate data for MongoDB and Users.json
  const dbData = {
    [USER_FIELDS.USER_NAME]: userData[USER_FIELDS.USER_NAME],
    [USER_FIELDS.PASSWORD]: userData[USER_FIELDS.PASSWORD],
  };

  // Create user in MongoDB (only userName and password)
  const newUser = await userRepository.createUser(dbData);

  // Add user to Users.json (full profile info)
  try {
    const usersData = await fs.readFile(USERS_FILE_PATH, 'utf-8');
    const users = JSON.parse(usersData);

    const userEntry = {
      [USER_FIELDS.ID]: newUser._id.toString(),
      [USER_FIELDS.FIRST_NAME]: userData[USER_FIELDS.FIRST_NAME],
      [USER_FIELDS.LAST_NAME]: userData[USER_FIELDS.LAST_NAME],
      [USER_FIELDS.CREATED_DATE]: new Date().toISOString(),
      [USER_FIELDS.SESSION_TIMEOUT]: userData[USER_FIELDS.SESSION_TIMEOUT],
    };

    users.push(userEntry);
    await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error updating Users.json:', error);
    // Don't throw - user was created in DB, just log the JSON file error
  }

  return newUser;
};

const updateUser = async (id: string, userData: PartialUserData) => {
  const user = await userRepository.updateUser(id, userData);

  if (!user) {
    throw new ApiError('User not found', 404);
  }

  try {
    const usersData = await fs.readFile(USERS_FILE_PATH, 'utf-8');
    const users = JSON.parse(usersData) as Array<Record<string, unknown>>;
    const userIndex = users.findIndex((entry) => entry.id === id);

    if (userIndex !== -1) {
      const currentUser = users[userIndex];

      if (userData.firstName !== undefined) {
        currentUser.firstName = userData.firstName;
      }

      if (userData.lastName !== undefined) {
        currentUser.lastName = userData.lastName;
      }

      if (userData.sessionTimeout !== undefined) {
        currentUser.sessionTimeout = userData.sessionTimeout;
      }

      await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2));
    }
  } catch (error) {
    console.error('Error updating Users.json:', error);
  }

  return user;
};

const deleteUser = async (id: string) => {
  const existingUser = await userRepository.getUserById(id);

  if (!existingUser) {
    throw new ApiError('User not found', 404);
  }

  try {
    const usersData = await fs.readFile(USERS_FILE_PATH, 'utf-8');
    const users = JSON.parse(usersData) as Array<Record<string, unknown>>;
    const updatedUsers = users.filter((entry) => entry.id !== id);

    await fs.writeFile(USERS_FILE_PATH, JSON.stringify(updatedUsers, null, 2));

    const deletedUser = await userRepository.deleteUser(id);

    if (!deletedUser) {
      await fs.writeFile(USERS_FILE_PATH, JSON.stringify(users, null, 2));
      throw new ApiError('User not found', 404);
    }

    return deletedUser;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    console.error('Error updating Users.json:', error);
    throw new ApiError('Failed to delete user from Users.json', 500);
  }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };

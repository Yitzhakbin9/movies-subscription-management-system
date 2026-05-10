import User from '../models/userModel';
import { PartialUserData, UserData } from '../models/userInterface';

const getAllUsers = (filter = {}) => User.find(filter);

const getUserById = (id: string) => User.findById(id);

const createUser = (userData: UserData) => User.create(userData);

const updateUser = (id: string, userData: PartialUserData) =>
  User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  });

const deleteUser = (id: string) => User.findByIdAndDelete(id);

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };

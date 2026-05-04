import { genericService } from "../services/apiService";

export const useUsers = () => {
  const fetchUsers = async () => {
    const res = await genericService.getUsers();
    return res.data.data || res.data;
  };

  const createUser = async (data) => {
    return await genericService.registerUser(data);
  };

  const updateUser = async (id, data) => {
    return await genericService.updateUser(id, data);
  };

  const toggleStatus = async (id) => {
    return await genericService.toggleUserStatus(id);
  };

  return { fetchUsers, createUser, updateUser, toggleStatus };
};

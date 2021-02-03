import axios from "axios";

export const UserAPI = {
  login: async (email: string, password: string) => {
    try {
      return await axios.post(`/api/users/login`, {
        email,
        password
      });
    } catch (error) {
      return error.response;
    }
  },
  register: async (name: string, email: string, password: string) => {
    try {
      return await axios.post(`/api/users/register`, {
        name,
        email,
        password
      });
    } catch (error) {
      return error.response;
    }
  }
};

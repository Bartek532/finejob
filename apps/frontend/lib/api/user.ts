import { fetcher } from "../utils/fetcher";
import { setLoading } from "../../store/mainSlice";
import { useDispatch } from "react-redux";

export const UserAPI = {
  login: async (email: string, password: string) => {
    try {
      await fetcher("/api/users/login", "POST", {
        email,
        password,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
  register: async (name: string, email: string, password: string) => {
    try {
      await fetcher("/api/users/register", "POST", {
        name,
        email,
        password,
      });
    } catch (error) {
      console.log(error.message);
    }
  },
};

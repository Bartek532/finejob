import { fetcher } from "../utils/fetcher";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { setLoading, showModal } from "../../store/mainSlice";

type RootState = {
  loading: boolean;
};

export const UserAPI = {
  login: (
    email: string,
    password: string
  ): ThunkAction<
    void,
    RootState,
    unknown,
    Action<string>
  > => async dispatch => {
    dispatch(setLoading(true));
    try {
      await fetcher("/api/users/login", "POST", {
        email,
        password,
      });
    } catch (error) {
      dispatch(showModal({ type: "error", message: error.message }));
      console.log(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  },
  register: (
    name: string,
    email: string,
    password: string
  ): ThunkAction<
    void,
    RootState,
    unknown,
    Action<string>
  > => async dispatch => {
    dispatch(setLoading(true));
    try {
      await fetcher("/api/users/register", "POST", {
        name,
        email,
        password,
      });
    } catch (error) {
      dispatch(showModal({ type: "error", message: error.message }));
      console.log(error.message);
    } finally {
      dispatch(setLoading(false));
    }
  },
};

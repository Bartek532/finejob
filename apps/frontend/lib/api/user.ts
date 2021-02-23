import { fetcher } from "../utils/fetcher";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { setLoading, showModal, setIsLogin } from "../../store/mainSlice";
import type { UserLoginData, UserRegisterData } from "../../types";
import type { InitialMainState } from "../../store/mainSlice";

type FuncType = ThunkAction<void, InitialMainState, unknown, Action<string>>;

export const UserAPI = {
  login: ({ email, password }: UserLoginData): FuncType => async dispatch => {
    dispatch(setLoading(true));
    try {
      await fetcher("/api/users/login", "POST", {
        email,
        password,
      });
      dispatch(setIsLogin(true));
    } catch (error) {
      dispatch(showModal({ type: "error", message: error.message }));
    } finally {
      dispatch(setLoading(false));
    }
  },
  register: ({
    name,
    email,
    company,
    password,
  }: UserRegisterData): FuncType => async dispatch => {
    dispatch(setLoading(true));
    try {
      await fetcher("/api/users/register", "POST", {
        name,
        email,
        company,
        password,
      });
      dispatch(
        showModal({ type: "success", message: "Thanks to register. Log in!" })
      );
    } catch (error) {
      dispatch(showModal({ type: "error", message: error.message }));
    } finally {
      dispatch(setLoading(false));
    }
  },
  isLogin: (): FuncType => async dispatch => {
    try {
      await fetcher("/api/users/islogin", "GET");
      dispatch(setIsLogin(true));
    } catch (error) {
      console.log(error.message);
    }
  },
  saveOffer: (id: string): FuncType => async dispatch => {
    dispatch(setLoading(true));
    try {
      const { data } = await fetcher("/api/users/offers", "POST", { id });
      dispatch(showModal({ type: "success", message: data.message }));
    } catch (error) {
      console.log(error.message);
      dispatch(showModal({ type: "error", message: error.message }));
    } finally {
      dispatch(setLoading(false));
    }
  },
  unsaveOffer: (id: string): FuncType => async dispatch => {
    dispatch(setLoading(true));
    try {
      const { data } = await fetcher(`/api/users/offers/${id}`, "DELETE");
      dispatch(showModal({ type: "success", message: data.message }));
    } catch (error) {
      console.log(error.message);
      dispatch(showModal({ type: "error", message: error.message }));
    } finally {
      dispatch(setLoading(false));
    }
  },
};

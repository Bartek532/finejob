import { fetcher } from "../utils/fetcher";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import {
  setLoading,
  showModal,
  setIsLogin,
  setUser,
} from "../../store/mainSlice";
import { setOffers } from "../../store/offersSlice";
import type {
  UserLoginData,
  UserRegisterData,
  User,
  Offer,
} from "@finejob/types";
import type { InitialMainState } from "../../store/mainSlice";

type FuncType = ThunkAction<void, InitialMainState, unknown, Action<string>>;

export const UserAPI = {
  login:
    ({ email, password }: UserLoginData): FuncType =>
    async (dispatch) => {
      dispatch(setLoading(true));
      try {
        await fetcher("/api/users/login", "POST", {
          email,
          password,
        });
        dispatch(setIsLogin(true));
      } catch (error) {
        if (error instanceof Error) {
          dispatch(showModal({ type: "error", message: error.message }));
          return;
        }

        dispatch(
          showModal({ type: "error", message: "Unknown error occured!" }),
        );
      } finally {
        dispatch(setLoading(false));
      }
    },
  register:
    ({ name, email, company, password }: UserRegisterData): FuncType =>
    async (dispatch) => {
      dispatch(setLoading(true));
      try {
        await fetcher("/api/users/register", "POST", {
          name,
          email,
          company,
          password,
        });
        dispatch(
          showModal({
            type: "success",
            message: "Thanks to register. Log in!",
          }),
        );
      } catch (error) {
        if (error instanceof Error) {
          dispatch(showModal({ type: "error", message: error.message }));
          return;
        }

        dispatch(
          showModal({ type: "error", message: "Unknown error occured!" }),
        );
      } finally {
        dispatch(setLoading(false));
      }
    },
  logout: (): FuncType => async (dispatch) => {
    try {
      await fetcher("/api/users/logout", "GET");
      dispatch(setIsLogin(false));
    } catch (error) {
      console.log(error);
    }
  },
  isLogin: (): FuncType => async (dispatch) => {
    try {
      await fetcher("/api/users/isLogin", "GET");
      dispatch(setIsLogin(true));
    } catch (error) {
      console.log(error);
    }
  },

  changeUserData:
    (data: UserRegisterData): FuncType =>
    async (dispatch) => {
      dispatch(setLoading(true));
      try {
        await fetcher("/api/users", "POST", data);
        dispatch(setUser(data));
        dispatch(
          showModal({ type: "success", message: "Succesfully updated!" }),
        );
      } catch (error) {
        if (error instanceof Error) {
          dispatch(showModal({ type: "error", message: error.message }));
          return;
        }

        dispatch(
          showModal({ type: "error", message: "Unknown error occured!" }),
        );
      } finally {
        dispatch(setLoading(false));
      }
    },

  getUserInfo: (): FuncType => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data }: { data: User } = await fetcher("/api/users", "GET");
      dispatch(setUser({ ...data, password: "" }));
    } catch (error) {
      if (error instanceof Error) {
        dispatch(showModal({ type: "error", message: error.message }));
        return;
      }

      dispatch(showModal({ type: "error", message: "Unknown error occured!" }));
    } finally {
      dispatch(setLoading(false));
    }
  },
  saveOffer:
    (id: string): FuncType =>
    async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const { data }: { data: { message: string } } = await fetcher(
          "/api/users/offers",
          "POST",
          { id },
        );
        dispatch(showModal({ type: "success", message: data.message }));
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          dispatch(showModal({ type: "error", message: error.message }));
          return;
        }

        dispatch(
          showModal({ type: "error", message: "Unknown error occured!" }),
        );
      } finally {
        dispatch(setLoading(false));
      }
    },
  unsaveOffer:
    (id: string): FuncType =>
    async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const { data }: { data: { message: string } } = await fetcher(
          `/api/users/offers/${id}`,
          "DELETE",
        );
        dispatch(showModal({ type: "success", message: data.message }));
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          dispatch(showModal({ type: "error", message: error.message }));
          return;
        }

        dispatch(
          showModal({ type: "error", message: "Unknown error occured!" }),
        );
      } finally {
        dispatch(setLoading(false));
      }
    },

  getUserOffers:
    (type: "created" | "saved"): FuncType =>
    async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const { data }: { data: Offer[] } = await fetcher(
          `/api/users/offers?type=${type}`,
          "GET",
        );
        dispatch(setOffers(data));
      } catch (error) {
        console.log(error);
        if (error instanceof Error) {
          dispatch(showModal({ type: "error", message: error.message }));
          return;
        }

        dispatch(
          showModal({ type: "error", message: "Unknown error occured!" }),
        );
      } finally {
        dispatch(setLoading(false));
      }
    },
};

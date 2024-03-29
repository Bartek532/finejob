import { fetcher } from "../utils/fetcher";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import type { InitialMainState } from "../../store/mainSlice";
import type { InitialOffersState } from "../../store/offersSlice";
import type { Offer } from "@finejob/types";

import { setLoading, showModal } from "../../store/mainSlice";
import {
  setOffers,
  setLastOffersApiCallAddress,
  setLoadMore,
  setResultsPage,
} from "../../store/offersSlice";

type FetchFuncType = ThunkAction<
  void,
  InitialMainState & InitialOffersState,
  unknown,
  Action<string>
>;

export const JobsAPI = {
  searchOffers:
    (path = ""): FetchFuncType =>
    async (dispatch) => {
      dispatch(setLoading(true));
      try {
        const apiCallAddress = `/api/offers/search?${path}`;
        const { data }: { data: Offer[] } = await fetcher(
          apiCallAddress,
          "GET",
        );
        dispatch(setOffers(data));
        dispatch(setResultsPage(1));
        dispatch(setLastOffersApiCallAddress(apiCallAddress));
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

  loadMore: (): FetchFuncType => async (dispatch, getState) => {
    const { offers } = getState();
    dispatch(setLoadMore(true));

    try {
      const { data }: { data: Offer[] } = await fetcher(
        `${offers.lastOffersApiCallAddress}&page=${offers.resultsPage + 1}`,
        "GET",
      );
      dispatch(setResultsPage(offers.resultsPage + 1));
      dispatch(setOffers([...offers.allOffers, ...data]));
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        dispatch(showModal({ type: "error", message: error.message }));
        return;
      }

      dispatch(showModal({ type: "error", message: "Unknown error occured!" }));
    } finally {
      dispatch(setLoadMore(false));
    }
  },
  createOffer:
    (offer: Offer): FetchFuncType =>
    async (dispatch) => {
      dispatch(setLoading(true));
      try {
        await fetcher("/api/offers", "POST", { ...offer });
        dispatch(
          showModal({ type: "success", message: "Your offer has been added!" }),
        );
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
  deleteOffer:
    (id: string): FetchFuncType =>
    async (dispatch) => {
      dispatch(setLoading(true));
      try {
        await fetcher(`/api/offers/${id}`, "DELETE");
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
  editOffer:
    (id: string, data: Offer): FetchFuncType =>
    async (dispatch) => {
      dispatch(setLoading(true));
      try {
        await fetcher(`/api/offers/${id}`, "PUT", { ...data });
        dispatch(
          showModal({ type: "success", message: "Offer has been changed!" }),
        );
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

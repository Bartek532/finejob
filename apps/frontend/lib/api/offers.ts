import { fetcher } from "../utils/fetcher";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import type { InitialMainState } from "../../store/mainSlice";
import type { InitialOffersState } from "../../store/offersSlice";
import type { OfferWithSalary } from "@finejob/types";

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
  searchOffers: (path = ""): FetchFuncType => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const apiCallAddress = `/api/offers/search?${path}`;
      const { data }: { data: OfferWithSalary[] } = await fetcher(
        apiCallAddress,
        "GET",
      );
      dispatch(setOffers(data));
      dispatch(setResultsPage(1));
      dispatch(setLastOffersApiCallAddress(apiCallAddress));
    } catch (error) {
      dispatch(showModal({ type: "error", message: error.message }));
    } finally {
      dispatch(setLoading(false));
    }
  },

  loadMore: (): FetchFuncType => async (dispatch, getState) => {
    const { offers } = getState();
    dispatch(setLoadMore(true));

    try {
      const { data }: { data: OfferWithSalary[] } = await fetcher(
        `${offers.lastOffersApiCallAddress}&page=${offers.resultsPage + 1}`,
        "GET",
      );
      dispatch(setResultsPage(offers.resultsPage + 1));
      dispatch(setOffers([...offers.allOffers, ...data]));
    } catch (error) {
      console.log(error.message);
      dispatch(showModal({ type: "error", message: error.message }));
    } finally {
      dispatch(setLoadMore(false));
    }
  },
};

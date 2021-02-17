import { fetcher } from "../utils/fetcher";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import type { InitialMainState } from "../../store/mainSlice";
import type { InitialOffersState } from "../../store/offersSlice";

import { setLoading, showModal, setLastQuery } from "../../store/mainSlice";
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
  searchByQuery: (query: string): FetchFuncType => async dispatch => {
    dispatch(setLoading(true));
    dispatch(setLastQuery(query));

    try {
      const apiCallAddress = `/api/offers/search?q=${query}`;
      const { data } = await fetcher(apiCallAddress, "GET");
      dispatch(setOffers(data));
      dispatch(setResultsPage(1));
      dispatch(setLastOffersApiCallAddress(apiCallAddress));
    } catch (error) {
      showModal({ type: "error", message: error.message });
    } finally {
      dispatch(setLoading(false));
    }
  },
  searchByLocation: (location: string): FetchFuncType => async dispatch => {
    dispatch(setLoading(true));
    dispatch(setLastQuery(location));

    try {
      const apiCallAddress = `/api/offers/location?q=${location}`;

      const { data } = await fetcher(apiCallAddress, "GET");
      dispatch(setOffers(data));
      dispatch(setResultsPage(1));
      dispatch(setLastOffersApiCallAddress(apiCallAddress));
    } catch (error) {
      console.log(error.message);
      showModal({ type: "error", message: error.message });
    } finally {
      dispatch(setLoading(false));
    }
  },

  loadMore: (): FetchFuncType => async (dispatch, getState) => {
    const { offers } = getState();
    dispatch(setLoadMore(true));

    try {
      const { data } = await fetcher(
        `${offers.lastOffersApiCallAddress}&page=${offers.resultsPage + 1}`,
        "GET"
      );
      dispatch(setResultsPage(offers.resultsPage + 1));
      dispatch(setOffers([...offers.allOffers, ...data]));
    } catch (error) {
      console.log(error.message);
      showModal({ type: "error", message: error.message });
    } finally {
      dispatch(setLoadMore(false));
    }
  },
};

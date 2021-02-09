import { fetcher } from "../utils/fetcher";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import type { InitialMainState } from "../../store/mainSlice";
import type { InitialOffersState } from "../../store/offersSlice";

import { setLoading, showModal } from "../../store/mainSlice";
import { setOffers } from "../../store/offersSlice";

type FetchFuncType = ThunkAction<
  void,
  InitialMainState & InitialOffersState,
  unknown,
  Action<string>
>;

export const JobsAPI = {
  searchByQuery: (query: string): FetchFuncType => async dispatch => {
    dispatch(setLoading(true));

    try {
      const { data } = await fetcher(`/api/offers/search?q=${query}`, "GET");
      dispatch(setOffers(data));
    } catch (error) {
      showModal({ type: "error", message: error.message });
    } finally {
      dispatch(setLoading(false));
    }
  },
};

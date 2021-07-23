import { Layout } from "../../../components/Layout/Layout";
import { ActionButton } from "../../../components/ActionButton/ActionButton";
import { OfferForm } from "../../../components/OfferForm/OfferForm";
import { useEffect, useState } from "react";
import { fetcher } from "../../../lib/utils/fetcher";
import { setLoading } from "../../../store/mainSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import type { Offer } from "@finejob/types";

const EditOffer = () => {
  const dispatch = useDispatch();
  const [offer, setOffer] = useState({} as Offer);
  const router = useRouter();

  useEffect(() => {
    async function getUserOffer() {
      dispatch(setLoading(true));
      try {
        const { data }: { data: Offer } = await fetcher(
          `/api/users/offers/${router.asPath.slice(29)}?type=created`,
          "GET",
        );
        if (!data || !router.asPath.slice(29).length) {
          router.push("/dashboard");
        }
        setOffer(data);
      } catch {
        router.push("/auth/login");
      } finally {
        dispatch(setLoading(false));
      }
    }

    getUserOffer();
  }, []);

  return (
    <Layout title="Updated an offer" headerTitle="Update an offer">
      <ActionButton icon="back" corner />
      <OfferForm type="edit" offer={offer} />
    </Layout>
  );
};

export default EditOffer;

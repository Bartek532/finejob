import styles from "./OfferControls.module.scss";
import { UserAPI } from "../../lib/api/user";
import { JobsAPI } from "../../lib/api/offers";
import { fetcher } from "../../lib/utils/fetcher";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getModalInfo } from "../../store/mainSlice";
import { memo, useState, useEffect, useCallback } from "react";
import classnames from "classnames";
import { useRouter } from "next/router";
import type { Offer } from "@finejob/types";

type OfferControlsProps = {
  readonly offer: Offer;
};

export const OfferControls = memo<OfferControlsProps>(({ offer }) => {
  const modal = useSelector(getModalInfo);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);
  const [isCreatedByUser, setIsCreatedByUser] = useState(false);

  const checkIsSaved = async () => {
    try {
      const { data } = await fetcher(
        `/api/users/offers/${offer.id}?type=saved`,
        "GET",
      );
      setIsSaved(!!data);
    } catch {
      setIsSaved(false);
    }
  };

  const checkIsCreatedByUser = async () => {
    try {
      const { data } = await fetcher(
        `/api/users/offers/${offer.id}?type=created`,
        "GET",
      );
      setIsCreatedByUser(!!data);
    } catch {
      setIsCreatedByUser(false);
    }
  };

  const handleSaveOffer = useCallback(() => {
    dispatch(UserAPI.saveOffer(offer.id));
  }, [offer.id]);

  const handleUnsaveOffer = useCallback(() => {
    dispatch(UserAPI.unsaveOffer(offer.id));
  }, [offer.id]);

  const handleDeleteOffer = useCallback(() => {
    dispatch(JobsAPI.deleteOffer(offer.id));
    router.back();
  }, [offer.id]);

  const handleEditOffer = useCallback(() => {
    router.push(`/dashboard/my-offers/edit?id=${offer.id}`);
  }, [offer.id]);

  useEffect(() => {
    checkIsSaved();
    checkIsCreatedByUser();
  }, []);

  useEffect(() => {
    if (modal.show && modal.type === "success") {
      setIsSaved((value) => !value);
    }
  }, [modal]);

  return (
    <div className={styles.controls}>
      {isCreatedByUser ? (
        <>
          <button
            className={classnames(styles.control, styles.edit)}
            onClick={handleEditOffer}
          >
            <Image
              src="/icons/offer/edit.svg"
              alt="pencil"
              width={24}
              height={24}
            />
          </button>
          <button
            className={classnames(styles.control, styles.delete)}
            onClick={handleDeleteOffer}
          >
            <Image
              src="/icons/offer/delete.svg"
              alt="rubbish"
              width={24}
              height={24}
            />
          </button>{" "}
        </>
      ) : null}
      <button
        className={classnames(styles.control, styles.save)}
        onClick={isSaved ? handleUnsaveOffer : handleSaveOffer}
      >
        <Image
          src={`/icons/offer/${isSaved ? "save" : "empty-save"}.svg`}
          alt="save"
          width={24}
          height={24}
        />
      </button>
    </div>
  );
});

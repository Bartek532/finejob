import styles from "./OfferControls.module.scss";
import { UserAPI } from "../../lib/api/user";
import { fetcher } from "../../lib/utils/fetcher";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getModalInfo } from "../../store/mainSlice";
import { memo, useState, useEffect, useCallback } from "react";
import classnames from "classnames";

type OfferControlsProps = {
  readonly offerId: string | number;
};

export const OfferControls = memo<OfferControlsProps>(({ offerId }) => {
  const modal = useSelector(getModalInfo);
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(false);
  const [isCreatedByUser, setIsCreatedByUser] = useState(false);

  const checkIsSaved = async () => {
    try {
      const { data } = await fetcher(
        `/api/users/offers/${offerId}?type=saved`,
        "GET",
      );
      setIsSaved(!!data);
    } catch {
      setIsSaved(false);
    }
  };

  const checkIsCreatedByUser = async () => {
    try {
      await fetcher(`/api/users/offers/${offerId}?type=created`, "GET");
      setIsCreatedByUser(true);
    } catch {
      setIsCreatedByUser(false);
    }
  };

  const handleSaveOffer = useCallback(() => {
    dispatch(UserAPI.saveOffer(offerId));
  }, [offerId]);

  const handleUnsaveOffer = useCallback(() => {
    dispatch(UserAPI.unsaveOffer(offerId));
  }, [offerId]);

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
          <button className={classnames(styles.control, styles.edit)}>
            <Image
              src="/icons/offer/edit.svg"
              alt="edit"
              width={24}
              height={24}
            />
          </button>
          <button className={classnames(styles.control, styles.delete)}>
            <Image
              src="/icons/offer/delete.svg"
              alt="delete"
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

/*

  useEffect(() => {
    if (modal.show && modal.type === "success") {
 
        setIsSaved(true);
      } else {
        setIsSaved(false);
      }     if (!isSaved) {
    }
  }, [modal]);
  */

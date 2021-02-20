import styles from "./SingleOffer.module.scss";
import { Avatar } from "../../components/Avatar/Avatar";
import { MainButton } from "../../components/MainButton/MainButton";
import type { Offer } from "../../types";
import Image from "next/image";
import Link from "next/link";

export const SingleOffer = ({ offer }: { offer: Offer }) => {
  const info = [
    { type: "location", value: offer.location },
    { type: "type", value: offer.type },
    { type: "salary", value: offer.salary + " $" },
  ];

  return (
    <section className={styles.offer}>
      <article className={styles.main}>
        <div className={styles.logo}>
          <Avatar name={offer.company} />
        </div>
        <span className={styles.title}>{offer.title}</span>
        <span className={styles.company}>{offer.company}</span>
      </article>

      <div className={styles.more}>
        {info.map(item => (
          <div className={styles.field} key={item.type}>
            <span className={styles.description}>{item.value}</span>
            <div className={styles.icon}>
              <Image
                src={`/icons/offer/${item.type}.svg`}
                alt={item.type}
                width={25}
                height={25}
              />
            </div>
          </div>
        ))}
      </div>

      <div className={styles.content}>
        <span className={styles.date}>
          Updated: {offer.created_at.slice(0, 20)}
        </span>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: offer.description || "xd" }}
        ></div>
      </div>

      <div className={styles.apply}>
        <span className={styles.label}>How to apply:</span>
        <span
          dangerouslySetInnerHTML={{ __html: offer.how_to_apply }}
          className={styles.link}
        ></span>
      </div>
      <Link href={offer.company_url}>
        <MainButton text="Go to company site" />
      </Link>
    </section>
  );
};

/*
<div class="offer">
    <job-offer-button @click="$router.back()" class="back_btn">
      <template #icon>
        <svg
          width="8"
          height="14"
          viewBox="0 0 8 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8 12.355L3.05533 7L8 1.645L6.47773 0L0 7L6.47773 14L8 12.355Z"
            fill="white"
          />
        </svg>
      </template>
    </job-offer-button>
    <div class="save">
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M24.2155 5.46546L19.5345 0.784542C19.0322 0.282212 18.3509 3.71471e-06 17.6405 0H2.67857C1.19922 0 0 1.19922 0 2.67857V22.3214C0 23.8008 1.19922 25 2.67857 25H22.3214C23.8008 25 25 23.8008 25 22.3214V7.35949C25 6.64909 24.7178 5.96778 24.2155 5.46546ZM12.5 21.4286C10.5276 21.4286 8.92857 19.8296 8.92857 17.8571C8.92857 15.8847 10.5276 14.2857 12.5 14.2857C14.4724 14.2857 16.0714 15.8847 16.0714 17.8571C16.0714 19.8296 14.4724 21.4286 12.5 21.4286ZM17.8571 4.43527V10.0446C17.8571 10.4145 17.5573 10.7143 17.1875 10.7143H4.24107C3.87126 10.7143 3.57143 10.4145 3.57143 10.0446V4.24107C3.57143 3.87126 3.87126 3.57143 4.24107 3.57143H16.9933C17.1709 3.57143 17.3412 3.64196 17.4668 3.76758L17.661 3.96177C17.7232 4.02395 17.7725 4.09776 17.8062 4.17901C17.8398 4.26025 17.8572 4.34733 17.8571 4.43527Z"
          fill="#F59B66"
        />
      </svg>
    </div>
    <div class="main">
      <div class="logo" v-color>
        {{
          currentOffer.company[0] +
            (currentOffer.company.split(" ")[1]
              ? currentOffer.company.split(" ")[1][0]
              : "")
        }}
      </div>
      <div class="title">{{ currentOffer.title }}</div>
      <div class="subtitle">{{ currentOffer.company }}</div>
    </div>
    <div class="more_info">
      <div class="location">
        <div class="icon">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M13 17.3334C15.3933 17.3334 17.3334 15.3933 17.3334 13C17.3334 10.6068 15.3933 8.66669 13 8.66669C10.6068 8.66669 8.66669 10.6068 8.66669 13C8.66669 15.3933 10.6068 17.3334 13 17.3334Z"
              fill="#B661B4"
            />
            <path
              d="M14.0834 4.4081V2.16669H11.9167V4.4081C10.0103 4.65151 8.23874 5.52087 6.8798 6.8798C5.52087 8.23874 4.65151 10.0103 4.4081 11.9167H2.16669V14.0834H4.4081C4.65115 15.9898 5.5204 17.7616 6.8794 19.1206C8.2384 20.4796 10.0102 21.3489 11.9167 21.5919V23.8334H14.0834V21.5919C15.9899 21.3491 17.7618 20.4799 19.1208 19.1208C20.4799 17.7618 21.3491 15.9899 21.5919 14.0834H23.8334V11.9167H21.5919C21.3489 10.0102 20.4796 8.2384 19.1206 6.8794C17.7616 5.5204 15.9898 4.65115 14.0834 4.4081ZM13 19.5C9.41527 19.5 6.50002 16.5848 6.50002 13C6.50002 9.41527 9.41527 6.50002 13 6.50002C16.5848 6.50002 19.5 9.41527 19.5 13C19.5 16.5848 16.5848 19.5 13 19.5Z"
              fill="#B661B4"
            />
          </svg>
        </div>
        <div class="desc">{{ currentOffer.location }}</div>
      </div>
      <div class="type" v-if="currentOffer.type">
        <div class="desc">{{ currentOffer.type }}</div>
        <div class="icon">
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.5 1.5625C6.45996 1.5625 1.5625 6.45996 1.5625 12.5C1.5625 18.54 6.45996 23.4375 12.5 23.4375C18.54 23.4375 23.4375 18.54 23.4375 12.5C23.4375 6.45996 18.54 1.5625 12.5 1.5625ZM16.8091 15.8618L16.1108 16.814C16.0957 16.8347 16.0765 16.8522 16.0545 16.8655C16.0326 16.8789 16.0082 16.8877 15.9827 16.8916C15.9573 16.8954 15.9314 16.8942 15.9065 16.888C15.8815 16.8818 15.8581 16.8708 15.8374 16.8555L11.7993 13.9111C11.7742 13.8931 11.7537 13.8692 11.7397 13.8416C11.7257 13.814 11.7185 13.7834 11.7188 13.7524V7.03125C11.7188 6.92383 11.8066 6.83594 11.9141 6.83594H13.0884C13.1958 6.83594 13.2837 6.92383 13.2837 7.03125V13.0737L16.7651 15.5908C16.853 15.6519 16.8726 15.7739 16.8091 15.8618Z"
              fill="#B661B4"
            />
          </svg>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="date">Updated: {{ currentOffer.updated.slice(0, 10) }}</div>
      <p>
        <span v-html="currentOffer.snippet"></span>
      </p>
    </div>
    <a :href="currentOffer.link">
      <main-button>
        <template #icon>
          Go to original page
        </template>
      </main-button>
    </a>
  </div>

  */

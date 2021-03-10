import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/mainSlice";
import styles from "./UserSettings.module.scss";
import { Avatar } from "../../components/Avatar/Avatar";
import { useEffect } from "react";
import { Input } from "../../components/Input/Input";
import { inputValidation } from "../../lib/utils/consts";
import { MainButton } from "../../components/MainButton/MainButton";
import { useForm } from "react-hook-form";
import { UserAPI } from "../../lib/api/user";
import type { UserRegisterData } from "@finejob/types";

export const UserSettings = memo(() => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const { handleSubmit, errors, register, setValue } = useForm({
    reValidateMode: "onBlur",
  });

  useEffect(() => {
    setValue("name", user.name);
    setValue("company", user.company);
    setValue("email", user.email);
  }, [user]);

  const handleChangeUserInfo = (
    data: UserRegisterData & { oldPassword: string; newPassword: string },
  ) => {
    dispatch(UserAPI.changeUserData(data));
  };

  return (
    <section className={styles.settings}>
      <article className={styles.main}>
        <div className={styles.logo}>
          <Avatar name={user.name} />
        </div>
        <span className={styles.name}>{user.name}</span>
        <span className={styles.company}>{user.company}</span>
      </article>

      <form
        className={styles.form}
        onSubmit={handleSubmit(handleChangeUserInfo)}
      >
        <Input
          name="name"
          inputRef={register(inputValidation.other)}
          error={errors.name?.message}
          shouldBeFocused
        />
        <Input
          name="company"
          inputRef={register(inputValidation.other)}
          error={errors.company?.message}
          shouldBeFocused
        />
        <Input
          name="email"
          inputRef={register(inputValidation.email)}
          error={errors.email?.message}
          shouldBeFocused
        />
        <Input
          type="password"
          name="oldPassword"
          placeholder="Actual password"
          inputRef={register(inputValidation.password)}
          error={errors.oldPassword?.message}
        />
        <Input
          type="password"
          name="newPassword"
          placeholder="New password (if no, repeat actual)"
          inputRef={register(inputValidation.password)}
          error={errors.newPassword?.message}
        />
        <MainButton type="submit" text="Submit" />
      </form>
    </section>
  );
});

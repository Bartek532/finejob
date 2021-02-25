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
import type { UserRegisterData } from "../../../types";

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

  const handleChangeUserInfo = (data: UserRegisterData) => {
    dispatch(UserAPI.changeUserData(data));
  };

  return (
    <main className={styles.settings}>
      <div className={styles.main}>
        <div className={styles.logo}>
          <Avatar name={user.name} />
        </div>
        <span className={styles.name}>{user.name}</span>
        <span className={styles.company}>{user.company}</span>
      </div>

      <form
        className={styles.form}
        onSubmit={handleSubmit(handleChangeUserInfo)}
      >
        <Input
          name="name"
          inputRef={register(inputValidation.other)}
          error={errors.name}
          shouldBeFocused
        />
        <Input
          name="company"
          inputRef={register(inputValidation.other)}
          error={errors.company}
          shouldBeFocused
        />
        <Input
          name="email"
          inputRef={register(inputValidation.email)}
          error={errors.email}
          shouldBeFocused
        />
        <Input
          type="password"
          name="password"
          inputRef={register(inputValidation.password)}
          error={errors.password}
        />
        <MainButton type="submit" text="Submit" />
      </form>
    </main>
  );
});

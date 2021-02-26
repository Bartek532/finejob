import { memo } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getLoginStatus } from "../../store/mainSlice";
import { useEffect } from "react";

type AuthCheckerProps = { readonly children: React.ReactNode };

export const AuthChecker = memo<AuthCheckerProps>(({ children }) => {
  const isUserLogin = useSelector(getLoginStatus);

  const router = useRouter();

  useEffect(() => {
    if (!isUserLogin) {
      router.push("/auth/login");
    }
  }, [isUserLogin]);

  if (!isUserLogin) {
    return null;
  }

  return <main>{children}</main>;
});

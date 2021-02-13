import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getLoginStatus } from "../../store/mainSlice";
import { useEffect } from "react";

export const AuthChecker = ({ children }: { children: React.ReactNode }) => {
  const isUserLogin = useSelector(getLoginStatus);

  const router = useRouter();

  useEffect(() => {
    if (!isUserLogin) {
      router.push("/auth/login");
    }
  }, []);

  if (!isUserLogin) {
    return null;
  }

  return <main>{children}</main>;
};

import { useEffect, useState } from "react";
import useSWR from "swr";
import { API_URL } from "../constants/url";
import { useRouter } from "next/router";
import { axios } from "../lib/axios";

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: {
  middleware: "auth" | "guest";
  redirectIfAuthenticated: boolean | string;
}) => {
  const [login, setLogin] = useState(false);

  const router = useRouter();

  const {
    data: notifications,
    error: notiError,
    mutate: notiMutate,
  } = useSWR(`${API_URL}/chat/notifications`, async () => {
    if (localStorage.getItem("JWT") && user) {
      return await axios(
        "get",
        `${API_URL}/chat/notifications`,
        {
          id: user?.id ?? null,
        },
        null,
        (res) => {
          return res.data;
        }
      );
    }
  });

  const {
    data: user,
    error,
    mutate,
  } = useSWR(`${API_URL}/user`, async () => {
    if (localStorage.getItem("JWT")) {
      return await axios(
        "get",
        `${API_URL}/user`,
        null,
        null,
        (res) => {
          setLogin(true);
          return res.data;
        },
        (resError) => {
          localStorage.removeItem("JWT");
          router.push("/");
        }
      );
    }
  });

  const logout = async () => {
    await axios("get", `${API_URL}/auth/logout`, null, null, (res: any) => {
      localStorage.removeItem("JWT");
      mutate();
    });
  };

  useEffect(() => {
    if (
      middleware === "guest" &&
      localStorage.getItem("JWT") &&
      redirectIfAuthenticated
    )
      if (typeof redirectIfAuthenticated === "string") {
        router.push(redirectIfAuthenticated);
      } else router.push("/auth/projects");

    if (
      middleware === "auth" &&
      !localStorage.getItem("JWT") &&
      redirectIfAuthenticated
    )
      if (typeof redirectIfAuthenticated === "string") {
        router.push(redirectIfAuthenticated);
      } else router.push("/sign-in");
  }, [user, error]);

  return {
    user,
    notifications,
    login,
    logout,
  };
};

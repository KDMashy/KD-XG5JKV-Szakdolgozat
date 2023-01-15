import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { API_URL } from "../constants/url";
import { useRouter } from "next/router";

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: {
  middleware: string;
  redirectIfAuthenticated: boolean | string;
}) => {
  const [login, setLogin] = useState(false);

  const router = useRouter();

  const {
    data: user,
    error,
    mutate,
  } = useSWR(`${API_URL}/user`, async () => {
    if (localStorage.getItem("JWT")) {
      return await axios
        .get(`${API_URL}/user`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` },
          withCredentials: true,
        })
        .then((res) => {
          setLogin(true);
          return res.data;
        })
        .catch((error) => localStorage.removeItem("JWT"));
    }
  });

  const logout = async () => {
    await axios
      .get(`${API_URL}/auth/logout`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}` },
        withCredentials: true,
      })
      .then(() => {
        localStorage.removeItem("JWT");
        mutate();
      });
  };

  useEffect(() => {
    if (
      middleware === "guest" &&
      localStorage.getItem("JWT") &&
      redirectIfAuthenticated
    ) {
      router.push("/auth/projects");
    }
    if (
      middleware === "auth" &&
      !localStorage.getItem("JWT") &&
      redirectIfAuthenticated
    ) {
      router.push("/sign-in");
    }
  }, [user, error]);

  return {
    user,
    login,
    logout,
  };
};

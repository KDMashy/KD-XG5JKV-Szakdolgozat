import axios from "axios";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { API_URL } from "../constants/url";

export const useAuth = () => {
  const [login, setLogin] = useState(false);

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
        });
    }
  });
  return {
    user,
    login,
  };
};

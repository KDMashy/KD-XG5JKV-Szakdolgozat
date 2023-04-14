import { LoginTypes } from "./LoginTypes";

export const navButtons = [
  {
    label: "Az oldalról",
    url: "/",
    type: LoginTypes.No_Login,
  },
  {
    label: "Regisztráció",
    url: "/sign-up",
    type: LoginTypes.No_Login,
  },
  {
    label: "Bejelentkezés",
    url: "/sign-in",
    type: LoginTypes.No_Login,
  },
  {
    label: "Projektek",
    url: "/auth/projects",
    type: LoginTypes.Login,
  },
  {
    label: "Csapatok",
    url: "/auth/teams",
    type: LoginTypes.Login,
  },
  // {
  //   label: "Profile",
  //   url: "/auth/profile",
  //   type: LoginTypes.Login,
  // },
  {
    label: "Beállítások",
    url: "/auth/settings",
    type: LoginTypes.Login,
  },
  {
    label: "Chat",
    url: "/auth/chat",
    type: LoginTypes.Login,
  },
  {
    label: "Kijelentkezés",
    url: "/",
    type: LoginTypes.Login,
  },
];

import { LoginTypes } from "./LoginTypes";

export const navButtons = [
  {
    label: "About us",
    url: "/",
    type: LoginTypes.No_Login,
  },
  {
    label: "Register",
    url: "/sign-up",
    type: LoginTypes.No_Login,
  },
  {
    label: "Login",
    url: "/sign-in",
    type: LoginTypes.No_Login,
  },
  {
    label: "Projects",
    url: "/auth/projects",
    type: LoginTypes.Login,
  },
  {
    label: "Teams",
    url: "/auth/teams",
    type: LoginTypes.Login,
  },
  {
    label: "Profile",
    url: "/auth/profile",
    type: LoginTypes.Login,
  },
  {
    label: "Settings",
    url: "/auth/settings",
    type: LoginTypes.Login,
  },
  {
    label: "Chat",
    url: "/auth/chat",
    type: LoginTypes.Login,
  },
  {
    label: "Logout",
    url: "/",
    type: LoginTypes.Login,
  },
];

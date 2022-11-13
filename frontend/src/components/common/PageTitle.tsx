import React from "react";

interface Props {
  title?: string;
  className?: string;
  type?: "light" | "dark";
}

function PageTitle({ title, className, type = "dark" }: Props) {
  return (
    <h1
      className={`${className} ${
        type === "dark" ? "text-light-200" : "text-dark-700"
      } font-noto font-bold text-2xl text-center pb-6`}
    >
      {title}
    </h1>
  );
}

export default PageTitle;

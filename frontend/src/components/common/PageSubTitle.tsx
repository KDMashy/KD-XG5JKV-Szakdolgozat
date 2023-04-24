import React from "react";

interface Props {
  title?: string;
  className?: string;
  tag?: "h2" | "h3" | "h4" | "h5";
  type?: "light" | "dark";
}

function PageSubTitle({ title, className, type = "dark", tag = "h2" }: Props) {
  const getClassName = () => {
    return `${className} ${
      type === "dark" ? "text-light-200" : "text-dark-700"
    } font-noto text-center pb-4`;
  };

  const getTag = () => {
    switch (tag) {
      case "h2":
        return <h2 className={`${getClassName()} font-bold`}>{title}</h2>;
      case "h3":
        return <h3 className={`${getClassName()} font-normal`}>{title}</h3>;
      case "h4":
        return <h4 className={`${getClassName()}`}>{title}</h4>;
      case "h5":
        return <h5 className={`${getClassName()}`}>{title}</h5>;
    }
  };

  return getTag();
}

export default PageSubTitle;

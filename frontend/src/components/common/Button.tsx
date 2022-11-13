import Link from "next/link";
import React from "react";

interface Props {
  label?: string;
  color?: "primary" | "secondary" | "disabled" | "succes" | "error" | "warning";
  clickHandler?: any;
  className?: string;
  circuclar?: boolean;
  icon?: string | boolean;
  type?: "light" | "dark";
  route?: string;
  loading?: boolean;
  disabled?: boolean;
  target?: "_blank" | "_self" | "_parent" | "_top";
  buttonType?: "menu_nolog" | "menu_log" | "default";
}

function Button({
  label,
  color = "primary",
  clickHandler,
  className,
  circuclar,
  icon,
  type = "dark",
  route,
  loading = false,
  disabled = false,
  target = "_self",
  buttonType = "default",
}: Props) {
  const colorize = () => {
    switch (color) {
      case "primary":
        return `${type === "dark" ? "bg-dark-700" : "bg-light-400"}`;
      case "secondary":
        return `${type === "dark" ? "bg-dark-600" : "bg-light-300"}`;
      case "succes":
        return ``;
      case "warning":
        return ``;
      case "error":
        return ``;
      case "disabled":
        return ``;
    }
  };

  const getButtonType = () => {
    switch (buttonType) {
      case "default":
        return ``;
      case "menu_nolog":
        return `2xl:px-24 xl:px-20 px-14 rounded-tl-[200px] rounded-bl-[50px] rounded-tr-[50px] rounded-br-[200px]`;
      case "menu_log":
        return ``;
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    // console.log(e);
    if (e?.button !== 0) {
      return false;
    }

    clickHandler(e);
  };

  const ButtonRender = () => {
    return (
      <button
        className={`px-10 py-3 ${className} ${colorize()} ${
          circuclar
            ? circuclar && label
              ? "rounded-md"
              : "rounded-full"
            : "rounded-md"
        } ${getButtonType()} transition ease-in-out delay-150 hover:bg-opacity-50 hover:text-light-200`}
        onMouseDown={clickHandler && handleClick}
        disabled={disabled}
      >
        {label}
        {icon && <></>}
      </button>
    );
  };

  return route ? (
    <Link href={route} target={target}>
      <a>{ButtonRender()}</a>
    </Link>
  ) : (
    <>{ButtonRender()}</>
  );
}

export default Button;

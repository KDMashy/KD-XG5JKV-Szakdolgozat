import React from "react";

interface Props {
  className?: string;
  width?: string | any;
  height?: string | any;
  type?: "light" | "dark";
  children: React.ReactNode;
}

function Container({
  className,
  width,
  height,
  children,
  type = "dark",
}: Props) {
  return (
    <div
      className={`${className} ${width} ${height} ${
        type === "dark" ? "bg-dark-700 bg-opacity-25" : ""
      } p-6`}
    >
      {children}
    </div>
  );
}

export default Container;

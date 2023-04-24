import React from "react";

interface Props {
  className?: string;
  width?: string | any;
  height?: string | any;
  type?: "light" | "dark";
  children: React.ReactNode;
  padding?: string;
}

function Container({
  className,
  width,
  height,
  children,
  type = "dark",
  padding = " p-6",
}: Props) {
  return (
    <div
      className={`${className} ${width} ${height} ${
        type === "dark" ? "bg-dark-700 bg-opacity-25" : ""
      } ${padding}`}
    >
      {children}
    </div>
  );
}

export default Container;

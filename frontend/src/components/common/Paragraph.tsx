import React from "react";

interface Props {
  text?: string;
  className?: string;
  type?: "dark" | "light";
  fontHeight?: "xs" | "sm" | "base" | "lg";
}

function Paragraph({
  text,
  className,
  type = "dark",
  fontHeight = "base",
}: Props) {
  return (
    <p
      className={`${
        type === "dark" ? "text-light-200" : "text-dark-700"
      } ${className} text-${fontHeight}`}
    >
      {text}
    </p>
  );
}

export default Paragraph;

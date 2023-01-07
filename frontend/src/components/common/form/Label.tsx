import React from "react";

function Label({
  labelClass,
  darkMode = "dark",
  label,
  id,
}: {
  labelClass?: string;
  darkMode?: "dark" | "light";
  label?: string;
  id?: string | number | any;
}) {
  return (
    <div>
      <label
        className={`${labelClass} ${
          darkMode === "dark" ? "text-dark-200" : ""
        }`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
}

export default Label;

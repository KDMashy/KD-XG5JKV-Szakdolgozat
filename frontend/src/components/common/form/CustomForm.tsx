import React from "react";

interface Props {
  className?: string;
  children: React.ReactNode;
  handleSubmit?: any;
}

function CustomForm({ className, children, handleSubmit }: Props) {
  return (
    <div
      className={`${className}`}
      onKeyDown={(evt) => {
        if (evt.key === "Enter") {
          handleSubmit();
        }
      }}
    >
      {children}
    </div>
  );
}

export default CustomForm;

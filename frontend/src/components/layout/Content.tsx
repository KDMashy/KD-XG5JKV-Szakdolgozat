import React from "react";

interface Props {
  children: React.ReactNode;
}

const Content: React.FC<Props> = ({ children }) => {
  return <main className="min-h-[calc(100vh-40vh)]">{children}</main>;
};

export default Content;

import React from "react";

function Divider({
  placement = "middle",
}: {
  placement: "top" | "middle" | "bottom";
}) {
  const getPlacement = () => {
    switch (placement) {
      case "top":
        return "mb-5";
      case "middle":
        return "mt-2 mb-5";
      case "bottom":
        return "mt-2";
    }
  };

  return (
    <div className={`border-[1px] border-light-200${getPlacement()}`}></div>
  );
}

export default Divider;

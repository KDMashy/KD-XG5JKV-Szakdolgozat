import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";

function NewListItem({ clickHandler }) {
  return (
    <div
      className="relative w-full bg-dark-600 bg-opacity-50 hover:bg-opacity-80 transition-all ease-in-out delay-100 cursor-pointer py-2.5 rounded-md"
      onClick={() => clickHandler()}
    >
      <AddIcon />
    </div>
  );
}

export default NewListItem;

import React from "react";
import AddIcon from "@mui/icons-material/Add";

function NewList({ clickHandler }) {
  return (
    <div className="w-[400px] min-w-[400px] max-w-[400px] max-h-[50px] bg-slate-700 p-3 text-center bg-opacity-80 hover:bg-slate-300 hover:text-slate-700 transition-all ease-in-out delay-100 cursor-pointer py-2.5 rounded-md md:mx-3 mx-auto">
      <AddIcon />
    </div>
  );
}

export default NewList;

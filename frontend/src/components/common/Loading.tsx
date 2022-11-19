import React from "react";

function Loading({ loading }: { loading: boolean }) {
  return (
    <div className="fixed right-0 bottom-0 z-100">
      {loading && (
        <div className="flex justify-end">
          <img
            src="/assets/images/hamsterLoad.gif"
            alt="Hamster load"
            className="w-[65%]"
          />
        </div>
      )}
    </div>
  );
}

export default Loading;

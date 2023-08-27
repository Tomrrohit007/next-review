"use client";

import { useState } from "react";

const ShareLinkButton = () => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
    navigator.clipboard.writeText(window.location.href);
    setTimeout(() => {
      setClicked(false);
    }, 3000);
  };
  return (
    <button
      className="share-btn relative text-sm border px-2 py-1 rounded-full text-slate-500 hover:text-slate-600 hover:bg-orange-100 flex items-center gap-1"
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-4 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
        />
      </svg>{" "}
      share link
    </button>
  );
};

export default ShareLinkButton;

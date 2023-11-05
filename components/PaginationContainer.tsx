import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import React, { ReactNode } from "react";

const PaginationContainer = ({ page, pageCount, href }) => {
  return (
    <div className="flex items-center gap-2 mb-3">
      <PaginationLink
        href={`${href}?page=${page - 1}`}
        enabled={page > 1}
      >
        <ChevronLeftIcon className="w-5 h-5" />
      </PaginationLink>
      <span>
        Page {page} of {pageCount}
      </span>
      <PaginationLink
        enabled={page < pageCount}
        href={`${href}?page=${page + 1}`}
      >
        <ChevronRightIcon className="w-5 h-5" />
      </PaginationLink>
    </div>
  );
};

const PaginationLink = ({
  children,
  href,
  enabled,
}: {
  children: ReactNode;
  href: string;
  enabled: boolean;
}) => {
  if (!enabled) {
    return (
      <span className="flex items-center px-2 py-1 text-sm border rounded cursor-not-allowed text-slate-500 hover:bg-orange-100 hover:text-slate-700">
        {children}
      </span>
    );
  }
  return (
    <Link
      href={href}
      className="px-2 py-1 text-sm border rounded text-slate-500 hover:bg-orange-100 hover:text-slate-700"
    >
      {children}
    </Link>
  );
};

export default PaginationContainer;

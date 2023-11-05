import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";


import { getReviews, getSearchReviews } from "@/lib/reviews";
import PaginationContainer from "@/components/PaginationContainer";
import Heading from "@/components/Heading";
import SearchBox from "@/components/SearchBox";

export const metadata: Metadata = {
  title: "Reviews",
};

const PAGE_SIZE = 6;

export default async function ReviewsPage({ searchParams }) {
  const page = parseParams(searchParams);
  const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);

  return (
    <>
      <Heading>Reviews</Heading>
      <div className="flex justify-between pr-8 mb-6">
        <PaginationContainer
          page={page}
          pageCount={pageCount}
          href="/reviews"
        />
        <div>
          <SearchBox />
        </div>
      </div>
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review, index) => (
          <li
            key={review.slug}
            className="bg-white border rounded shadow w-80 hover:shadow-xl"
          >
            <Link href={`/reviews/${review.slug}`}>
              <Image
                src={review.image}
                alt=""
                width="320"
                height="180"
                className="rounded-t"
                priority={index === 0}
              />

              <h2 className="py-1 font-semibold text-center font-orbitron">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

const parseParams = (params): number => {
  const page = params.page ? parseInt(params.page) : 1;
  if (isFinite(page) && page > 0) {
    return page;
  }
  return 1;
};

import { getReviews } from "@/lib/reviews";
import { Metadata}  from "next";
import Image from "next/image";
import Link from "next/link";



export const metadata:Metadata = {
  title: "Reviews",
};

export default async function ReviewsPage() {

  const reviews = await getReviews()
  return (
    <>
      <h1 className="heading_element">Reviews</h1>
      <ul className="flex flex-row flex-wrap gap-6">
        {reviews.map(review => (
          <li key={review.slug} className="w-[620px]">
            <Link href={`/reviews/${review.slug}`}>
              <Image
                src={review.image}
                alt=""
                width={620}
                height={340}
                className="rounded mb-2"
              />
              <h2 className="text-center font-orbitron font-semibold">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

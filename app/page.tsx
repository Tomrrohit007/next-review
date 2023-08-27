import { getFeatureReview } from "@/lib/reviews";
import Image from "next/image";
import Link from "next/link";

export default async function HomePage() {
  const review = await getFeatureReview();
  return (
    <>
      <h1 className="heading_element">Indie Gamer</h1>
      <p>Only the best indie games, reviewed for you.</p>
      <li key={review.slug} className="w-[620px] list-none">
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
    </>
  );
}

import type { Metadata } from 'next';
import Heading from '@/components/Heading';
import ShareLinkButton from '@/components/ShareLinkButton';
import { getReview, getSlugs } from '@/lib/reviews';

interface ReviewPageParams {
  slug: string;
}

interface ReviewPageProps {
  params: ReviewPageParams;
}

export async function generateStaticParams(): Promise<ReviewPageParams[]> {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

// export async function generateMetadata({ params: { slug } }: ReviewPageProps): Promise<Metadata> {
//   const review = await getReview(slug);
//   return {
//     title: review.title,
//   };
// }

export default async function ReviewPage({ params: { slug } }: ReviewPageProps) {
  // const {
  //   title,
  //   date,
  //   image,
  //   body,
  //   subtitle} = 
  await getReview(slug);
  const title = ""
  const image = ""
  const date = ""
  return (
    <>
      <Heading>{title}</Heading>
      <div className="flex items-baseline gap-3">
        <p className="pb-2 talic">{date}</p>
        <ShareLinkButton />
      </div>
      <img src={image} alt=""
        width="640" height="360" className="mb-2 rounded"
      />
    </>
  );
}

import { getReview, getSlugs } from "@/lib/reviews";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import ShareLinkButton from "../../../components/ShareLinkButton";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateStaticParams() {
  const slugs = await getSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const {
    params: { slug },
  } = props;
  const { title } = await getReview(slug);
  return { title: title };
}

export default async function ReviwePage(props: Props) {
  const {
    params: { slug },
  } = props;

  const { title, image, date, body } = await getReview(slug);
  return (
    <>
      <h1 className="heading_element">{title}</h1>
      <div className="flex items-center gap-3 mb-2">
        <p className="italic pb-2">{date}</p>
        <ShareLinkButton />
      </div>
      <Image
        src={image}
        alt=""
        width={640}
        height={360}
        className="rounded pb-3"
      />
      <article
        dangerouslySetInnerHTML={{ __html: body }}
        className="max-w-screen prose prose-slate"
      />
    </>
  );
}

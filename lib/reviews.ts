import { readdir } from "node:fs/promises";
import { marked } from "marked";
import qs from "querystring";

const CMS_URL = "http://localhost:1337";

export interface Review {
  slug?: string;
  title: string;
  date: string;
  image: string;
  body?: string;
  subtitle?: string;
}

export async function getFeaturedReview(): Promise<Review> {
  const reviews = await getReviews();
  return reviews[0];
}

export async function getReview(slug: string): Promise<Review> {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(
      {
        filters: { slug: { $eq: slug } },
        fields: ["slug", "title", "subtitle", "publishedAt", "body"],
        populate: { image: { fields: ["url"] } },
        pagination: { pageSize: 1, withCount: false },
      },
      { encodeValuesOnly: true }
    );
  console.log("getReview:", url);
  const response = await fetch(url);
  const { data } = await response.json();
  const { attributes } = data[0];
  return {
    slug: attributes.slug,
    title: attributes.title,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    image: CMS_URL + attributes.image.data.attributes.url,
    body: marked(attributes.body, { headerIds: false, mangle: false }),
  };
}

export async function getReviews(): Promise<Review[]> {
  const url = `${CMS_URL}/api/reviews?populate=*`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error fetching data: ${response.statusText}`);
  }

  const body = await response.json();
  const games = body.data;

  // Process and modify the data
  const formattedGames = games.map((game) => {
    const { attributes } = game;
    const imageUrl =
      attributes.image?.data?.attributes?.formats?.medium?.url || null;

    // Extract only the desired fields from the attributes
    const { slug, title, publishedAt } = attributes;

    return {
      slug,
      title,
      publishedAt,
      image: CMS_URL + imageUrl,
    };
  });

  return formattedGames;
}

export async function getSlugs(): Promise<string[]> {
  const files = await readdir("./content/reviews");
  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.slice(0, -".md".length));
}

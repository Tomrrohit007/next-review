import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import { marked } from "marked";

export async function getFeatureReview() {
  const reviews =  await getReviews()
  return reviews[0]

}

export async function getReview(slug: string) {
  const text = await readFile(`content/reviews/${slug}.md`, "utf8");
  const {
    content,
    data: { title, image, date },
  } = matter(text);
  const body = marked(content, { headerIds: false, mangle: false });
  return { title, image, date, body, slug };
}

export async function getSlugs() {
  return (await readdir("content/reviews"))
    .filter((file) => file.endsWith(".md"))
    .map((each) => each.slice(0, -".md".length));
}

export async function getReviews() {
  const slugs = await getSlugs();
  const reviews = [];

  for (const file of slugs) {
    const review = await getReview(file);
    reviews.push(review);
  }

  reviews.sort((a, b)=> b.date.localeCompare(a.date))
  return reviews;
}

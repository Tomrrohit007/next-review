import fetch from "node-fetch";
import { writeFileSync } from "node:fs";

async function fetchSingleReview(slug) {
  try {
    const url = "http://localhost:1337/api/reviews";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    const review = data.data.find((review) => review.attributes.slug === slug);

    if (!review) {
      console.log(`No review found with slug: ${slug}`);
      return;
    }

    const { title, publishedAt, subtitle, body, image } = review.attributes;

    const formattedReview = {
      slug,
      title,
      publishedAt,
      subtitle,
      body,
      image: image && image.formats?.medium?.url,
    };

    const formattedData = JSON.stringify(formattedReview, null, 2);

    const file = "scripts/strapi-response.json";
    writeFileSync(file, formattedData);

    console.log("Single review fetched and saved successfully!");
  } catch (error) {
    console.error("Error:", error.message);
  }
}

const targetSlug = "black-mesa"; // Replace with the slug of the review you want to fetch
fetchSingleReview(targetSlug);

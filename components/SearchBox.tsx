"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";
import { Combobox } from "@headlessui/react";
import { useRouter } from "next/navigation";

import { SearchableReview } from "@/lib/reviews";

export default function SearchBox() {
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [query, setQuery] = useState("");
  const [debounceQuery] = useDebounce(query, 400);

  const [reviews, setReviews] = useState<SearchableReview[]>([]);
  useEffect(() => {
    if (debounceQuery.length > 1) {
      const controller = new AbortController();
      (async () => {
        const url = "/api/reviews?query=" + decodeURIComponent(debounceQuery);
        const res = await fetch(url, { signal: controller.signal });
        const reviews = await res.json();
        setReviews(reviews);
      })();
      return () => controller.abort();
    } else {
      setReviews([]);
    }
    setIsClient(true);
  }, [debounceQuery]);

  if (!isClient) {
    return null;
  }

  const handleChange = (slug) => {
    router.push(`/reviews/${slug}`);
  };

  return (
    <div className="relative w-56">
      <Combobox onChange={handleChange}>
        <Combobox.Input
          placeholder="Search"
          className="w-full px-2 py-1 border rounded-none"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
        />
        <Combobox.Options className="absolute w-full bg-white mt-0.5">
          {reviews.map((review) => {
            return (
              <Combobox.Option
                className="w-full border"
                key={review.slug}
                value={review.slug}
              >
                {({ active }) => (
                  <span
                    className={`block truncate px-2 py-1 w-full ${
                      active ? "bg-orange-200" : ""
                    }`}
                  >
                    {review.title}
                  </span>
                )}
              </Combobox.Option>
            );
          })}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}

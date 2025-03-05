import Link from "next/link";
import React from "react";

const SearchResult = ({ searchResult, term, closeSearchResults }) => {
  return (
    <div class="absolute left-0 top-12 z-[999] w-full rounded-md bg-white p-4 shadow">
      <p class="!text-lg">
        Showing results for
        <span class="font-semibold">"{term}"":</span>
      </p>
      <ul role="list" class="divide-y divide-gray-100 [&>*]:py-2">
        {searchResult?.map((result) => (
          <li key={result?.id}>
            <Link
              href={`/docs/${result?.id}`}
              className="transition-all hover:text-emerald-600"
              onClick={(e) => closeSearchResults(e)}
            >
              {result.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResult;

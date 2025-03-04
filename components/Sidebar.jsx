"use client";
import {
  getDocumentsByAuthor,
  getDocumentsByCategory,
  getDocumentsByTag,
} from "@/utils/doc-util";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Sidebar = ({ docs }) => {
  const allDocuments = docs;
  const pathName = usePathname();
  const [rootNodes, setRootNodes] = useState([]);
  const [nonRootNodesGrouped, setNonRootNodesGrouped] = useState({});

  useEffect(() => {
    let matchedDocs = allDocuments;

    if (pathName.includes("/tags")) {
      const tag = pathName.split("/")[2];
      //console.log("tag",tag)
      matchedDocs = getDocumentsByTag(docs, tag);
    } else if (pathName.includes("/author")) {
      const author = pathName.split("/")[2];
      //console.log('author',author)
      matchedDocs = getDocumentsByAuthor(docs, author);
    } else if (pathName.includes("/categories")) {
      const category = pathName.split("/")[2];
      matchedDocs = getDocumentsByCategory(docs, category);
      //console.log('category',category)
    }

    const roots = matchedDocs.filter((doc) => !doc.parent);

    const nonRoot = Object.groupBy(
      matchedDocs.filter((doc) => doc.parent),
      ({ parent }) => parent
    );

    const nonRootsKeys = Reflect.ownKeys(nonRoot);
        nonRootsKeys.forEach(key => {
            const foundInRoots = roots.find((root) => root.id === key);
            if(!foundInRoots) {
                const foundInDocs = docs.find((doc) => doc.id === key);
                roots.push(foundInDocs);
            }
        });

        roots.sort((a, b) => {
            if (a.order < b.order) {
              return -1;
            }
            if (a.order > b.order) {
              return 1;
            }
            return 0;
          });

    console.log('matchDocs',matchedDocs)

    setRootNodes([...roots]);
    setNonRootNodesGrouped({ ...nonRoot });
  }, [pathName]);

  return (
    <nav className="hidden lg:mt-10 lg:block">
      <ul role="list" className="border-l border-transparent">
        {rootNodes.map((rootNode) => (
          <li key={rootNode.id} className="relative">
            <Link
              aria-current="page"
              className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
              href={`/docs/${rootNode.id}`}
            >
              <span className="truncate">{rootNode.title}</span>
            </Link>
            {/* চাইল্ড ডকুমেন্টগুলো রেন্ডার করুন */}
            {nonRootNodesGrouped[rootNode.id] && (
              <ul role="list" className="border-l border-transparent">
                {nonRootNodesGrouped[rootNode.id].map((subRoot) => (
                  <li key={subRoot.id}>
                    <Link
                      className="flex justify-between gap-2 py-1 pl-7 pr-3 text-sm text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                      href={`/docs/${rootNode.id}/${subRoot.id}`}
                    >
                      <span className="truncate">{subRoot.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;

import Link from 'next/link';
import React from 'react'

const Sidebar = ({docs}) => {
  const roots = docs.filter((doc) => !doc.parent);
  // console.log('rootdoc',roots)
  const nonRoot = Object.groupBy(
    docs.filter((doc) => doc.parent),
    ({ parent }) => parent
  );
  // console.log("nonRoot",nonRoot)
  return (
    <nav className="hidden lg:mt-10 lg:block">
    <ul role="list" className="border-l border-transparent">
      {roots.map((rootNode) => (
        <li key={rootNode.id} className="relative">
          <Link
            aria-current="page"
            className="flex justify-between gap-2 py-1 pl-4 pr-3 text-sm text-zinc-900 transition dark:text-white"
            href={`/docs/${rootNode.id}`}
          >
            <span className="truncate">{rootNode.title}</span>
          </Link>
          {/* চাইল্ড ডকুমেন্টগুলো রেন্ডার করুন */}
          {nonRoot[rootNode.id] && (
            <ul role="list" className="border-l border-transparent">
              {nonRoot[rootNode.id].map((subRoot) => (
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
  )
}

export default Sidebar
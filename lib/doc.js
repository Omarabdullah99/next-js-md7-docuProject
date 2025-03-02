import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

const postsDirectory = path.join(process.cwd(), "docs");

export function getDocument() {
  // console.log(postsDirectory)
  const fileNames = fs.readdirSync(postsDirectory);
  // console.log('filenames',fileNames)
  const allDocuement = fileNames.map((fileName) => {
    const id = fileName.replace(".md", "");
    const fullPath = path.join(postsDirectory, fileName);
    //console.log('fullpath',fullPath)
    const fileContents = fs.readFileSync(fullPath, "utf-8");
    //console.log('filecontent',fileContents)
    const matterResult = matter(fileContents);
    //console.log('matterResult',matterResult)
    return {
      id,
      ...matterResult.data,
    };
  });

  //console.log("allDocuement",allDocuement)
  return allDocuement.sort((a, b) => {
    if (a.order < b.order) {
      return -1;
    }
    if (a.order > b.order) {
      return 1;
    }
    return 0;
  });
}

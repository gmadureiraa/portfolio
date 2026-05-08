import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export interface PostData {
  slug: string;
  data: {
    title: string;
    description: string;
    category: string;
    date: string;
    image: string;
  };
  content?: string;
}

export function getLocalPosts(): PostData[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));

  return files
    .map((filename) => {
      const slug = filename.replace(".md", "");
      const raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
      const { data } = matter(raw);

      return {
        slug,
        data: {
          title: data.title || slug,
          description: data.description || "",
          category: data.category || "Geral",
          date: data.date || "2024-01-01",
          image: data.image || "/images/thumbnail.png",
        },
      };
    })
    .sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );
}

export function getLocalPostBySlug(slug: string): PostData | null {
  const filePath = path.join(POSTS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    data: {
      title: data.title || slug,
      description: data.description || "",
      category: data.category || "Geral",
      date: data.date || "2024-01-01",
      image: data.image || "/images/thumbnail.png",
    },
    content: sanitizeHtml(marked(content) as string, {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat([
        "img",
        "h1",
        "h2",
      ]),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        img: ["src", "alt", "title", "loading", "width", "height"],
        a: ["href", "name", "target", "rel"],
      },
    }),
  };
}

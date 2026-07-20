import { readFile, writeFile } from "fs/promises";
import path from "path";

export interface Comment {
  id: string;
  articleSlug: string;
  name: string;
  text: string;
  date: string;
}

const COMMENTS_PATH = path.join(process.cwd(), "src/lib/data/comments.json");

export async function getComments(articleSlug: string): Promise<Comment[]> {
  try {
    const data = await readFile(COMMENTS_PATH, "utf-8");
    const all = JSON.parse(data) as Comment[];
    return all.filter((c) => c.articleSlug === articleSlug);
  } catch {
    return [];
  }
}

export async function addComment(articleSlug: string, name: string, text: string): Promise<Comment> {
  let all: Comment[] = [];
  try {
    const data = await readFile(COMMENTS_PATH, "utf-8");
    all = JSON.parse(data);
  } catch {}

  const comment: Comment = {
    id: `c${Date.now()}`,
    articleSlug,
    name: name || "Аноним",
    text,
    date: new Date().toISOString(),
  };

  all.push(comment);
  await writeFile(COMMENTS_PATH, JSON.stringify(all, null, 2), "utf-8");
  return comment;
}

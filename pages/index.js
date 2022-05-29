import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";
import Post from "../components/Post";
import { sortByDate } from "../utils";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="charles Blog w/ markdown" />
        <meta name="robots" content="follow" />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="" />
        <meta property="og:description" content="" />
        <meta property="og:url" content="" />
        <meta property="og:site_name" content="" />
        <meta property="og:image" content="" />
        <meta
          name="keywords"
          content="Unit Tests,CharlesSinPersonalBlogger,React, PHP 8, Python, Django, Tailwind, Bootstrap, JavaScript Performance"
        ></meta>

        <title>Dev Blog</title>

        <link rel="icon" href="/vercel.svg" />
        <link
          rel="canonical"
          href="https://charles-blogger-nextjs.vercel.app/"
        />
        <link
          rel="alternate"
          href="https://charles-blogger-nextjs.vercel.app/"
          hrefLang="en-us"
        />
      </Head>

      <div className="posts">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join("posts"));

  // Get slug and frontmatter from posts
  const posts = files.map((filename) => {
    // Create slug
    const slug = filename.replace(".md", "");

    // Get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}

import Link from "next/link";

export default function Post({ post }) {
  return (
    <div className="card">
      <img
        src={post.frontmatter.cover_image}
        alt={post.frontmatter.cover_image}
        title={post.frontmatter.cover_image}
        loading="lazy"
      />

      <div className="post-date">Posted on {post.frontmatter.date}</div>

      <h3>{post.frontmatter.title}</h3>

      <p>{post.frontmatter.excerpt}</p>

      <Link href={`/blog/${post.slug}`}>
        <a className="btn">Read More</a>
      </Link>
    </div>
  );
}

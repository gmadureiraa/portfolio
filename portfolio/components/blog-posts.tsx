"use client";

import { useState, useEffect } from "react";
import { fetchPosts } from "@/lib/fetchers";
import ProjectShowcaseVertical from "@/components/project-showcase-vertical";

const BlogPosts = () => {
  const [posts, setPosts] = useState<any | null>(null);
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    const getPosts = async () => {
      const postsData = await fetchPosts();
      if (postsData) {
        const formattedPosts = postsData.postsData.map((post: any) => ({
          name: post.data.title,
          body: post.data.description,
          slug: `posts/${post.slug}`,
          image: post.data.image,
          category: post.data.category,
          date: post.data.date,
        }));
        setFiles(formattedPosts.slice(0, 8));
      }
      setPosts(postsData);
    };

    getPosts();
  }, []);

  return <ProjectShowcaseVertical projects={files} />;
};

export default BlogPosts; 
"use client";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

import { IPost } from "@/types/commonTypes";

import Loader from "@/components/loader";
import { PostCard } from "@/components/postCard";

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fetchPosts = useCallback(() => {
    setIsLoading(true);
    axios
      .get("/api/post")
      .then((res) => {

        setPosts(res.data.data);
      })
      .catch((err) => setPosts([]))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  if (isLoading) {
    return (
      <div className="relative min-h-[calc(100vh-4rem)] w-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader color="black" />
        </div>
      </div>
    );
  }

  return (
    <div className={`calc(min-h-screen_-_4rem) w-full`}>
      <div className="container mx-auto px-2 sm:px-4">
        <h1 className="text-xl md:text-3xl font-bold my-8">Recent Posts</h1>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2  gap-2 mb-6 ">
            {posts.map((post: IPost, index: number) => (
              <PostCard post={post} key={index} />
            ))}
          </div>
        ) : (
          <h1 className="text-2xl font-light my-8">No Recent Posts</h1>
        )}
      </div>
    </div>
  );
}

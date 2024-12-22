"use client";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { IPost } from "@/types/commonTypes";
import axios, { AxiosError } from "axios";
import { Calendar, Send, User } from "lucide-react";
import { use, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
const fetcher = (url: string) => axios.get(url).then((res) => res.data.data);

export default function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [comment, setComment] = useState("");

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (!comment.trim()) return;


    try {
      const response = await axios.post("/api/comment", { comment, id });
      toast.success(response.data.message ?? "Comment added!");

      mutate();
      setComment("");
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.log(error);
      toast.error(
        axiosError?.response?.data?.message ?? "Failed to submit comment."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // const fetchPost = useCallback(() => {
  //   setIsLoading(true);
  //   axios
  //     .get(`/api/post/${String(id)}`)

  //     .then((res) => {
  //       setPost(res.data.data);
  //     })
  //     .catch((err) => setPost(null))
  //     .finally(() => {
  //       setIsLoading(false);
  //     });
  // }, []);
  // useEffect(() => {
  //   fetchPost();
  // }, [fetchPost]);
  const {
    data: post,
    error,
    mutate,
    isLoading,
  } = useSWR<IPost>(`/api/post/${id}`, fetcher);
  if (isLoading) {
    return (
      <div className="relative min-h-[calc(100vh-4rem)] w-full">
        <div className="absolute inset-0 flex items-center justify-center">
          <Loader color="black" />
        </div>
      </div>
    );
  }
  if (!post || error) {
    <div className="max-w-4xl mx-auto space-y-8">No post found</div>;
  }
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Card>
        <div className="aspect-video relative">
          <img
            src={post?.image}
            alt={post?.title}
            className="object-cover w-full h-full"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-3xl">{post?.title}</CardTitle>
          <div className="flex items-center text-sm text-muted-foreground space-x-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {post?.author.name}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(post?.createdAt ?? "").toLocaleDateString()}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-lg leading-relaxed">{post?.content}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Comments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmitComment} className="flex gap-2">
            <Textarea
              placeholder="Write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1"
            />
            <Button
              type="submit"
              className="disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              <Send className="h-4 w-4" />
            </Button>
          </form>

          <div className="space-y-4">
            {post?.comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-sm">
                      <User className="h-4 w-4 mr-1" />
                      <span className="font-medium">{comment.author.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(comment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p>{comment.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

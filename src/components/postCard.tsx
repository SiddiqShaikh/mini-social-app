import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { MessageSquare, User, Calendar } from "lucide-react";
import { IPost } from "@/types/commonTypes";

interface PostCardProps {
  post: IPost;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/post/${post.id}`}>
      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="aspect-video relative">
          <img
            src={post.image}
            alt={post.title}
            className="object-cover w-full h-full"
          />
        </div>
        <CardHeader>
          <CardTitle>
            {post.title}
            <p className="text-muted-foreground line-clamp-2  text-sm font-normal">
              {post.content}
            </p>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-start sm:items-center flex-col sm:flex-row text-sm text-muted-foreground sm:space-x-4">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {post.author.email}
            </div>
            <div className="flex items-center">
              <MessageSquare className="h-4 w-4 mr-1" />
              {post._count.comments}
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

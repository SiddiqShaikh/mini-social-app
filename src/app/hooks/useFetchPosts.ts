import { create } from "zustand";
import axios from "axios";
import { IPost } from "@/types/commonTypes";

interface PostState {
  posts: IPost[];
  isLoading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  isLoading: false,
  error: null,

  fetchPosts: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.get("/api/post");
      set({ posts: res.data.data, isLoading: false });
    } catch (err) {
      set({ error: "Failed to fetch posts", isLoading: false, posts: [] });
    }
  },
}));

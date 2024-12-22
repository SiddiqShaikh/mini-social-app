import { create } from "zustand";
import axios from "axios";
import { IPost } from "@/types/commonTypes";

interface PostState {
  posts: IPost[];
  loading: boolean;
  error: string | null;
  fetchPosts: () => Promise<void>;
}

export const usePostStore = create<PostState>((set) => ({
  posts: [],
  loading: false,
  error: null,

  fetchPosts: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/api/post");
      set({ posts: res.data.data, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch posts", loading: false, posts: [] });
    }
  },
}));

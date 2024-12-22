"use client";
import useAddNewModal from "@/app/hooks/useAddNewModal";
import { Modal } from "./modal";
import { Input } from "../ui/input";
import { ImagePlus } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "../loader";
import { usePostStore } from "@/app/hooks/useFetchPosts";

type AddNewPost = {
  title: string;
  description: string;
  imageUrl: string;
};

export default function AddNewModal() {
  const addNewModalState = useAddNewModal();
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { fetchPosts } = usePostStore();
  const [formData, setFormData] = useState<AddNewPost>({
    title: "",
    description: "",
    imageUrl: "",
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];

      setFile(event.target.files[0]);
      if (selectedFile) {
        const previewUrl = URL.createObjectURL(selectedFile);
        setImagePreview(previewUrl);
      }
    }
  };

  const handleUploadImage = async (file: File | null) => {
    if (!file) {
      setMessage("Please select an image to upload");
      return null;
    }

    const fileFormData = new FormData();
    fileFormData.append("image", file);

    try {
      setIsLoading(true);
      const response = await fetch("/api/upload", {
        method: "POST",
        body: fileFormData,
      });

      const data = await response.json();

      if (response.ok) {
        return data.data;
      } else {
        setMessage(data.message || "Upload failed");
        return null;
      }
    } catch (error) {
      setMessage("An error occurred while uploading the image.");
      return null;
    } finally {
      setIsLoading(false);
    }
  };
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const imageUpload = await handleUploadImage(file);
    if (!imageUpload) {
      setIsLoading(false);
      return;
    }

    const postData = {
      ...formData,
      imageUrl: imageUpload?.imageUrl,
    };

    axios
      .post("/api/post", postData)
      .then((res) => {
        router.refresh();
        toast.success(res.data.message ?? "Success");
        addNewModalState.onClose();
        // fetchPosts();
      })
      .catch((error) => {
        toast.error(error.response?.data.message ?? "Something went wrong.");
      })
      .finally(() => {
        setIsLoading(false);
        fetchPosts();
      });
  };

  const body = (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Enter title"
          name="title"
          value={formData.title}
          onChange={onChangeHandler}
          required
        />
      </div>
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Enter Description"
          name="description"
          value={formData.description}
          onChange={onChangeHandler}
          required
        />
      </div>
      <div className="space-y-2">
        <label
          htmlFor="image-upload"
          className="border-2 border-dashed rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors"
        >
          {imagePreview ? (
            <div className="relative w-full aspect-video">
              <img
                src={imagePreview}
                alt="Preview"
                className="rounded object-cover w-full h-full"
              />
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-2 text-muted-foreground">
              <ImagePlus className="h-8 w-8" />
              <span>Click to upload image</span>
            </div>
          )}
        </label>

        <input
          id="image-upload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          name="file"
          required
        />
      </div>
      {message && <p className="text-sm text-red-500">{message}</p>}
      <div className="flex items-center gap-4">
        <Button
          className="flex-1 disabled:bg-gray-400 disabled:cursor-not-allowed"
          variant="outline"
          type="button"
          onClick={() => addNewModalState.onClose()}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button
          className="flex-1 disabled:bg-gray-400 disabled:cursor-not-allowed"
          type="submit"
          disabled={isLoading}
        >
          {!isLoading ? <>Submit Post</> : <Loader />}
        </Button>
      </div>
    </form>
  );

  return (
    <Modal
      title="Add New Post"
      isOpen={addNewModalState.isOpen}
      onClose={addNewModalState.onClose}
      body={body}
    />
  );
}

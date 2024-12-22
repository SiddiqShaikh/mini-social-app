"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import toast from "react-hot-toast";
import { LogIn } from "lucide-react";

import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { TLoginFormData } from "@/types/commonTypes";

export default function Login() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<TLoginFormData>({
    password: "",
    email: "",
  });
  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    await signIn("credentials", { ...formData, redirect: false })
      .then((callback) => {
        if (callback?.ok) {

          toast.success("success");
          router.push("/home");
        } else {

          toast.error(callback?.error);
        }
      })
      .finally(() => {

        setIsLoading(false);
      });
  };
  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => onChangeHandler(e)}
              required
            />
          </div>
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) => onChangeHandler(e)}
              required
            />
          </div>
          <Button
            className="w-full disabled:cursor-not-allowed disabled:bg-gray-400"
            type="submit"
            disabled={isLoading}
          >
            {!isLoading ? (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </>
            ) : (
              <Loader />
            )}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link href="/register" className="text-primary hover:underline">
            Register
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

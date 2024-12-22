"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import axios from "axios";
import { LogIn } from "lucide-react";

import toast from "react-hot-toast";
// components 
import Loader from "@/components/loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// types 
import { TRegisterFormData } from "@/types/commonTypes";

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<TRegisterFormData>({
    name: "",
    password: "",
    email: "",
  });
  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();


    axios
      .post("/api/register", formData)
      .then((res) => {
        router.push("/login");
        toast.success(res.data.message ?? "Success");
      })
      .catch((error) => {
        toast.error(error.response.data.message ?? "Something went wrong.");

      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Card className="w-full">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center">Register</CardTitle>
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
              type="text"
              placeholder="Username"
              name="name"
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
                Register
              </>
            ) : (
              <Loader />
            )}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

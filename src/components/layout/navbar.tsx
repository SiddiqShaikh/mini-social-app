"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";

import { Home, LogIn, LogOut, Menu, Plus, UserPlus } from "lucide-react";

import useAddNewModal from "@/app/hooks/useAddNewModal";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
interface INAVBAR {
  currentUser: any;
}
export default function Navbar({ currentUser }: INAVBAR) {
  const addNewModalState = useAddNewModal();

  return (
    <nav className="border-b bg-white backdrop-blur  fixed w-full z-10">
      <div className="container flex h-14 items-center mx-auto px-4">
        <div className="mr-4 flex flex-1 sm:flex-0 ">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Home className="h-6 w-6" />
            <span className="font-bold">Social App</span>
          </Link>
        </div>
        {!currentUser ? (
          <div className="sm:flex flex-1 items-center justify-end space-x-2 hidden">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button variant="ghost" size="sm">
                <UserPlus className="mr-2 h-4 w-4" />
                Register
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="hidden sm:flex flex-1 items-center justify-end space-x-2">
              <Button
                size="sm"
                onClick={() => {
                  addNewModalState.onOpen();
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                New Post
              </Button>
              <Button size="sm" onClick={() => signOut()}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
            {/* dropdown  */}
            <div className="block sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => addNewModalState.onOpen()}>
                    <Plus className="mr-2 h-4 w-4" />
                    New Post
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

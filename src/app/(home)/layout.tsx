import Navbar from "@/components/layout/navbar";
import getCurrentUser from "../actions/getCurrentUser";
import { redirect } from "next/navigation";
export const dynamic = "force-dynamic";
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) return redirect("/login");
  return (
    <div className="min-h-screen w-full">
      <Navbar currentUser={currentUser} />
      <div className="pt-16">{children}</div>
    </div>
  );
}

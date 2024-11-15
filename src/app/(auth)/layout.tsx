"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import  Link  from "next/link";

import { Button } from "@/components/ui/button";

interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  const pathname = usePathname();
  const isSignin = pathname === "/sign-in";
  return (
    <main>
      <div className="mx-auto max-w-screen-2xl p-4 bg-slate-100">
        <nav className="flex justify-between items-center">
          <Image src="/logo.svg" alt="logo" width={152} height={56} />
          <Button asChild variant="secondary">
          <Link href={isSignin ? "/sign-up" : "/sign-in"}>
              {isSignin ? "Sign Up" : "Login"}
            </Link>
          </Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;

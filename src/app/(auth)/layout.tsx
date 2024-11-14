import { Button } from "@/components/ui/button";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <main>
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex justify-between items-center">
          <Image src="/logo.svg" alt="logo" width={152} height={56} />
          <Button variant="secondary">SignUp</Button>
        </nav>
        <div className="flex flex-col items-center justify-center pt-4 md:pt-14">

        {children}
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;

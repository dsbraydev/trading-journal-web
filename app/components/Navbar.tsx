"use client";
import Image from "next/image";
import LogoIcon from "../../public/logo.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const supabase = createClient();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <div className="bg-gray-400 w-full h-14 flex justify-between items-center p-2">
      <div className="max-h-12 max-w-12 w-full h-full relative">
        <Image src={LogoIcon} alt="Trading" fill className="object-contain" />
      </div>
      <div className="flex gap-2">
        {user ? (
          <Button onClick={handleLogout}>Logout</Button>
        ) : (
          <>
            <Button asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild variant="secondary">
              <Link href="/auth/sign-up">Sign Up</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

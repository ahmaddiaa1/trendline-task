"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export function DashboardClient() {
  const { user, loading, token, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !token) {
      router.replace("/login");
    }
  }, [loading, token, router]);

  if (!token) return null;

  return (
    <div className='w-full max-w-xl space-y-4 text-center'>
      <h1 className='text-3xl font-semibold'>
        Welcome{user?.name ? `, ${user.name}` : ""}
      </h1>
      <div className='flex items-center justify-center gap-4'>
        <Button onClick={() => router.push("/ui")}>UI</Button>
        <Button onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}

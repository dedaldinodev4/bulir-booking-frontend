"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSession } from "next-auth/react";

export function useRequireRole(role: string) {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session?.user) {
      router.replace("/signin");
      return;
    }

    if (session.user.role !== role) {
      router.replace("/error-401");
    }
  }, [session, role, router]);
}

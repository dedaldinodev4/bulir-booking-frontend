"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: ("ADMIN" | "PROVIDER" | "CLIENT")[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/signin");
      return;
    }

    if (allowedRoles && !allowedRoles.includes(session.user.role as any)) {
      router.push("/");
      return;
    }
  }, [session, status, allowedRoles, router]);

  if (status === "loading") return <p>Carregando...</p>;

  return <>{children}</>;
}

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user) {
      router.push("/login");
      return;
    }

    const role = session.user.role;

    if (role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/user/dashboard");
    }
  }, [session, status, router]);

  return <p>Redirecting...</p>;
}
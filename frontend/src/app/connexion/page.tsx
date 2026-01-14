"use client";

import { useRouter } from "next/navigation";
import LoginForm from "@/components/auth/LoginForm";

export default function ConnexionPage() {
  const router = useRouter();

  return (
    <LoginForm
      onBack={() => router.push("http://localhost:3000/")}
      userType="buyer"
    />
  );
}

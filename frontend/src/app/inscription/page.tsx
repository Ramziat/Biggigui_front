"use client";

import { useRouter } from "next/navigation";
import RegisterForm from "@/components/auth/RegisterForm";

export default function InscriptionPage() {
  const router = useRouter();

  return (
    <RegisterForm
      onBack={() => router.push("http://localhost:3000/")}
      userType="buyer"
    />
  );
}

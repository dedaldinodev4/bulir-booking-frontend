import SignUpForm from "@/components/auth/SignUpForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "booking.ao | Criar Conta",
  description: "",
};

export default function SignUp() {
  return <SignUpForm />;
}

"use server"

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function handleCredentialSignIn({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      throw new AuthError(result.error);
    }

    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
          };
        default:
          return {
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
}

export async function handleSignOut() {
  await signOut();
}

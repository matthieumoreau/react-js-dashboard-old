"use server";

import { AuthError } from "next-auth";
import { signIn } from "../../../auth";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
    
  const body = {
    username: formData.get("username") as string,
    password: formData.get("password") as string,
  };

  try {
    await signIn("credentials", body);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

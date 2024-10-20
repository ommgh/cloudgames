"use server";

import { createAdminClient } from "@/lib/appwrite";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";
import { redirect } from "next/navigation";

export async function signUpWithGoogle() {
  const { account } = await createAdminClient();
  const origin = headers().get("origin");
  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/oauth`,
    `${origin}/auth`
  );

  return redirect(redirectUrl);
}

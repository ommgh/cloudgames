import { createSessionClient, getLoggedInUser } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

async function signOut() {
  "use server";
  const account = await createSessionClient();
  cookies().delete("my-custom-session");
  await account.account.deleteSession("current");

  redirect("/auth");
}

export default async function ProfilePage() {
  const user = await getLoggedInUser();
  if (!user) redirect("/auth");

  return (
    <>
      <h1>Welcome, {user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={signOut}>Sign Out</button>
    </>
  );
}

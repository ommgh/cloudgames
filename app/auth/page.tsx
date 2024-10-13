"use client";

import { useState } from "react";
import { Account, ID, Models } from "appwrite";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Assuming you have a separate file for Appwrite configuration
import { account } from "@/lib/appwrite";

interface User extends Models.User<Models.Preferences> {}

const LoginPage: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isRegistering, setIsRegistering] = useState<boolean>(false);

  const login = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await account.createEmailPasswordSession(email, password);
      setLoggedInUser(await account.get());
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const register = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await account.create(ID.unique(), email, password, name);
      await login(e);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  const logout = async (): Promise<void> => {
    await account.deleteSession("current");
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="mb-4">Logged in as {loggedInUser.name}</p>
          <Button onClick={logout}>Logout</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen lg:grid lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">
              {isRegistering ? "Register" : "Login"}
            </h1>
            <p className="text-balance text-muted-foreground">
              {isRegistering
                ? "Create an account to get started"
                : "Enter your email below to login to your account"}
            </p>
          </div>
          <form
            onSubmit={isRegistering ? register : login}
            className="grid gap-4"
          >
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {!isRegistering && (
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                )}
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {isRegistering && (
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <Button type="submit" className="w-full">
              {isRegistering ? "Register" : "Login"}
            </Button>
          </form>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
          <div className="mt-4 text-center text-sm">
            {isRegistering ? (
              <>
                Already have an account?{" "}
                <Link
                  href="#"
                  className="underline"
                  onClick={() => setIsRegistering(false)}
                >
                  Login
                </Link>
              </>
            ) : (
              <>
                Don&apos;t have an account?{" "}
                <Link
                  href="#"
                  className="underline"
                  onClick={() => setIsRegistering(true)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/appwrite-castel.png"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
};

export default LoginPage;

"use client";

import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  const { user } = useUser();

  return (
    <nav>
      <ul className="grid grid-cols-4 justify-center justify-items-center">
        <li className="">
          <Link href="/">{user ? <UserButton /> : "Home"}</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <SignOutButton />
          </SignedIn>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

"use client";

import {
  SignInButton,
  SignOutButton,
  SignedIn,
  SignedOut,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@radix-ui/react-navigation-menu";
import React from "react";

const Navbar: React.FC = () => {
  const { user } = useUser();

  return (
    <NavigationMenu>
      <NavigationMenuList className="grid grid-cols-4 justify-center justify-items-center">
        <NavigationMenuItem className="">
          <NavigationMenuLink href="/">
            {user ? (
              <div className="m-0">
                <UserButton />
              </div>
            ) : (
              "Home"
            )}
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/about">About</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <SignOutButton />
          </SignedIn>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default Navbar;

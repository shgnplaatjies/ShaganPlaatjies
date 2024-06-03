import Link from "next/link";
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav>
      <ul className="grid grid-cols-3 justify-center justify-items-center">
        <li className="">
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

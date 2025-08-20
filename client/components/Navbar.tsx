import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <nav className="w-full flex justify-between items-center py-2 px-4">
        <Link href="/">
          <Image
            src="/assets/logo.svg"
            width={80}
            height={40}
            alt="main logo"
            className="w-[120px]"
          />
        </Link>

        <Link
          href="/add-post"
          className="px-4 py-2 rounded-2xl bg-sky-700 text-white font-medium cursor-pointer"
        >
          Create
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;

"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { IoMdSearch } from "react-icons/io";

const SearchForm = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const searchParams = new URLSearchParams(window.location.search);

    if (!value.trim()) {
      searchParams.delete("query");
    } else {
      searchParams.set("query", value.trim());
    }

    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    router.push(newUrl);
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-full h-10 border border-gray-400 rounded-lg flex items-center px-3"
    >
      <button
        type="submit"
        className="cursor-pointer text-xl border-r border-gray-700 pr-2"
      >
        <IoMdSearch />
      </button>

      <input
        type="text"
        className="w-full outline-none ml-2 text-sm"
        placeholder="Search images by prompt"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};

export default SearchForm;

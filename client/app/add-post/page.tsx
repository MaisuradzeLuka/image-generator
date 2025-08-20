"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { prompts } from "@/constants";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingShare, setIsLoadingShare] = useState(false);

  const handleSurpriseMe = () => {
    const randomNumber = Math.floor(Math.random() * 120);

    const randomPrompt = prompts[randomNumber];

    setPrompt(randomPrompt);
  };

  const handleShare = async () => {
    if (!image || !name || !prompt) {
      setError("Please fill in forms and generate an image before sharing");
      return;
    }

    if (error) setError(null);

    setIsLoadingShare(true);

    try {
      const res = await fetch("http://localhost:5000/api/v1/post/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, prompt, image }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to share image");
        return;
      }

      router.push("/");
    } catch (error: any) {
      console.error("Error sharing image:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoadingShare(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (error) setError(null);

    if (!prompt) {
      setError("Please enter a prompt");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      if (!res.ok) {
        setError("Failed to generate image");
      }

      const data = await res.json();

      console.log(data);

      setImage(data.image);
    } catch (error: any) {
      console.error("Error generating image:", error);
      setError(error.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="w-full max-w-[800px] mx-auto">
      <h1 className="text-4xl font-semibold mb-4">Create</h1>

      <p className="text-gray-600 mb-10">
        Create visually stunning images with a help of AI assitent and share
        with the community
      </p>

      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label htmlFor="name" className="font-medium text-gray-800">
            Name
          </label>

          <input
            type="text"
            id="name"
            name="name"
            className="w-full h-10 border border-gray-400 px-3 rounded-lg mt-2 outline-none"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>

        <div className="my-6">
          <div>
            <label htmlFor="prompt" className="font-medium text-gray-800">
              Prompt
            </label>

            <button
              type="button"
              onClick={handleSurpriseMe}
              className="bg-gray-300 px-1 rounded-md cursor-pointer ml-2"
            >
              Surprise me
            </button>
          </div>

          <input
            type="text"
            id="prompt"
            name="prompt"
            className="w-full h-10 border border-gray-400 px-3 rounded-lg mt-2 outline-none"
            placeholder="Enter the description of the image"
            value={prompt}
            onChange={(e) => setPrompt(e.currentTarget.value)}
          />
        </div>

        <div className="relative w-[400px] h-[400px] mb-4 rounded-md">
          <Image
            src={image ? image : "/assets/preview.png"}
            width={400}
            height={400}
            alt="preview image"
            className="rounded-lg w-full h-full object-cover"
          />

          {isLoading && (
            <div className="absolute w-full h-full flex justify-center items-center top-0 bg-black/40 rounded-md">
              <AiOutlineLoading3Quarters className="text-4xl text-sky-600 animate animate-spin" />
            </div>
          )}
        </div>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-green-600 text-white rounded-md h-10 cursor-pointer font-medium"
        >
          Generate
        </button>
      </form>

      <p className="my-6 text-gray-600 text-sm">
        Once you have image you wanted to generate, you can share it with the
        community
      </p>

      <button
        onClick={handleShare}
        disabled={isLoadingShare}
        className="w-full bg-sky-700 text-white rounded-md h-10 cursor-pointer font-medium"
      >
        Share
      </button>
    </div>
  );
};

export default page;

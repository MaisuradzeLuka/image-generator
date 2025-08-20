"use client";

import { Post } from "@/types";
import Image from "next/image";
import { FaDownload } from "react-icons/fa6";
import { saveAs } from "file-saver";

type Props = Post & {
  style: string;
};

const BlogCard = ({ image, prompt, name, style }: Props) => {
  const handleImageDownload = () => {
    saveAs(image, `${prompt.slice(0, 10)}.jpg`);
  };

  return (
    <div className={`relative w-full h-min group ${style}`}>
      <Image
        src={image}
        width={400}
        height={400}
        alt="image"
        className="w-full rounded-md"
      />

      <div className="absolute bottom-0 left-0 right-0 bg-black/70 max-h-[94.5%] p-4 rounded-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
        <p>{prompt}</p>

        <div className="flex justify-between items-center mt-4 overflow-y-auto">
          <div className="flex items-center gap-1">
            <span className="w-8 h-8 flex justify-center items-center bg-green-600 rounded-full">
              {name[0]}
            </span>

            <span>{name}</span>
          </div>

          <button className="cursor-pointer" onClick={handleImageDownload}>
            <FaDownload />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;

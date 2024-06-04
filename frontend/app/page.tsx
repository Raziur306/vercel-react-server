"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Home = () => {
  const [repoUrl, setRepoUrl] = useState("");
  const [webUrl, setWebUrl] = useState("");
  const handleChange = (e: any) => {
    setRepoUrl(e.target.value);
  };
  const handleSubmit = async () => {
    const res = await fetch("http://localhost:4000/api/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ repoUrl }),
    });
    if (res.ok) {
      setRepoUrl("");
      const data = await res.json();
      setWebUrl(data.link);
    }
  };

  return (
    <>
      <div className="flex w-full h-screen justify-center">
        <div className="flex flex-col gap-5 m-auto h-[50%]">
          {webUrl.length > 0 && (
            <Link
              target="_blank"
              className="hover:text-green-600"
              href={`${webUrl}`}
            >
              {webUrl}
            </Link>
          )}
          <input
            className="bg-slate-200 p-2 rounded-sm"
            placeholder="Enter react repository url"
            onChange={handleChange}
            value={repoUrl}
          />
          <button
            onClick={handleSubmit}
            className="bg-blue-500 p-2 rounded-sm text-white"
          >
            Deploy
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;

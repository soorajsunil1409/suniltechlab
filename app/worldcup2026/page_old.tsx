"use client"

import Image from "next/image"
import { useEffect, useState } from "react";

const END_DATE = new Date("2026-06-12T00:30:00").getTime();

const fetchData = async () => {
  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "suniltechlab@gmail.com",
        password: "suniltechlab",
      }),
    });

    const data = await res.json();
    console.log("Fetched token:", data["token"]);

    return data["token"];
  } catch (error) {
    console.error("Error fetching page:", error);
  }
};

const WorldCup = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const updateTimer = () => {
      setTimeLeft(END_DATE - Date.now());
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const getToken = async () => {
      const tkn = await fetchData();
      setToken(tkn);

      const data = await fetch("/api/games", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tkn}`,
        },
      });
      const gamesData = await data.json();
      console.log("Fetched games data:", gamesData);
    };

    getToken();

    
  }, []);

  const days = String(
    Math.floor(timeLeft ? timeLeft / (1000 * 60 * 60 * 24) : 0)
  ).padStart(2, "0");

  const hours = String(
    Math.floor((timeLeft ? timeLeft % (1000 * 60 * 60 * 24) : 0) / (1000 * 60 * 60))
  ).padStart(2, "0");

  const minutes = String(
    Math.floor((timeLeft ? timeLeft % (1000 * 60 * 60) : 0) / (1000 * 60))
  ).padStart(2, "0");

  const seconds = String(
    Math.floor((timeLeft ? timeLeft % (1000 * 60) : 0) / 1000)
  ).padStart(2, "0");

  return (
    <div className="flex flex-col h-full">
      <div className="h-1/3 bg-blue-300">
        <div className="w-full bg-black px-4 py-6 md:px-12 lg:px-20 flex flex-col md:flex-row gap-6 md:gap-2 justify-between items-center">
          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-8">
            <Image
              src="/logo.svg"
              alt="World Cup 2026 Logo"
              width={50}
              height={50}
              className="object-contain w-12 h-12 md:w-16 md:h-16"
            />

            <div className="text-white text-center sm:text-left">
              <div className="text-lg md:text-xl font-bold">
                FIFA World Cup 2026
              </div>
              <div className="text-sm md:text-lg text-gray-300">
                11 June - 19 July 2026
              </div>
            </div>
          </div>

          {timeLeft === null ? (
            <div className="text-white font-bold text-2xl md:text-4xl">
              Loading...
            </div>
          ) : (
            <div className="text-white font-bold flex gap-4 md:gap-6 text-2xl md:text-4xl flex-wrap justify-center">
              <div className="flex flex-col items-center min-w-[60px]">
                <div>{days}</div>
                <div className="text-xs md:text-sm font-normal">DAYS</div>
              </div>

              <div className="flex flex-col items-center min-w-[60px]">
                <div>{hours}</div>
                <div className="text-xs md:text-sm font-normal">HOURS</div>
              </div>

              <div className="flex flex-col items-center min-w-[60px]">
                <div>{minutes}</div>
                <div className="text-xs md:text-sm font-normal">MINS</div>
              </div>

              <div className="flex flex-col items-center min-w-[60px]">
                <div>{seconds}</div>
                <div className="text-xs md:text-sm font-normal">SECS</div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="h-1/3 bg-white">

      </div>

      <div className="h-1/3 bg-blue-300">

      </div>
    </div>
  )
}
export default WorldCup;
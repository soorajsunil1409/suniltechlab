import Image from "next/image";
import { useEffect, useState } from "react";

const END_DATE = new Date("2026-06-12T00:30:00+05:30").getTime();

const CountDownBar = () => {
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const updateTimer = () => {
      setTimeLeft(END_DATE - Date.now());
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);


  const days = String(
    Math.floor(timeLeft ? timeLeft / (1000 * 60 * 60 * 24) : 0)
  ).padStart(2, "0");

  const hours = String(
    Math.floor(
      ((timeLeft ?? 0) % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
    )
  ).padStart(2, "0");

  const minutes = String(
    Math.floor(
      ((timeLeft ?? 0) % (1000 * 60 * 60)) /
      (1000 * 60)
    )
  ).padStart(2, "0");

  const seconds = String(
    Math.floor(((timeLeft ?? 0) % (1000 * 60)) / 1000)
  ).padStart(2, "0");

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-5">
          <Image
            src="/logo.svg"
            alt="World Cup Logo"
            width={80}
            height={80}
          />
          <div>
            <h1 className="text-white text-3xl md:text-5xl font-black">
              FIFA World Cup 2026
            </h1>

            <p className="text-gray-300 mt-2">
              June 11 – July 19, 2026
            </p>
          </div>
        </div>

        {
          timeLeft && (timeLeft > 0) ? (
            <div className="flex gap-4 text-white flex-wrap justify-center">
              {[
                { value: days, label: "DAYS" },
                { value: hours, label: "HOURS" },
                { value: minutes, label: "MINS" },
                { value: seconds, label: "SECS" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/10 backdrop-blur rounded-xl px-5 py-4 min-w-[90px] text-center"
                >
                  <div className="text-3xl font-bold">
                    {item.value}
                  </div>

                  <div className="text-xs text-gray-300">
                    {item.label}
                  </div>
                </div>
              ))
              }
            </div>
          ) : 
            <div className="text-white text-3xl font-semibold px-4">
              The world cup has started!
            </div>
        }
      </div>
    </div>
  )
}
export default CountDownBar
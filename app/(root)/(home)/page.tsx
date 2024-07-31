"use client";

import MeetingTypeList from "@/components/MeetingTypeList";
import { useEffect, useState } from "react";

type Quote = {
  text: string;
  author: string | null;
};

const Home = () => {
  const now = new Date();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
  }).format(now);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("https://type.fit/api/quotes");
        const data = await response.json();
        setQuotes(data);
        setCurrentQuoteIndex(Math.floor(Math.random() * data.length));
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length === 0) return;

    const intervalId = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 1 * 60 * 1000); // 5 minutes

    return () => clearInterval(intervalId);
  }, [quotes]);

  if (quotes.length === 0) {
    return <p>Loading...</p>;
  }

  const { text, author } = quotes[currentQuoteIndex];
  const cleanedAuthor = author ? author.replace(", type.fit", "") : "Unknown";

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <div className="glassmorphism max-w-[270px] rounded-2xl py-2 text-center text-base font-normal">
            <>
              <p className="font-bold text-lg">{text}</p>
              <p className="text-sm text-sky-1">{cleanedAuthor}</p>
            </>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;

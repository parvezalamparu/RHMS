import React, { useEffect, useState } from "react";

const formatTime = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? "PM" : "AM";

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // hour '0' should be '12'

  const pad = (num: number): string => (num < 10 ? "0" + num : num.toString());

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
};

const DigitalClock: React.FC = () => {
  const [time, setTime] = useState<string>(formatTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => {
      clearInterval(interval);} // cleanup
  }, []);

  const date = new Date();

  const day: number = date.getDate();
  const month: string = date.toLocaleString("default", { month: "long" }).toUpperCase();
  const dayName: string = date.toLocaleString("default", { weekday: "long" });
  const year: number = date.getFullYear();

  const getOrdinal = (n: number) : string  => {
    if (n === 1 || n === 21 || n === 31) return "st";
    if (n === 2 || n===22) return "nd";
    if (n === 3 || n===23) return "rd";
    return "th";
  };
  
  const formattedDate : string = `${day}`
  const formattedMonthYear: string = `${month}-${year}`;
  const suffix : string = getOrdinal(day)

  return (
    <div className="flex gap-2">
      <div className="text-sm font-mono text-center hidden md:block">{formattedDate}<sup>{suffix}</sup>-{formattedMonthYear}</div>
      <div className="text-sm font-mono text-center hidden md:block">{dayName.toUpperCase()}</div>
      <div className="text-sm font-mono text-center">{time}</div>
    </div>
  );
};

export default DigitalClock;

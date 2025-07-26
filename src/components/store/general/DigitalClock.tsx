import React, { useEffect, useState } from 'react';

const formatTime = (date: Date): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // hour '0' should be '12'

  const pad = (num: number): string => (num < 10 ? '0' + num : num.toString());

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)} ${ampm}`;
};

const DigitalClock: React.FC = () => {
  const [time, setTime] = useState<string>(formatTime(new Date()));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(formatTime(new Date()));
    }, 1000);

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div className="text-xl font-mono text-center">
      {time}
    </div>
  );
};

export default DigitalClock;

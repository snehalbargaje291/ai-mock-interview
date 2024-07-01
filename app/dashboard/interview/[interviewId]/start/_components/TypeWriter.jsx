import React, { useEffect, useState } from "react";

const TypewriterEffect = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text[index]);
      index++;
      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, 50);

    return () => clearInterval(intervalId);
  }, [text]);

  return <p className="text-gray-800 text-sm">{displayedText}</p>;
};

export default TypewriterEffect;

/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";
import React, { useState, useEffect } from 'react';

interface ShuffleTextProps {
  text: string;
  className?: string;
  delay?: number;
  withCursor?: boolean;
}

const ShuffleText: React.FC<ShuffleTextProps> = ({ text, className = "", delay = 0, withCursor = false }) => {
  const [displayText, setDisplayText] = useState("");
  const [isFinished, setIsFinished] = useState(false);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}—=+*^?#";

  useEffect(() => {
    let iteration = 0;
    let timeout: any;
    setIsFinished(false);

    const startShuffle = () => {
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );

        if (iteration >= text.length) {
          clearInterval(interval);
          setIsFinished(true);
        }

        iteration += 1 / 3;
      }, 30);
    };

    timeout = setTimeout(startShuffle, delay);
    return () => {
      clearTimeout(timeout);
      setDisplayText("");
    };
  }, [text, delay]);

  return (
    <span className={className}>
      {displayText || text.replace(/./g, '_')}
      {withCursor && (
        <span className={`inline-block w-[2px] h-[0.8em] ml-1 align-middle transition-opacity duration-100 ${isFinished ? 'animate-pulse bg-primary shadow-[0_0_8px_#00f3ff]' : 'bg-white'}`}></span>
      )}
    </span>
  );
};

export default ShuffleText;

import React from "react";

type LogoProps = {
  className?: string;
  color?: string;
  height?: string;
  width?: string;
};

const Logo: React.FC<LogoProps> = ({
  className = "w-8 h-8",
  color = "var(--gray-12)",
  height = "100%",
  width = "100%",
}: LogoProps) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      width={width}
      height={height}
      xmlns="http://www.w3.org/2000/svg"
      transform="rotate(90)matrix(1, 0, 0, -1, 0, 0)"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.8 6.8L3.3 11.3C2.9 11.7 2.9 12.3 3.3 12.7L8.3 17.7C8.7 18.1 9.3 18.1 9.7 17.7C10.1 17.3 10.1 16.7 9.7 16.3L5.4 12L9.3 8.2L7.8 6.8ZM15.8 14.8L14.3 16.3C13.9 16.7 13.9 17.3 14.3 17.7C14.7 18.1 15.3 18.1 15.7 17.7L17.3 16.2L15.8 14.8ZM18.7 14.8L20.7 12.7C21.1 12.3 21.1 11.7 20.7 11.3L15.7 6.3C15.3 5.9 14.7 5.9 14.3 6.3C13.9 6.7 13.9 7.3 14.3 7.7L18.6 12L17.3 13.3L18.7 14.8Z"
        fill={color}
      ></path>{" "}
      <path
        d="M5 5L19 19"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.8 6.8L3.3 11.3C2.9 11.7 2.9 12.3 3.3 12.7L8.3 17.7C8.7 18.1 9.3 18.1 9.7 17.7C10.1 17.3 10.1 16.7 9.7 16.3L5.4 12L9.3 8.2L7.8 6.8ZM15.8 14.8L14.3 16.3C13.9 16.7 13.9 17.3 14.3 17.7C14.7 18.1 15.3 18.1 15.7 17.7L17.3 16.2L15.8 14.8ZM18.7 14.8L20.7 12.7C21.1 12.3 21.1 11.7 20.7 11.3L15.7 6.3C15.3 5.9 14.7 5.9 14.3 6.3C13.9 6.7 13.9 7.3 14.3 7.7L18.6 12L17.3 13.3L18.7 14.8Z"
        fill={color}
      ></path>{" "}
      <path
        d="M5 5L19 19"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>{" "}
    </svg>
  );
};

export default Logo;

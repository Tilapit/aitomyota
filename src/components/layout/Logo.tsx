import React from "react";

type LogoProps = {
  light?: boolean;
  width?: number;
  height?: number;
};

const Logo: React.FC<LogoProps> = ({ light = false, width = 130, height = 42 }) => {
  const textColor = light ? "#FAF6F0" : "#1E1610";
  const accentColor = light ? "#E0957C" : "#C4674A";

  return (
    <svg width={width} height={height} viewBox="0 0 130 42" fill="none" aria-label="Myötä logo">
      <text
        x="0"
        y="25"
        fontFamily="Georgia,serif"
        fontSize="23"
        fontWeight="600"
        fill={textColor}
        letterSpacing="-0.6"
      >
        Myötä
      </text>
      <path
        d="M1 36 C9 30,15 27,23 32 C31 39,37 40,45 35 C53 29,59 27,67 31 C73 34,77 36,83 35"
        stroke={accentColor}
        strokeWidth="1.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <circle cx="88" cy="35" r="2.6" fill={accentColor} />
    </svg>
  );
};

export default Logo;

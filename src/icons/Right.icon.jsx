export const Right = ({ fill = '#494b74', hover }) => {
  return (
    <svg
      id="arrow-right"
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="12"
      viewBox="0 0 12 12"
    >
      <path
        id="Vector"
        d="M0,7.92,3.26,4.66a.993.993,0,0,0,0-1.4L0,0"
        transform="translate(4.455 2.04)"
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        id="Vector-2"
        // dataName="Vector"
        d="M0,0H12V12H0Z"
        transform="translate(12 12) rotate(180)"
        fill="none"
        opacity="0"
      />
    </svg>
  );
};

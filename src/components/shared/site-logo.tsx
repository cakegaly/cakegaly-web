export const SiteLogo = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 256 256"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M184 80 A72 72 0 1 0 184 176"
        fill="none"
        stroke="currentColor"
        strokeWidth="24"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M136 124 C120 124 110 138 110 152 C110 170 120 184 136 196 C152 184 162 170 162 152 C162 138 152 124 136 124 Z"
        fill="currentColor"
      />
    </svg>
  );
};

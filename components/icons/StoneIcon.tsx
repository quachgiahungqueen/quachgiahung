
import React from 'react';

const StoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M12.378 1.602a.75.75 0 00-.756 0L3.022 6.072a.75.75 0 00-.437.65L2.25 18.75a.75.75 0 00.75.75h18a.75.75 0 00.75-.75L21.415 6.722a.75.75 0 00-.437-.65L12.378 1.602zM12 7.5a.75.75 0 01.75.75v3.69l3.443-2.258a.75.75 0 01.912 1.21l-4.25 2.8a.75.75 0 01-.912 0l-4.25-2.8a.75.75 0 01.912-1.21L11.25 11.94V8.25A.75.75 0 0112 7.5z" />
  </svg>
);

export default StoneIcon;

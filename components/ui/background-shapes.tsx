"use client";

import React from "react";

export const BackgroundShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle geometric shapes */}
      <svg
        className="absolute top-20 left-10 opacity-20 text-primary/30"
        width="120"
        height="120"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect
          x="10"
          y="10"
          width="100"
          height="100"
          rx="20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="60"
          cy="60"
          r="30"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <svg
        className="absolute top-40 right-20 opacity-15 text-primary/20"
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="40,10 70,30 70,50 40,70 10,50 10,30"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <svg
        className="absolute bottom-40 left-20 opacity-10 text-primary/10"
        width="150"
        height="150"
        viewBox="0 0 150 150"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M75 15 L135 135 L15 135 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle
          cx="75"
          cy="75"
          r="20"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      <svg
        className="absolute bottom-20 right-10 opacity-20 text-primary/25"
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <rect
          x="20"
          y="20"
          width="60"
          height="60"
          rx="10"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          transform="rotate(45 50 50)"
        />
      </svg>
    </div>
  );
};

export const SafetyIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M9 12L11 14L15 10"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const QualityIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M8 12L11 15L16 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="12"
        cy="12"
        r="3"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
};

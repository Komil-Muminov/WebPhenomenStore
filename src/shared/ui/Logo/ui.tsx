import React from "react";
import { Link } from "react-router-dom";
import { AppRoutes } from "@/shared";
import "./style.css";

export interface ILogoProps {
  className?: string;
  onClick?: () => void;
}

export const Logo: React.FC<ILogoProps> = ({ className = "", onClick }) => {
  const containerClass = `brand-logo ${className}`.trim();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Link to={AppRoutes.HOME} className={containerClass} onClick={handleClick}>
      <span className="brand-logo__mark">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="brand-logo__icon"
        >
          <path
            d="M12 2.5L14.2 8.8L20.5 11L14.2 13.2L12 19.5L9.8 13.2L3.5 11L9.8 8.8L12 2.5Z"
            fill="currentColor"
            opacity="0.95"
          />
        </svg>
      </span>
      <span className="brand-logo__content">
        <span className="brand-logo__title">PHENOMEN</span>
        <span className="brand-logo__subtitle">ORGANIC BAR</span>
      </span>
    </Link>
  );
};


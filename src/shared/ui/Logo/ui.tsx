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
			<span className="brand-logo__text">PHENOMEN</span>
		</Link>
	);
};

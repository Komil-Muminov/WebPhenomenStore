import React from "react";
import { Spin } from "antd";
import type { ISpinnerProps } from "./model";

export const Spinner: React.FC<ISpinnerProps> = ({ size = "large", className }) => {
  return (
    <div className={`spinner flex! items-center! justify-center! ${className || ""}`}>
      <Spin size={size} />
    </div>
  );
};

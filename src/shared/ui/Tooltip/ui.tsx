import React from "react";
import { Tooltip as AntTooltip } from "antd";
import type { ITooltipProps } from "./model";

export const Tooltip: React.FC<ITooltipProps> = ({ children, ...props }) => {
  return <AntTooltip {...props}>{children}</AntTooltip>;
};

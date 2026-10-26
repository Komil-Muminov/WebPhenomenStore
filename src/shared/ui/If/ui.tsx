import React from "react";
import type { IIfProps } from "./model";

export const If: React.FC<IIfProps> = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

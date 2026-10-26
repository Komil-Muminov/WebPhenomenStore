import React from "react";
import { ConfigProvider } from "antd";
import { ErrorBoundary } from "@/shared";
import { antThemeConfig } from "./providers";
import { AppRouter } from "./routes";
import "./styles/global.css";

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ConfigProvider theme={antThemeConfig}>
        <AppRouter />
      </ConfigProvider>
    </ErrorBoundary>
  );
};

export default App;

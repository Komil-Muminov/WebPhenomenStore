import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AppRoutes as RoutesConfig, Spinner } from "@/shared";

const HomePage = lazy(() => import("@/pages/home/ui"));

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="app-loader flex! h-screen! w-full! items-center! justify-center! bg-neutral-900!">
            <Spinner />
          </div>
        }
      >
        <Routes>
          <Route path={RoutesConfig.HOME} element={<HomePage />} />
          <Route path="*" element={<Navigate to={RoutesConfig.HOME} replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

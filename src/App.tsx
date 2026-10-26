import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ConfigProvider } from "antd";
import { AppRoutes, ErrorBoundary, Spinner, antThemeConfig } from "@/shared";

const HomePage = lazy(() => import("@/pages/home/ui"));
const MenuPage = lazy(() => import("@/pages/menu/ui"));
const ShopPage = lazy(() => import("@/pages/shop/ui"));
const ContactPage = lazy(() => import("@/pages/contact/ui"));

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <ConfigProvider theme={antThemeConfig}>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="app-loader flex! h-screen! w-full! items-center! justify-center! bg-neutral-900!">
                <Spinner />
              </div>
            }
          >
            <Routes>
              <Route path={AppRoutes.HOME} element={<HomePage />} />
              <Route path={AppRoutes.MENU} element={<MenuPage />} />
              <Route path={AppRoutes.SHOP} element={<ShopPage />} />
              <Route path={AppRoutes.CONTACT} element={<ContactPage />} />
              <Route path="*" element={<Navigate to={AppRoutes.HOME} replace />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </ConfigProvider>
    </ErrorBoundary>
  );
};

export default App;

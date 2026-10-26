import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined, EnvironmentOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { AppRoutes, ErrorBoundary, Tooltip } from "@/shared";
import type { IContactCardProps } from "./model";
import "./style.css";

export const ContactCard: React.FC<IContactCardProps> = ({ className = "" }) => {
  const containerClass = `contact-card ${className}`.trim();

  return (
    <ErrorBoundary>
      <div className={containerClass}>
        <div className="contact-card__container">
          <Link to={AppRoutes.HOME}>
            <Tooltip title="На главную">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                className="mb-4! text-white! hover:bg-white/10!"
              />
            </Tooltip>
          </Link>

          <div className="contact-card__header">
            <h1 className="contact-card__title">Контакты</h1>
            <p className="contact-card__subtitle">
              Мы всегда рады обратной связи и вопросам о нашей продукции
            </p>
          </div>

          <div className="contact-card__box">
            <div className="contact-card__item">
              <div className="contact-card__item-icon">
                <EnvironmentOutlined />
              </div>
              <div>
                <div className="contact-card__item-label">Адрес смузи-бара</div>
                <div className="contact-card__item-value">г. Москва, ул. Арбат, 15</div>
              </div>
            </div>

            <div className="contact-card__item">
              <div className="contact-card__item-icon">
                <PhoneOutlined />
              </div>
              <div>
                <div className="contact-card__item-label">Телефон для заказов</div>
                <div className="contact-card__item-value">+7 (800) 555-35-35</div>
              </div>
            </div>

            <div className="contact-card__item">
              <div className="contact-card__item-icon">
                <MailOutlined />
              </div>
              <div>
                <div className="contact-card__item-label">Электронная почта</div>
                <div className="contact-card__item-value">hello@freshify-smoothie.ru</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};

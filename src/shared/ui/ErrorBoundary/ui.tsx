import React, { Component } from "react";
import { Result, Button } from "antd";
import type { IErrorBoundaryProps, IErrorBoundaryState } from "./model";

class ErrorBoundaryClass extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  state: IErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true };
  }

  handleReload = () => {
    window.location.reload();
  };

  render() {
    return this.state.hasError ? (
      this.props.fallback ? (
        <>{this.props.fallback}</>
      ) : (
        <div className="error-boundary flex! min-h-screen! items-center! justify-center! p-6!">
          <Result
            status="500"
            title="500"
            subTitle="Произошла непредвиденная ошибка"
            extra={
              <Button type="primary" onClick={this.handleReload}>
                Обновить страницу
              </Button>
            }
          />
        </div>
      )
    ) : (
      <>{this.props.children}</>
    );
  }
}

export const ErrorBoundary: React.FC<IErrorBoundaryProps> = ({ children, fallback }) => {
  return <ErrorBoundaryClass fallback={fallback}>{children}</ErrorBoundaryClass>;
};

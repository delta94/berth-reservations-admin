import React from 'react';
import * as Sentry from '@sentry/browser';

interface ErrorBoundaryProps {
  errorComponent: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

// Error boundaries have to be implemented as class components.
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: { errorComponent: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentDidCatch(error: any, errorInfo: { [key: string]: any }) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      Sentry.captureException(error);
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.errorComponent;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

import React from 'react';

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

  render() {
    if (this.state.hasError) {
      return this.props.errorComponent;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;

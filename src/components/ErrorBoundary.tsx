import React from "react";

interface Props {
    children?: React.ReactNode
}

interface State {
    hasError: boolean
}

export class ErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): State {
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.log(error, errorInfo);
    }

    render(): React.ReactNode {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
      }

      return this.props.children; 
    }
  }
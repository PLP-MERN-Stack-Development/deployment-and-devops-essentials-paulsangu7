import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, info: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, info: error.toString() };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught', error, info);
  }

  render() {
    if (this.state.hasError) {
      return <div role="alert">Something went wrong: {this.state.info}</div>;
    }
    return this.props.children;
  }
}

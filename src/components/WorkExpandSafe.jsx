import { Component } from "react";

/**
 * Keeps the Work grid mounted when an open case study (or its HMR update)
 * throws. Closes the panel so cards stay visible instead of a blank page.
 */
export default class WorkExpandSafe extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch() {
    this.props.onClose?.();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.workId !== this.props.workId && this.state.failed) {
      this.setState({ failed: false });
    }
  }

  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

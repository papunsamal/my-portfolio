import { Component } from "react";

// If anything in a 3D scene throws (lost context, bad asset, GPU issue), render the
// fallback instead of taking the whole page down.
export default class SceneBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    console.warn("[3D] Scene disabled, using fallback:", error);
  }

  render() {
    return this.state.failed
      ? (this.props.fallback ?? null)
      : this.props.children;
  }
}

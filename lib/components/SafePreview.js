import React from "react";
import { Skeleton } from "@mui/material";

class SafePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Skeleton width={this.props.width} height={this.props.height} />;
    }

    return this.props.children;
  }
}

export default SafePreview;

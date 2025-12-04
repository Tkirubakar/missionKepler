import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props){
    super(props);
    this.state = { hasError:false };
  }
  static getDerivedStateFromError(){ return { hasError:true }; }
  componentDidCatch(err, info){ console.error("ErrorBoundary caught", err, info); }
  render(){
    if (this.state.hasError) return <div style={{padding:40}}>Something went wrong. Please reload.</div>;
    return this.props.children;
  }
}

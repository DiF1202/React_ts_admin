import React from "react";
import "./App.css";
import { useAuth } from "screens/context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "screens/unauthenticated-app";

function App() {
  const { user } = useAuth();
  return <div className="App">{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}</div>;
}

export default App;

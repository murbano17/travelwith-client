import React from "react";
import "./App.css";
import AuthProvider from './lib/Services/AuthProvider'

function App() {
  return <div className="App">
    <AuthProvider>

    </AuthProvider>

  </div>;
}

export default App;

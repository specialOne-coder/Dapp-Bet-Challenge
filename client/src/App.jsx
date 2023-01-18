import { useState } from 'react'
import reactLogo from './assets/react.svg'
import '../src/styles/App.css'
import {Navigation, Footer } from '../src/components/index';


function App() {
  return (
    <div className="min-h-screen">
      <div className="gradient-bg-welcome min-h-screen">
        <Navigation />
      </div>
      <Footer />
    </div>
  );
}

export default App

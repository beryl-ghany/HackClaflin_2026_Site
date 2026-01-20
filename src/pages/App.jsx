//import React from 'react'
//import { Routes, Route } from 'react-router-dom'
//import LandingPage from './LandingPage.jsx'
//import ApplyForm from './ApplyForm.jsx'
//import VolunteerForm from './VolunteerForm.jsx'

//export default function App() {
  //return (
    //<Routes>
      //<Route path="/" element={<LandingPage />} />
      //<Route path="/apply" element={<ApplyForm />} />
      //<Route path="/apply/volunteers" element={<VolunteerForm />} />
    //</Routes>
 // )
//}
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './LandingPage.jsx'
import ApplyForm from './ApplyForm.jsx'
import VolunteerForm from './VolunteerForm.jsx'

export default function App() {
  return (
    /* This wrapper div contains the background and covers the whole screen */
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-950">
      {/* 1. ANIMATED BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0">
        {/* Animated Gradient Orb 1 (Claflin Orange/Gold) */}
        <div className="absolute top-[-10%] left-[-10%] h-[500px] w-[500px] rounded-full bg-orange-600/20 blur-[120px] animate-pulse"></div>
        
        {/* Animated Gradient Orb 2 (Deep Maroon/Purple) */}
        <div className="absolute bottom-[10%] right-[-5%] h-[600px] w-[600px] rounded-full bg-purple-900/30 blur-[120px] animate-bounce" 
             style={{ animationDuration: '15s' }}></div>

        {/* Subtle Tech Grid Overlay */}
        <div className="absolute inset-0 opacity-10" 
             style={{ backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`, backgroundSize: '50px 50px' }}>
        </div>
      </div>

      {/* 2. CONTENT LAYER */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/apply" element={<ApplyForm />} />
          <Route path="/apply/volunteers" element={<VolunteerForm />} />
        </Routes>
      </div>
    </div>
  )
}

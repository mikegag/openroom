import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./components/pages/Landing";
import ViewApplication from "./components/pages/ViewApplication";
import NewApplication from "./components/pages/NewApplication";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard" element={<Landing/>} />
        <Route path="/dashboard/view-application-:id" element={<ViewApplication/>} />
        <Route path="/dashboard/new-application" element={<NewApplication/>} />
      </Routes>
    </BrowserRouter>
  )
}
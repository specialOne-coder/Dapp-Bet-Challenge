import React from "react";
import {
  Routes,
  Route,
  HashRouter as Router,
} from "react-router-dom";
import { HomePage,SwaPage,LiquidityPage,BetPage,CreateBet } from "../pages/index";
import {Navbar, BetDetails} from "./index";


const Navigation = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/swap" element={<SwaPage />} />
        <Route exact path="/liquidity" element={<LiquidityPage />} />
        <Route exact path="/bets" element={<BetPage />} />
        <Route exact path="/details/" element={<BetDetails />} />
        <Route exact path="/create" element={<CreateBet />} />
      </Routes>
    </Router>
  );
};


export default Navigation;

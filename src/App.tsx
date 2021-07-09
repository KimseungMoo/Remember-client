import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Mypage from "./pages/Mypage";
import AccList from "./components/AccList";
import ServicePay from "./components/ServicePay";
import Receipt from "./pages/Receipt";
import Payment from "./components/Payment";
import PostDetail from "./pages/PostDetail";
import Sponsor from "./components/Sponsor";
import axios from "axios";

const App = ({ auth }: any) => {
  return (
    <Router>
      <Navbar auth={auth}></Navbar>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/mypage" component={Mypage}></Route>
        <Route exact path="/postdetail/:id" component={PostDetail}></Route>
        <Route exact path="/accident" component={AccList}></Route>
        <Route exact path="/service/:id" component={ServicePay}></Route>
        <Route exact path="/payment" component={Payment}></Route>
        <Route path="/receipt" component={Receipt} />
        <Route exact path="/sponsor" component={Sponsor}></Route>
        <Route path="/" render={() => <div>404 에러</div>}></Route>
      </Switch>
    </Router>
  );
};

export default App;

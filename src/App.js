import './App.css';

import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
// react router dom kya h... aur usse kya hota h??
// ye niche kya import hua??
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

export default class App extends Component {
  // THIS IS OUR CLASS BASED COMPONENT.. yahan method ka manegement ka use easy hota hai
  pageSize=12;
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          {/* yahan se ham variable page size News.js wale file se send karenge */}
          {/* <News pageSize ={ 9} country="in" catogary="science"/> */}
          <Routes>
            {/* hamne <About/> ko hata ke <News pageSize ={  9} country="in" catogary="science"/> ye likha so that..... */}
            {/* <Route path="/about"> <About /> </Route> */}

            {/* agar koi home page par ayega to wo general catagory ki news dekhega */}
            {/* fir ham hamko jo bhi news chahiye hoga ham uspar click karenge */}
            {/* but uske liye hame exact likhna hoga...aur keys set karna hoga */}
            <Route exact path="/" element = { <News key="general" pageSize={this.pageSize} country="in" catogary="general" /> }/>
            <Route exact path="/business" element = { <News key="business" pageSize={this.pageSize} country="in" catogary="business" /> }/>
            <Route exact path="/entertainment" element = { <News key="entertainment" pageSize={this.pageSize} country="in" catogary="entertainment" /> }/>
            <Route exact path="/health" element = { <News key="health" pageSize={this.pageSize} country="in" catogary="health" /> }/>
            <Route exact path="/science" element = { <News key="science" pageSize={this.pageSize} country="in" catogary="science" /> }/>
            <Route exact path="/sports" element = { <News key="sports" pageSize={this.pageSize} country="in" catogary="sports" /> }/>
            <Route exact path="/technology" element = { <News key="technology" pageSize={this.pageSize} country="in" catogary="technology" /> }/>
          </Routes>
        </Router>
      </div>
    )
  }
}

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'antd/lib/button';
import BackTop from 'antd/lib/back-top';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2><Link to="/">罗晓俊の博客</Link></h2>
        </div>
	<ul>
	    <li><Link to="/article/detail/1">技术博客重构之路</Link></li>
	    <li><Link to="/article/detail/1">技术博客重构之路</Link></li>
	    <li><Link to="/article/detail/1">技术博客重构之路</Link></li>
	    <li><Link to="/article/detail/1">技术博客重构之路</Link></li>
	    <li><Link to="/article/detail/1">技术博客重构之路</Link></li>
	    <li><Link to="/article/detail/1">技术博客重构之路</Link></li>
	    <li><Link to="/article/detail/1">技术博客重构之路</Link></li>
	    <li><Link to="/article/detail/1">技术博客重构之路</Link></li>
	    <li><Link to="/article/detail/1">技术博客重构之路</Link></li>
	    <li><Link to="/article/detail/1">技术博客重构之路</Link></li>
	</ul>
        <Link to="/article/list">更多></Link>
	<Button type="primary">Button</Button>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
	<BackTop />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BackTop from 'antd/lib/back-top';
import Layout, {Header, Content, Footer } from 'antd/lib/layout';
import Breadcrumb from 'antd/lib/breadcrumb';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
                	<Layout>
  		<Header style={{ position: 'fixed', width: '100%' }}>
          		<h2><Link to="/">罗晓俊の博客</Link></h2>
		</Header>
    			<Content style={{ padding: '0 50px', marginTop: 64 }}>
			<Breadcrumb style={{ margin: '12px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
      </Breadcrumb>
			<div style={{ background: '#fff', padding: 24, minHeight: 380 }}>
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
			</div>
			</Content>
  		<Footer style={{ textAlign: 'center' }}>罗晓俊の博客 ©2017 Created by Roy</Footer>
	</Layout>
	<BackTop />
      </div>
    );
  }
}

export default App;

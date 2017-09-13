import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BackTop from 'antd/lib/back-top';
import Layout, {Header, Content, Footer } from 'antd/lib/layout';
import Breadcrumb from 'antd/lib/breadcrumb';
import './App.css';
import config from 'react-global-configuration';

class App extends Component {
	constructor(props) {
		super(props);

		var articles = [];

		this.state = {
			articles: articles
		};

		this.fetchArticles(this);
	}

	fetchArticles(thisObj) {
		fetch(config.get('api_gateway'), {
			method: 'GET',
			headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
		}).then(function (res) {
			if (res.ok) {
				res.json().then(function (jsonData) {
					thisObj.setState({
						articles: jsonData.data
					})
				});
			}
		});
	}

	render() {
		return (
			<div className="App">
				<Layout>
					<Header style={{position: 'fixed', width: '100%'}}>
						<h2><Link className="Link" to="/">罗晓俊の博客</Link></h2>
					</Header>
					<Content style={{padding: '0 50px', marginTop: 64}}>
						<Breadcrumb style={{margin: '12px 0'}}>
							<Breadcrumb.Item>首页</Breadcrumb.Item>
						</Breadcrumb>
						<div style={{background: '#fff', padding: 24, minHeight: 380}}>
							<ul>
								{
									this.state.articles.map(function (article) {
										return (<li key={article.id}><h3><Link to={article.link}>{article.title}</Link></h3></li>);
									})
								}
							</ul>
							<Link to="/article/list">更多></Link>
						</div>
					</Content>
					<Footer style={{textAlign: 'center'}}>罗晓俊の博客 ©{(new Date()).getFullYear().toString()} Powered by Roy</Footer>
				</Layout>
				<BackTop />
			</div>
		);
	}
}

export default App;

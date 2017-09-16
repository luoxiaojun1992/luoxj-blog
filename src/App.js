import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from 'antd/lib/breadcrumb';
import './App.css';
import PageLayout from './pages/page-layout';
import { connect } from 'react-redux';
import { getIndexArticles } from './actions';

class App extends Component {
	constructor(props) {
		super(props);

		var articles = [];

		this.state = {
			articles: articles
		};

		const { dispatch } = props;

		dispatch(getIndexArticles());
	}

	render() {
		return (
			<PageLayout breadcrumb={() => {
				return (
					<Breadcrumb style={{margin: '12px 0'}}>
						<Breadcrumb.Item>首页</Breadcrumb.Item>
					</Breadcrumb>
				);
			}} logo={() => {
				return (
					<h2><Link className="Link" to="/">罗晓俊の博客</Link></h2>
				);
			}}>
				<ul>
					{
						this.props.articles.map(function (article) {
							return (<li key={article.id}><h3><Link to={article.link}>{article.title}</Link></h3></li>);
						})
					}
				</ul>
				<Link to="/article/list">更多></Link>
			</PageLayout>
		);
	}
}

function mapStateToProps (state) { // 手动注入state，dispatch分发器被connect自动注入
	let articles = state.getCommonConfigs.articles;

	return { // 注入的内容自行选择
		articles: articles === undefined ? [] : articles
	};
}

export default connect(mapStateToProps)(App);

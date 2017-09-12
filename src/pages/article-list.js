import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import BackTop from 'antd/lib/back-top';
import Layout, {Header, Content, Footer } from 'antd/lib/layout';
import Breadcrumb from 'antd/lib/breadcrumb';
import '../App.css';
import config from 'react-global-configuration';

class ArticleList extends Component {
    constructor(props) {
        super(props);

        var articles = [];

        this.state = {
            articles: articles,
            hasMoreItems: true,
            page: -1
        };

        this.loadFunc = this.loadFunc.bind(this);

        this.fetchArticles(this, 0);
    }

    fetchArticles(thisObj, page) {
        const limit = 10;
        const offset = page * limit;
        fetch(config.get('api_gateway') + '/article/action/list?offset=' + offset + '&limit=' + limit, {
            method: 'GET',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (jsonData) {
                    if (jsonData.data.length > 0) {
                        if (thisObj.state.page + 1 !== page) {
                            thisObj.fetchArticles(thisObj, page);
                            return;
                        }
                        var articles = thisObj.state.articles;
                        jsonData.data.map(function (article) {
                            articles.push(article);
                            return articles;
                        });
                        thisObj.setState({
                            articles: articles,
                            hasMoreItems: true,
                            page: page
                        })
                    } else {
                        thisObj.setState({
                            hasMoreItems: false
                        });
                    }
                });
            }
        });
    }

    loadFunc(page) {
        this.setState({
            hasMoreItems: false
        });
        this.fetchArticles(this, page);
    }

    render() {
        return (
            <div className="App">
                <Layout>
                    <Header style={{position: 'fixed', width: '100%'}}>
                        <h2><Link to="/">罗晓俊の博客</Link></h2>
                    </Header>
                    <Content style={{padding: '0 50px', marginTop: 64}}>
                        <Breadcrumb style={{margin: '12px 0'}}>
                            <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
                            <Breadcrumb.Item>文章列表</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{background: '#fff', padding: 24, minHeight: 380}}>
                            <ul>
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={this.loadFunc}
                                    hasMore={this.state.hasMoreItems}
                                    loader={<div className="loader">Loading ...</div>}
                                >
                                    {
                                        this.state.articles.map(function (article) {
                                            return (<li key={article.id}><h3><Link to={article.link}>{article.title}</Link></h3></li>);
                                        })
                                    }
                                </InfiniteScroll>
                            </ul>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>罗晓俊の博客 ©2017 Powered by Roy</Footer>
                </Layout>
                <BackTop />
            </div>
        );
    }
}

export default ArticleList;

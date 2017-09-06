import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import BackTop from 'antd/lib/back-top';
import Layout, {Header, Content, Footer } from 'antd/lib/layout';
import Breadcrumb from 'antd/lib/breadcrumb';
import '../App.css';

class ArticleList extends Component {
    constructor(props) {
        super(props);

        var articles = [];

        this.state = {
            articles: articles,
            hasMoreItems: true
        };

        this.loadFunc = this.loadFunc.bind(this);

        this.fetchArticles(this, 0);
    }

    fetchArticles(thisObj, offset) {
        fetch('http://api.fourleaver.com?offset=' + offset, {
            method: 'GET',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (jsonData) {
                    var articles = thisObj.state.articles;
                    jsonData.data.map(function (article) {
                        articles.push(article);
                        return articles;
                    });

                    thisObj.setState({
                        articles: articles,
                        hasMoreItems: true
                    })
                });
            }
        });
    }

    loadFunc(page) {
        if (page < 2) {
            this.setState({
                hasMoreItems: false
            });
            this.fetchArticles(this, page);
        } else {
            this.setState({
                hasMoreItems: false
            });
        }
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
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
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
                                            return (<li><Link to={article.link}>{article.title}</Link></li>);
                                        })
                                    }
                                </InfiniteScroll>
                            </ul>
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>罗晓俊の博客 ©2017 Created by Roy</Footer>
                </Layout>
                <BackTop />
            </div>
        );
    }
}

export default ArticleList;

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

        var items = [];
        for (var i = 0; i < 20; i++) {
            items.push(<li><Link to="/article/detail/1">技术博客重构之路</Link></li>);
        }

        this.state = {
            items: items,
            hasMoreItems: true
        };

        this.loadFunc = this.loadFunc.bind(this);

        this.fetchArticles();
    }

    fetchArticles() {
        fetch('https://api.daishangqian.com/v3/index/index-new', {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json',},
            body: JSON.stringify({firstParam: 'yourValue', secondParam: 'yourOtherValue'})
        }).then(function (res) {
            if (res.ok) {
                res.text().then(function (data) {
                    console.log(data);
                });
            }
        });
    }

    loadFunc(page) {
        var items = this.state.items;
        var hasMoreItems = this.state.hasMoreItems;
        if (page < 30) {
            this.setState({
                hasMoreItems: false
            });
            for (var i = 0; i < 20; i++) {
                items.push(<li><Link to="/article/detail/1">技术博客重构之路</Link></li>);
            }
        } else {
            hasMoreItems = false;
        }

        this.setState({
            items: items,
            hasMoreItems: hasMoreItems
        });
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
                            <Breadcrumb.Item>Home</Breadcrumb.Item>
                        </Breadcrumb>
                        <div style={{background: '#fff', padding: 24, minHeight: 380}}>
                            <ul>
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={this.loadFunc}
                                    hasMore={this.state.hasMoreItems}
                                    loader={<div className="loader">Loading ...</div>}
                                >
                                    {this.state.items}
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

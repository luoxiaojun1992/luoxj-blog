import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import Breadcrumb from 'antd/lib/breadcrumb';
import Input from 'antd/lib/input';
import '../App.css';
import PageLayout from './page-layout';
import { connect } from 'react-redux';
import { getListArticles } from '../actions';

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

        const { dispatch } = props;

        dispatch(getListArticles(this, 0));
    }

    loadFunc(page) {
        this.setState({
            hasMoreItems: false
        });

        const { dispatch } = this.props;

        dispatch(getListArticles(this, page));
    }

    render() {
        const { Search } = Input;

        return (
            <PageLayout breadcrumb={() => {
                return (
                    <Breadcrumb style={{margin: '12px 0'}}>
                        <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>文章列表</Breadcrumb.Item>
                    </Breadcrumb>
                );
            }} logo={() => {
                return (
                    <h2><Link to="/">罗晓俊の博客</Link></h2>
                );
            }}>
                <Search
                    placeholder="input search text"
                    onSearch={value => {console.log(value)}}
                    style={{ width: 200 }}
                /><br /><br />
                <ul>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={this.loadFunc}
                        hasMore={this.state.hasMoreItems}
                        loader={<div className="loader">Loading ...</div>}
                    >
                        {
                            this.state.articles.map(function (article) {
                                return (
                                    <li key={article.id}><h3><Link to={article.link}>{article.title}</Link></h3></li>);
                            })
                        }
                    </InfiniteScroll>
                </ul>
            </PageLayout>
        );
    }
}

function mapStateToProps (state) { // 手动注入state，dispatch分发器被connect自动注入
    return {};
}

export default connect(mapStateToProps)(ArticleList);

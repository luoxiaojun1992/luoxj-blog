import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from 'antd/lib/breadcrumb';
import '../App.css';
import ReactMarkdown from 'react-markdown';
import config from 'react-global-configuration';
import PageLayout from './page-layout';

class ArticleDetail extends Component {
    constructor(props) {
        super(props);

        this.state = {
            article: {
                title: "",
                content: "",
                author: "",
                category_name: "",
                created_at: ""
            }
        };

        this.fetchArticle(this);
    }

    fetchArticle(thisObj) {
        fetch(config.get('api_gateway') + '/article/action/detail?id=' + thisObj.props.match.params.id, {
            method: 'GET',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (jsonData) {
                    if (jsonData.code === 0) {
                        thisObj.setState({
                            article: jsonData.data
                        });
                    }
                });
            }
        });
    }

    render() {
        return (
            <PageLayout breadcrumb={() => {
                return (
                    <Breadcrumb style={{margin: '12px 0'}}>
                        <Breadcrumb.Item><Link to="/">首页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item>文章内容</Breadcrumb.Item>
                    </Breadcrumb>
                );
            }} logo={() => {
                return (
                    <h2><Link to="/">罗晓俊の博客</Link></h2>
                );
            }}>
                <h2>{this.state.article.title}</h2>
                <ReactMarkdown source={this.state.article.content}/>
            </PageLayout>
        );
    }
}

export default ArticleDetail;

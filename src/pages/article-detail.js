import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from 'antd/lib/breadcrumb';
import '../App.css';
import ReactMarkdown from 'react-markdown';
import PageLayout from './page-layout';
import { connect } from 'react-redux';
import { getDetailArticle } from '../actions';

class ArticleDetail extends Component {
    constructor(props) {
        super(props);

        const { dispatch } = props;

        //清除缓存的旧数据
        props.article.title = '';
        props.article.content = '';
        props.article.author = '';
        props.article.category_name = '';
        props.article.created_at = '';

        dispatch(getDetailArticle(props.match.params.id));
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
                <h2>{this.props.article.title}</h2>
                <ReactMarkdown source={this.props.article.content}/>
            </PageLayout>
        );
    }
}

function mapStateToProps (state) { // 手动注入state，dispatch分发器被connect自动注入
    let article = state.getCommonConfigs.article;

    return { // 注入的内容自行选择
        article: article === undefined ? {
            title: "",
            content: "",
            author: "",
            category_name: "",
            created_at: ""
        } : article
    };
}

export default connect(mapStateToProps)(ArticleDetail);

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BackTop from 'antd/lib/back-top';
import Layout, {Header, Content, Footer } from 'antd/lib/layout';
import Breadcrumb from 'antd/lib/breadcrumb';
import '../App.css';

class ArticleDetail extends Component {
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
                        <Breadcrumb.Item>文章内容</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{background: '#fff', padding: 24, minHeight: 380}}>
                        <p>Building...</p>
                    </div>
                </Content>
                <Footer style={{textAlign: 'center'}}>罗晓俊の博客 ©2017 Powered by Roy</Footer>
            </Layout>
            <BackTop />
        </div>
    );
  }
}

export default ArticleDetail;

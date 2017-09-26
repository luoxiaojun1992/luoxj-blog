import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BackTop from 'antd/lib/back-top';
import Layout, { Header, Content, Footer } from 'antd/lib/layout';
import '../App.css';
import { connect } from 'react-redux';
import { getYear, queryWeather } from '../actions';

class PageLayout extends Component {
    constructor(props) {
        super(props);

        const { dispatch } = props;

        dispatch(getYear());

        dispatch(queryWeather('上海'));
    }

    render() {
        return (
            <div className="App">
                <Layout>
                    <Header style={{position: 'fixed', width: '100%'}}>
                        <h2><Link to="/">罗晓俊の博客</Link><span style={{"float": "right"}}>{this.props.weather}</span></h2>
                    </Header>
                    <Content style={{padding: '0 50px', marginTop: 64}}>
                        {this.props.breadcrumb()}
                        <div style={{background: '#fff', padding: 24, minHeight: 380}}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>罗晓俊の博客 ©{this.props.year} Powered by Roy</Footer>
                </Layout>
                <BackTop />
            </div>
        );
    }
}

function mapStateToProps (state) { // 手动注入state，dispatch分发器被connect自动注入
    return { // 注入的内容自行选择
        year: state.getCommonConfigs.year,
        weather: state.getCommonConfigs.weather
    };
}

export default connect(mapStateToProps)(PageLayout);

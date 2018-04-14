import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BackTop from 'antd/lib/back-top';
import Layout, { Header, Content, Footer } from 'antd/lib/layout';
import '../App.css';
import { connect } from 'react-redux';
import { getYear, locateIp, queryHoliday, reqAggregate } from '../actions';
import '../iconfont/iconfont.css';

class PageLayout extends Component {
    constructor(props) {
        super(props);

        const { dispatch } = props;

        dispatch(getYear());

        // dispatch(locateIp());

        // dispatch(queryHoliday());

        dispatch(reqAggregate());
    }

    clearLocalStorage() {
        let localStorageLen = localStorage.length;
        let localStorageKeys = [];
        for (let i = 0; i < localStorageLen; ++i) {
            let localStorageKeyTmp = localStorage.key(i);
            if (localStorageKeyTmp.indexOf('luoxj-blog:cache:') === 0) {
                localStorageKeys.push(localStorageKeyTmp);
            }
        }
        localStorageKeys.map(function (localStorageKey) {
            localStorage.removeItem(localStorageKey);
        });
    }

    render() {
        return (
            <div className="App">
                <Layout>
                    <Header style={{position: 'fixed', width: '100%'}}>
                        <h2>
                            <Link to="/">罗晓俊の博客</Link>
                            <span style={{"float": "right", "color": "#1890ff"}}>
                                签到{this.props.checkInDataTotal}次
                            </span>
                            <span style={{"float": "right", "color": "#1890ff"}}>
                                <i className={this.props.holiday} />{this.props.weather}&nbsp;&nbsp;&nbsp;
                            </span>
                        </h2>
                    </Header>
                    <Content style={{padding: '0 50px', marginTop: 64}}>
                        {this.props.breadcrumb()}
                        <div style={{background: '#fff', padding: 24, minHeight: 380}}>
                            {this.props.children}
                        </div>
                    </Content>
                    <Footer style={{textAlign: 'center'}}>
                        罗晓俊の博客 ©{this.props.year} Powered by Roy <a onClick={this.clearLocalStorage}>清除缓存</a>
                    </Footer>
                </Layout>
                <BackTop />
            </div>
        );
    }
}

function mapStateToProps (state) { // 手动注入state，dispatch分发器被connect自动注入
    const holiday = state.getCommonConfigs.holiday;
    let iconCode = '';
    switch (holiday) {
        case 0:
            iconCode = 'iconfont icon-gong';
            break;
        case 1:
            iconCode = 'iconfont icon-xiuxi';
            break;
        case 2:
            iconCode = 'iconfont icon-jia';
            break;
        default:
    }

    return { // 注入的内容自行选择
        year: state.getCommonConfigs.year,
        weather: state.getCommonConfigs.weather,
        holiday: iconCode,
        checkInDataTotal: state.getCommonConfigs.checkInDataTotal,
        checkInDataLastTime: state.getCommonConfigs.checkInDataLastTime
    };
}

export default connect(mapStateToProps)(PageLayout);

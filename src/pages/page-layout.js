import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BackTop from 'antd/lib/back-top';
import Layout, { Header, Content, Footer } from 'antd/lib/layout';
import '../App.css';
import { connect } from 'react-redux';
import { getYear } from '../actions';
import {geolocated} from 'react-geolocated';

class PageLayout extends Component {
    constructor(props) {
        super(props);

        const { dispatch } = props;

        dispatch(getYear());

        if (props.isGeolocationAvailable && props.isGeolocationEnabled) {
            console.log(props.isGeolocationAvailable);
            console.log(props.isGeolocationEnabled);
            console.log(props);
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
        year: state.getCommonConfigs.year
    };
}

export default connect(mapStateToProps)(geolocated({
    positionOptions: {
        enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
})(PageLayout));

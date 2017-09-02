import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroller';
import logo from '../logo.svg';
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
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2><Link to="/">罗晓俊の博客</Link></h2>
        </div>
	<p>Building...</p>
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
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default ArticleList;

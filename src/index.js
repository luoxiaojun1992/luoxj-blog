import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import ArticleList from './pages/article-list';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
  <Router>
    <div>
        <Route exact path="/" component={App} />
        <Route path="/article/list" component={ArticleList} />
    </div>
  </Router>
), document.getElementById('root'));
registerServiceWorker();

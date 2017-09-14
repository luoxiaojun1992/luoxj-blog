import React from 'react';
import ReactDOM from 'react-dom';
import { Route, BrowserRouter as Router } from 'react-router-dom'
import './index.css';
import App from './App';
import ArticleList from './pages/article-list';
import ArticleDetail from './pages/article-detail';
import registerServiceWorker from './registerServiceWorker';
import config from 'react-global-configuration';
import configuration from './config';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import luoxjBlog from './reducers'

config.set(configuration);

let store = createStore(luoxjBlog);

ReactDOM.render((
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={App} />
                <Route path="/article/list" component={ArticleList} />
                <Route path="/article/detail/:id" component={ArticleDetail} />
            </div>
        </Router>
    </Provider>
), document.getElementById('root'));
registerServiceWorker();

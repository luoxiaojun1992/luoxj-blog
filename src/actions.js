import config from 'react-global-configuration';

/*
 * action 类型
 */

export const GET_YEAR = 'GET_YEAR';

export const GET_INDEX_ARTICLES = 'GET_INDEX_ARTICLES';

export const GET_DETAIL_ARTICLE = 'GET_DETAIL_ARTICLE';

/*
 * action 创建函数
 */

export function getYear() {
    return { type: GET_YEAR }
}

export function getIndexArticles() {
    return function(dispatch) {
        fetch(config.get('api_gateway') + '?access-token=' + config.get('access-token'), {
            method: 'GET',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (jsonData) {
                    dispatch({type: GET_INDEX_ARTICLES, articles: jsonData.data});
                });
            }
        });
    }
}

export function getDetailArticle(id) {
    return function(dispatch) {
        fetch(config.get('api_gateway') + '/article/action/detail?id=' + id + '&access-token=' + config.get('access-token'), {
            method: 'GET',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (jsonData) {
                    if (jsonData.code === 0) {
                        dispatch({type: GET_DETAIL_ARTICLE, article: jsonData.data});
                    }
                });
            }
        });
    }
}

export function getListArticles(thisObj, page) {
    return function (dispatch) {
        const limit = 10;
        const offset = page * limit;
        fetch(config.get('api_gateway') + '/article/action/list?offset=' + offset + '&limit=' + limit  + '&access-token=' + config.get('access-token'), {
            method: 'GET',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (jsonData) {
                    if (jsonData.data.length > 0) {
                        if (thisObj.state.page + 1 !== page) {
                            dispatch(getListArticles(thisObj, page));
                            return;
                        }
                        var articles = thisObj.state.articles;
                        jsonData.data.map(function (article) {
                            articles.push(article);
                            return articles;
                        });
                        thisObj.setState({
                            articles: articles,
                            hasMoreItems: true,
                            page: page
                        })
                    } else {
                        thisObj.setState({
                            hasMoreItems: false
                        });
                    }
                });
            }
        });
    };
}

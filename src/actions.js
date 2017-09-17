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
        fetch(config.get('api_gateway'), {
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
        fetch(config.get('api_gateway') + '/article/action/detail?id=' + id, {
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

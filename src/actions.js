import config from 'react-global-configuration';

/*
 * action 类型
 */

export const GET_YEAR = 'GET_YEAR';

export const GET_INDEX_ARTICLES = 'GET_INDEX_ARTICLES';

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

import config from 'react-global-configuration';

/*
 * action 类型
 */

export const GET_YEAR = 'GET_YEAR';

export const GET_INDEX_ARTICLES = 'GET_INDEX_ARTICLES';

export const GET_DETAIL_ARTICLE = 'GET_DETAIL_ARTICLE';

export const QUERY_WEATHER = 'QUERY_WEATHER';

export const QUERY_HOLIDAY = 'QUERY_HOLIDAY';

export const CHECK_IN_DATA = 'CHECK_IN_DATA';

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

export function queryWeather(city) {
    return function(dispatch) {
        if ((new Date()).getTime() - localStorage.getItem('luoxj-blog:cache:query-weather:expire') <= 3600000) {
            let jsonDataCache = localStorage.getItem('luoxj-blog:cache:query-weather');
            if (jsonDataCache != null) {
                let jsonData = eval('(' + jsonDataCache + ')');
                if (jsonData.code === 0) {
                    dispatch({
                        type: QUERY_WEATHER,
                        weather: jsonData.data.week + ' - ' + jsonData.data.weather + ' - ' + jsonData.data.temp + '℃'
                    });
                    return;
                }
            }
        }

        fetch(config.get('api_gateway') + '/weather/action/query?city=' + city + '&access-token=' + config.get('access-token'), {
            method: 'GET',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (jsonData) {
                    if (jsonData.code === 0) {
                        localStorage.setItem('luoxj-blog:cache:query-weather', JSON.stringify(jsonData));
                        localStorage.setItem('luoxj-blog:cache:query-weather:expire', (new Date()).getTime());

                        dispatch({type: QUERY_WEATHER, weather: jsonData.data.week + ' - ' + jsonData.data.weather + ' - ' + jsonData.data.temp + '℃'});
                    }
                });
            }
        });
    }
}

export function locateIp() {
    return function(dispatch) {
        fetch(config.get('api_gateway') + '/ip/action/locate?access-token=' + config.get('access-token'), {
            method: 'GET',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (jsonData) {
                    if (jsonData.code === 0) {
                        var city = jsonData.data[2];
                        dispatch(queryWeather(city));
                    }
                });
            }
        });
    }
}

export function queryHoliday() {
    return function(dispatch) {
        fetch(config.get('api_gateway') + '/holiday/action/query?&access-token=' + config.get('access-token'), {
            method: 'GET',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (jsonData) {
                    if (jsonData.code === 0) {
                        dispatch({type: QUERY_HOLIDAY, holiday: jsonData.data});
                    }
                });
            }
        });
    }
}

export function reqAggregate() {
    return function(dispatch) {
        if ((new Date()).getTime() - localStorage.getItem('luoxj-blog:cache:req-aggregate:expire') <= 3600000) {
            let jsonDataCache = localStorage.getItem('luoxj-blog:cache:req-aggregate');
            if (jsonDataCache != null) {
                let jsonData = eval('(' + jsonDataCache + ')');
                if (jsonData.code === 0) {
                    let ipLocate = eval('(' + jsonData.data.util.ipLocate + ')');
                    if (ipLocate.code === 0) {
                        var city = ipLocate.data[2];
                        dispatch(queryWeather(city));
                    }

                    let holidayQuery = eval('(' + jsonData.data.util.holidayQuery + ')');
                    if (holidayQuery.code === 0) {
                        dispatch({type: QUERY_HOLIDAY, holiday: holidayQuery.data});
                    }
                    let checkInData = jsonData.data.user.checkInData;
                    dispatch({type: CHECK_IN_DATA, total: checkInData.total, last_time: checkInData.last_time});

                    return;
                }
            }
        }

        fetch(config.get('api_gateway') + '/aggregate/action/req?&access-token=' + config.get('access-token'), {
            method: 'POST',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify([
                {
                    "service": "util",
                    "method": "ipLocate",
                    "params": []
                },
                {
                    "service": "util",
                    "method": "holidayQuery",
                    "params": []
                },
                {
                    "service": "user",
                    "method": "checkInData",
                    "params": []
                }
            ])
        }).then(function (res) {
            if (res.ok) {
                res.json().then(function (jsonData) {
                    if (jsonData.code === 0) {
                        localStorage.setItem('luoxj-blog:cache:req-aggregate', JSON.stringify(jsonData));
                        localStorage.setItem('luoxj-blog:cache:req-aggregate:expire', (new Date()).getTime());

                        let ipLocate = eval('(' + jsonData.data.util.ipLocate + ')');
                        if (ipLocate.code === 0) {
                            var city = ipLocate.data[2];
                            dispatch(queryWeather(city));
                        }

                        let holidayQuery = eval('(' + jsonData.data.util.holidayQuery + ')');
                        if (holidayQuery.code === 0) {
                            dispatch({type: QUERY_HOLIDAY, holiday: holidayQuery.data});
                        }
                        let checkInData = jsonData.data.user.checkInData;
                        dispatch({type: CHECK_IN_DATA, total: checkInData.total, last_time: checkInData.last_time});
                    }
                });
            }
        });
    }
}

import { combineReducers } from 'redux';
import { GET_YEAR, GET_INDEX_ARTICLES, GET_DETAIL_ARTICLE, QUERY_WEATHER } from './actions';

function getCommonConfigs(state = {}, action) {
    switch (action.type) {
        case GET_YEAR:
            return Object.assign({}, state, {
                year: (new Date()).getFullYear().toString()
            });
        case GET_INDEX_ARTICLES:
            return Object.assign({}, state, {
                articles: action.articles
            });
        case GET_DETAIL_ARTICLE:
            return Object.assign({}, state, {
                article: action.article
            });
        case QUERY_WEATHER:
            return Object.assign({}, state, {
                weather: action.weather
            });
        default:
            return state;
    }
}

const luoxjBlog = combineReducers({
    getCommonConfigs
});

export default luoxjBlog;

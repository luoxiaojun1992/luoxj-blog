import { combineReducers } from 'redux';
import { GET_YEAR, GET_INDEX_ARTICLES, GET_DETAIL_ARTICLE, QUERY_WEATHER, QUERY_HOLIDAY } from './actions';

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
        case QUERY_HOLIDAY:
            return Object.assign({}, state, {
                holiday: action.holiday
            });
        default:
            return state;
    }
}

const luoxjBlog = combineReducers({
    getCommonConfigs
});

export default luoxjBlog;

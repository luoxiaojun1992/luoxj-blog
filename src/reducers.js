import { combineReducers } from 'redux';
import { GET_YEAR, GET_INDEX_ARTICLES } from './actions';

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
        default:
            return state;
    }
}

const luoxjBlog = combineReducers({
    getCommonConfigs
});

export default luoxjBlog;

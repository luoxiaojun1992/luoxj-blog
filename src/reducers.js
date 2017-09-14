import { combineReducers } from 'redux';
import { GET_YEAR } from './actions';

function getCommonConfigs(state = [], action) {
    switch (action.type) {
        case GET_YEAR:
            return {
                year: (new Date()).getFullYear().toString()
            };
        default:
            return state;
    }
}

const luoxjBlog = combineReducers({
    getCommonConfigs
});

export default luoxjBlog;

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import feed from '../modules/feed/feed.reducer';
import error from '../modules/errors/error.reducer';

const rootReducer = combineReducers({
	feed,
	error,
	form: formReducer
});

export default rootReducer;

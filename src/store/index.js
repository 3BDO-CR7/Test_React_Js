import { createStore, applyMiddleware } from "redux";
import reducers from '../reducers';
import thunk from 'redux-thunk';

function configureStore(state = { rotating: true }) {
    return createStore(
        reducers,
        state,
        applyMiddleware(thunk)
    );
}

export default configureStore;

import { createStore } from "redux";
import reducers from '../reducers';

function configureStore(state = { rotating: true }) {
    return createStore(reducers,state);
}

export default configureStore;

//The store file is what bundles reducers together and makes all reducers states available in one place. This is done using the createStore method from the redux package. Remember, everything that you do within your reducers and store files is done with the main redux package. React-redux is ONLY for connecting your redux to a react application.
import {createStore} from 'redux';
import reducer from './reducer';

export default createStore(reducer);



// import {createStore, combineReducers} from 'redux';
// import reducer from './reducer';
// import reducerTwo from './reducer-two';

// const rootReducer = combineReducers({
//     reducer: reducer,
//     reducerTwo: reducerTwo
// })

// export default createStore(rootReducer);
import {createStore,applyMiddleware,compose} from 'redux'
import reducer from './reducers/reducer'

import thunk from 'redux-thunk'
const middleWare=[thunk];
export default createStore(
    reducer,
    compose(
        applyMiddleware(...middleWare)
        //disable the second parameter for redux to work on mobile device!!!!
        // ,
        // (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    )
)


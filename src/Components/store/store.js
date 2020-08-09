import {createStore,applyMiddleware,compose} from 'redux'
import reducer from './reducers/reducer'

import thunk from 'redux-thunk'
const middleWare=[thunk];
export default createStore(
    reducer,
    compose(
        applyMiddleware(...middleWare)
        // ,
        // (window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
    )
)


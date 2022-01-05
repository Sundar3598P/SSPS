import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { productListReducer, productDetailsReducer } from './reducers/productReducers'
import { cartReducers } from './reducers/cartReducers'
import {userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer} from './reducers/userReducers'
import { orderCreateReducer, orderDetailsReducer, orderPayReducer } from './reducers/orderReducers'


const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart:cartReducers,
    userLogin:userLoginReducer,
    userRegister:userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer
})

const cartItemsFromStorage=localStorage.getItem('cartItems')
                           ?JSON.parse(localStorage.getItem('cartItems'))
                           :[]
const userInfoFromStorage=localStorage.getItem('userInfo')
                          ?JSON.parse(localStorage.getItem('userInfo'))
                          :null
const shippingAddressFormStorage=localStorage.getItem('shippingAddress')
                                ?JSON.parse(localStorage.getItem('shippingAddress'))
                                :{}
const initialState = {
    cart:{
        cartItems:cartItemsFromStorage,
        shippingAddress:shippingAddressFormStorage
    },
    userLogin:{userInfo:userInfoFromStorage}
}
const middleware = [thunk]

const store = createStore(reducer, initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store
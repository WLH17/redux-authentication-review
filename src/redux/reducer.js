//The reducer file contains three main parts:
//1. The initialState object. This contains the state values you want to store on redux. Like local state in a React component, the values of these state items are the default values you would like for these items.
const initialState = {
    name: '',
    address: '',
    city: '',
    state: '',
    zip: 0,
    img: '',
    mortgage: 0,
    rent: 0
}

const UPDATE_LOCATION = 'UPDATE_LOCATION';
const UPDATE_IMAGE = 'UPDATE_IMAGE';
const UPDATE_MONEY = 'UPDATE_MONEY';
const CLEAR_INFO = 'CLEAR_INFO';

//2. Action creators. These work with the reducer function to provide information of how the reduxState should change(type), and any values the reducer will need to update the state(payload). Action creators are exported so that they can be imported to any component that needs them.
export function updateLocation(locationObj){
    //console.log(locationObj)
    return {
        type: UPDATE_LOCATION,
        payload: locationObj
    }
}

export function updateImg(imgURL){
    return {
        type: UPDATE_IMAGE,
        payload: imgURL
    }
}

export function updateMoney(moneyObj){
    return {
        type: UPDATE_MONEY,
        payload: moneyObj
    }
}

export function clear(){
    return {
        type: CLEAR_INFO,
        payload: initialState
    }
}

//3. The reducer function. The reducer function is essentially the master controller of the reducer file. It is what will actually change the state at the top of this file, with the help of action creators. It takes state and actions as arguments, and uses a switch statement to determine which action was invoked, based on that actions type.
export default function reducer(state = initialState, action){
    //console.log(action.type)
    switch(action.type){
        case UPDATE_LOCATION:
            return {...state, ...action.payload}
        case UPDATE_IMAGE:
            return {...state, img: action.payload}
        case UPDATE_MONEY:
            return {...state, ...action.payload}
        case CLEAR_INFO:
            return action.payload;
        default:
            return state;
    }
}
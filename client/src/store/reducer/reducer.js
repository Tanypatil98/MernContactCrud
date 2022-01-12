import * as actionTypes from '../actionTypes';

const initialState = {
    details: [],
    messagead: '',
    message: '',
    loading: false,
    color: 'green',
    detail: []
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.ADD_CONTACT_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_CONTACT_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.UPDATE_CONTACT_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.REMOVE_CONTACT_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.GET_ID_CONTACT_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ADD_CONTACT_FAIL:
            return {
                ...state,
                color: 'red',
                messagead: action.msg
            }
        case actionTypes.GET_CONTACT_FAIL:
            return {
                ...state,
                 color: 'red',
                 message: action.msg
            }
        case actionTypes.UPDATE_CONTACT_FAIL:
            return {
                ...state,
                color: 'red',
                message: action.msg
            }
        case actionTypes.REMOVE_CONTACT_FAIL:
            return {
                ...state,
                color: 'red',
                message: action.msg
            }
        case actionTypes.GET_ID_CONTACT_FAIL:
            return {
                ...state,
                color: 'red',
                message: action.msg
            }
        case actionTypes.ADD_CONTACT:
          return {
              ...state,
              messagead: action.msg,
              loading: false,
              color: 'green'
          }
        case actionTypes.GET_CONTACT:
            return{
                ...state,
                details: action.detail,
                message: action.msg,
                loading: false,
                color: 'green'
            }
        case actionTypes.UPDATE_CONTACT:
            return{
                ...state,
                message: action.msg,
                loading: false,
                color: 'green'
            }
        case actionTypes.REMOVE_CONTACT:
            return{
                ...state,
                details: state.details.filter(detail => detail.id !== action.id),
                message: action.msg,
                loading: false,
                color: 'green'
            }
        case actionTypes.GET_ID_CONTACT:
            return{
                ...state,
                detail: action.detail,
                loading: false
            }
       default:
           
    }
    return state;
};

export default reducer;
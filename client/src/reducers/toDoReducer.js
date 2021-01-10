/* eslint-disable import/no-anonymous-default-export */
import { GET_TODO, UPDATE_TODO, CREATE_TODO, ENABLE_LOADING, DISABLE_LOADING, SET_CURRENT_BUCKET, DELETE_BUCKET } from '../actions/types';

const initialState = {
    buckets: [],
    currentBucket: {},
    loading: false,
}

export default function (state = initialState, action) {
    switch(action.type){
        case GET_TODO:
            return {
                ...state,
                buckets: action.payload,
            };
        case UPDATE_TODO:
            return {
                ...state,
                buckets: action.payload
            }    
        case CREATE_TODO:
            return {
                ...state,
                buckets: action.payload,
            }
        case ENABLE_LOADING:
            return {
                ...state,
                loading: true
            }
        case DISABLE_LOADING:
            return {
                ...state,
                loading: false
            }    
        case SET_CURRENT_BUCKET:
            return {
                ...state,
                currentBucket: action.payload
            }
        case DELETE_BUCKET:
            return {
                ...state,
                buckets: action.payload,
            }    
        default:
            return state;    
    }
}
import axios from 'axios';

import { GET_TODO, GET_ERRORS, UPDATE_TODO, CREATE_TODO, ENABLE_LOADING, DISABLE_LOADING, SET_CURRENT_BUCKET, DELETE_BUCKET} from './types';


export const getToDo = () => dispatch => {
    dispatch(enableToDoLoading());
    axios.get(`/api/buckets/all`)
    .then((res) => {
        dispatch({
            type: GET_TODO,
            payload: res.data
        });
        dispatch(disableToDoLoading());
    }).catch((err)=> {
        dispatch(
            {
                type: GET_ERRORS,
                payload: err
            }
        );
        dispatch(disableToDoLoading());
    })
}

export const updateToDo = (_id, list ) => (dispatch, getState) => {
    console.log(_id, list);
    dispatch(enableToDoLoading());
    axios.post(`/api/buckets/update/${_id}`, {list})
    .then((res) => {
        dispatch({
            type: UPDATE_TODO,
            payload: res.data
        })
        let bucket = getState().toDo.currentBucket
        bucket.list = list
        dispatch(setToDo(bucket));
        dispatch(disableToDoLoading());
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
        dispatch(disableToDoLoading());
    }
    )
}

export const createToDo = (bucketName, label) => dispatch => {
    dispatch(enableToDoLoading());
    axios.post(`/api/buckets/add`, {bucketName, label})
    .then(res => {
        dispatch({
            type: CREATE_TODO,
            payload: res.data
        })
        dispatch(disableToDoLoading());
    }).catch(err => {
        dispatch({
            type: GET_ERRORS,
            payload: err
        })
        dispatch(disableToDoLoading());
    })
}

export const setToDo = (bucket) => dispatch => {
    dispatch(enableToDoLoading());
    dispatch({
        type: SET_CURRENT_BUCKET,
        payload: bucket
    });
    dispatch(disableToDoLoading());
}

export const deleteBucket = (_id) => dispatch => {
    dispatch(enableToDoLoading());
    axios.delete(`/api/buckets/${_id}`)
        .then(res => {
            dispatch({
                type: DELETE_BUCKET,
                payload: res.data
            })
            dispatch(setToDo({}));
            dispatch(disableToDoLoading());

        }).catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: err
            });
            dispatch(disableToDoLoading());
        })
}

export const enableToDoLoading = () => {
    return {
        type: ENABLE_LOADING
    };
};
export const disableToDoLoading = () => {
    return {
        type: DISABLE_LOADING
    };
};
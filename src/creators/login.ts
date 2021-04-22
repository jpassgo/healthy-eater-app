import actions from '../actions/actions';
import { AnyAction } from 'redux';

export const loginSuccess = (): AnyAction => {
    return {
        type: actions.LOGIN_SUCCESS,
    }
}

export const loginError = (): AnyAction => {
    return {
        type: actions.LOGIN_ERROR,
    }
}

export const logout = (): AnyAction => {
    return {
        type: actions.LOGOUT,
    }
}
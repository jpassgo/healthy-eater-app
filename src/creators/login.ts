import actions from '../actions/actions';
import { AnyAction } from 'redux';

export const loginAttempt = (username: string, password: string): AnyAction => {
    return {
        type: actions.LOGIN_ATTEMPT,
        username: username,
        password: password
    }
}

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
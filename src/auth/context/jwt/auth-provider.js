'use client';

import PropTypes from 'prop-types';
import { useMemo, useEffect, useReducer, useCallback } from 'react';

import axios, { endpoints } from 'src/utils/axios';

import { AuthContext } from './auth-context';
import { setSession, isValidToken } from './utils';

// ----------------------------------------------------------------------
/**
 * NOTE:
 * We only build demo at basic level.
 * Customer will need to do some extra handling yourself if you want to extend the logic and other features...
 */
// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
  promptData: []
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      ...state,
      loading: false,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  if (action.type === 'SAVE_PROMPT') {
    return {
      ...state,
      promptData: action.payload,
    };
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'access_token';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const access_token = sessionStorage.getItem(STORAGE_KEY);

      if (access_token && isValidToken(access_token)) {
        setSession(access_token);

        //  const response = await axios.get(endpoints.auth.me);

        // const { user } = response.data;
        const user = {
          fullName: 'john doe',
          username: 'johndoe',
          password: '$2b$10$MfJZWV3MhZq9CcxkepMZHeI97kXh2sXFNtKuwiI1NdFXDX33lzB7K',
          confirmPassword: 'pass1',
          email: 'john@gmail.com',
          companyName: 'comp1',
          companyEmail: 'info@comp1.com',
        };

        dispatch({
          type: 'INITIAL',
          payload: {
            user: {
              ...user,
              access_token,
            },
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, []);

  // useEffect(() => {
  //   initialize();
  // }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    // const data = {
    //   email,
    //   password,
    // };

    // const response = await axios.post(endpoints.auth.login, data);

    // const { access_token, user } = response.data;
    const user = {
      fullName: 'john doe',
      username: 'johndoe',
      password: '$2b$10$MfJZWV3MhZq9CcxkepMZHeI97kXh2sXFNtKuwiI1NdFXDX33lzB7K',
      confirmPassword: 'pass1',
      email: 'john@gmail.com',
      companyName: 'comp1',
      companyEmail: 'info@comp1.com',
    };
    let access_token =
      '"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NDVjZmM4YzhhZmM0MzJiMGFiYTNkMTMiLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJpYXQiOjE3MDY0OTY2MjEsImV4cCI6MTcwNjU4MzAyMX0.P_Rb67vjH5BO0k4LRStyYKjAR4jcBdip7ELquj6-ESs';

    setSession(access_token);

    dispatch({
      type: 'LOGIN',
      payload: {
        user: {
          ...user,
          access_token,
        },
      },
    });
  }, []);

  // REGISTER
  const register = useCallback(
    async (email, password, fullName, username, companyName, companyEmail, confirmPassword) => {
      const data = {
        email,
        password,
        fullName,
        username,
        companyName,
        companyEmail,
        confirmPassword,
      };

      const response = await axios.post(endpoints.auth.register, data);

      const { access_token, user } = response.data;
      sessionStorage.setItem(STORAGE_KEY, access_token);
      dispatch({
        type: 'REGISTER',
        payload: {
          user: {
            ...user,
            access_token,
          },
        },
      });
    },
    []
  );

  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  const savePrompt = useCallback(async (data) => {
    dispatch({
      type: 'SAVE_PROMPT',
      payload: data
    });
  }, []);
  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      promptData: state.promptData,
      //
      login,
      register,
      logout,
      savePrompt
    }),
    [login, logout, register, savePrompt, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

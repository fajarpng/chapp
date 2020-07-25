const initialState = {
    isLogedin: false,
    isLoading: false,
    uid: '',
    errMsg: '',
    isErr: false,
  }
  
  const auth = (state=initialState, action) => {
    switch(action.type){
      case 'LOGIN_PENDING': {
        return {
          ...state,
          isLoading: true,
        }
      }
      case 'LOGIN_REJECTED': {
        return {
          ...state,
          isLoading: false,
          errMsg: action.payload.code,
          isErr: true
        }
      }
      case 'LOGIN_FULFILLED': {
        return {
          ...state,
          isLoading: false,
          isErr: false,
          errMsg: 'Success, welcome !',
          uid: action.payload.user.uid,
          isLogedin: true
        }
      }
      case 'REGIS_PENDING': {
        return {
          ...state,
          isLoading: true,
        }
      }
      case 'REGIS_REJECTED': {
        return {
          ...state,
          isLoading: false,
          errMsg: action.payload.code,
          isErr: true
        }
      }
      case 'REGIS_FULFILLED': {
        return {
          ...state,
          isLoading: false,
          isErr: false,
          errMsg: 'Success, you have to login !',
          uid: action.payload.user.uid,
        }
      }
      case 'LOGOUT_PENDING': {
        return {
          ...state,
          isLoading: true,
        }
      }
      case 'LOGOUT_REJECTED': {
        return {
          ...state,
          isLoading: false,
          errMsg: action.payload.code,
          isErr: true
        }
      }
      case 'LOGOUT_FULFILLED': {
        return {
          ...state,
          isLoading: false,
          isLogedin: false,
          isErr: false,
          errMsg: 'See you soon !'
        }
      }
      case 'CLEAR': {
        return {
          ...state,
          errMsg: '',
        }
      }
      default: {
        return {
          ...state
        }
      }
    }
  }
  
  export default auth
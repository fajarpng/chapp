const initialState = {
  loadingUser: false,
  errUser: false,
  errMsgUser: '',
  dataUser: [],
}

const user = (state=initialState, action) => {
  switch(action.type){
    case 'CREATE_PENDING': {
      return {
        ...state,
        loadingUser: true,
        errUser: false
      }
    }
    case 'CREATE_REJECTED': {
      return {
        ...state,
        loadingUser: false,
        errUser: true,
        errMsgUser: action.payload.code,
      }
    }
    case 'CREATE_FULFILLED': {
      return {
        ...state,
        loadingUser: false,
        errUser: false,
        errMsgUser: 'Success !'
      }
    }
    case 'GET_PENDING': {
      return {
        ...state,
        loadingUser: true,
        errUser: false
      }
    }
    case 'GET_REJECTED': {
      return {
        ...state,
        loadingUser: false,
        errUser: true,
        errMsgUser: 'failed!',
      }
    }
    case 'GET_FULFILLED': {
      return {
        ...state,
        loadingUser: false,
        errUser: false,
        dataUser: action.payload._data,
      }
    }
    case 'CLEAR': {
        return {
          ...state,
          errMsgUser: '',
        }
      }
    default: {
      return {
        ...state
      }
    }
  }
}

export default user
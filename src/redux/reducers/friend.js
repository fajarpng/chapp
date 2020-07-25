const initialState = {
  searchLoading: false,
  errSearch: false,
  errMsgSearch: '',
  dataSearch: [],
}

const search = (state=initialState, action) => {
  switch(action.type){
    case 'SEARCH_PENDING': {
      return {
        ...state,
        loadingUser: true,
        errSearch: false
      }
    }
    case 'SEARCH_REJECTED': {
      return {
        ...state,
        loadingUser: false,
        errSearch: true,
        errMsgSearch: 'Something wrong, try again !',
      }
    }
    case 'SEARCH_FULFILLED': {
      return {
        ...state,
        loadingUser: false,
        errMsgSearch: 'Success',
        errSearch: false,
        dataSearch: action.payload._data,
      }
    }
    case 'CLEAR': {
        return {
          ...state,
          errMsgSearch: '',
        }
      }
    default: {
      return {
        ...state
      }
    }
  }
}

export default search
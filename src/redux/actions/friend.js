import firestore from '@react-native-firebase/firestore'

const search = (data)=>{
  const { email } = data
  return {
    type: 'SEARCH',
    payload: firestore()
      .collection('users')
      .doc(email.toLowerCase())
      .get()
  }
}
const friendList = (data) => {
  return {
    type: 'SEARCH',
    payload: data
  }
}
const clear = ()=>{
  return {
    type: 'CLEAR',
  }
}

export { search, friendList, clear }
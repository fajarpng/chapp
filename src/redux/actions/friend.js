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
const clear = ()=>{
  return {
    type: 'CLEAR',
  }
}

export { search, clear }
import auth from '@react-native-firebase/auth';

const login = (data)=>{
	const { email, password } = data
  return {
    type: 'LOGIN',
    payload: auth().signInWithEmailAndPassword(email, password)
  }
}
const register = (data)=>{
	const { email, password } = data
  return {
    type: 'REGIS',
    payload: auth().createUserWithEmailAndPassword(email, password)
  }
}
const logout = ()=>{
  return {
    type: 'LOGOUT',
    payload: auth().signOut()
  }
}
const celarMsg = ()=>{
  return {
    type: 'CLEAR',
  }
}

export { login, logout, register, celarMsg };
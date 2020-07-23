import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';

const create = (data)=>{
  const{ email, username, location } = data
  return {
    type: 'CREATE',
    payload: firestore()
      .collection('users')
      .doc(email.toLowerCase())
      .set({
        email: email.toLowerCase(),
        username,
        status: 'Hi! there im using Chapp',
        image: null,
        location
      })
  }
}
const get = (data)=>{
  const { email } = data
  return {
    type: 'GET',
    payload: firestore()
      .collection('users')
      .doc(email.toLowerCase())
      .get()
  }
}
const update = (data)=>{
  const {email, username, status, imageName} = data
  return {
    type: 'CREATE',
    payload: firestore()
      .collection('users')
      .doc(email.toLowerCase())
      .update({
        email: email.toLowerCase(),
        username,
        status,
        image: imageName
    })
  }
}
const uploadImage = (data)=>{
  return {
    type: 'CREATE',
    payload: storage()
      .ref(data.imageName)
      .putFile(data.image)
  }
}
const clear = ()=>{
  return {
    type: 'CLEAR',
  }
}

export {create, get, update, clear, uploadImage}
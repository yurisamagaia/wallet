import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { AuthDetails } from '../utils/types';

export const logoutUser = () => {
  firebase.auth().signOut();
};

export const currentDate = () => {
  const timestamp = firebase.firestore.FieldValue.serverTimestamp();
  return timestamp;
};

export const signInUser = async ({ name, email, password }: AuthDetails) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    firebase.auth().currentUser?.updateProfile({
      displayName: name
    })
    return {};
  } catch (error) {
    switch (error.code) {
      case "auth/email-already-in-use":
        return {
          error: "E-mail já utilizado."
        };
      case "auth/invalid-email":
        return {
          error: "Formato de e-mail invalido."
        };
      case "auth/weak-password":
        return {
          error: "Senha muito fraca."
        };
      case "auth/too-many-requests":
        return {
          error: "Muitas tentativas, tente novamente mais tarde."
        };
      default:
        return {
          error: "Verifique sua conexão com a internet."
        };
    }
  }
};

export const onAddButtonPress = async ({ value, type }: any) => {
  try {
    const user: any = firebase.auth().currentUser;
    const entityRef = firebase.firestore().collection('entities')
    const data = {
      authorID: user.uid,
      value: value,
      type: type,
      date: currentDate()
    };
    await entityRef.add(data)
    return {};
  } catch (error) {
    return {
      error: error
    };
  }
}

export const addInvest = async ({ name, email, password }: AuthDetails) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    firebase.auth().currentUser?.updateProfile({
      displayName: name
    })
    return {};
  } catch (error) {
    console.error(error)
  }
};

export const loginUser = async ({ email, password }: AuthDetails) => {
  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    return {};
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-email":
        return {
          error: "Formato de e-mail invalido."
        };
      case "auth/user-not-found":
      case "auth/wrong-password":
        return {
          error: "E-mail ou senha invalidos."
        };
      case "auth/too-many-requests":
        return {
          error: "Muitas tentativas, tente novamente mais tarde."
        };
      default:
        return {
          error: "Verifique sua conexão com a internet."
        };
    }
  }
};

export const sendEmailWithPassword = async (email: string) => {
  try {
    await firebase.auth().sendPasswordResetEmail(email);
    return {};
  } catch (error) {
    switch (error.code) {
      case "auth/invalid-email":
        return {
          error: "Formato de e-mail invalido."
        };
      case "auth/user-not-found":
        return {
          error: "Nenhum usuário encontrado com esse e-mail."
        };
      case "auth/too-many-requests":
        return {
          error: "Muitas tentativas, tente novamente mais tarde."
        };
      default:
        return {
          error: "Verifique sua conexão com a internet."
        };
    }
  }
};

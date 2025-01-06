import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { auth, db } from "../firebaseConfig";
export const AuthContext = createContext();
import {doc, getDoc, setDoc} from 'firebase/firestore';

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
        if(user){
            setIsAuthenticated(true);
            setUser(user);
            updateUserData(user?.uid);
        }else {
            setIsAuthenticated(false);
            setUser(null);
        }
       return unsub;
    });
  }, []);


  const register = async (email, password, username) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);

        await setDoc(doc(db,"users", response?.user?.uid), {
            username,
            userId: response?.user?.uid,
            profileUrl: `https://avatar.iran.liara.run/public`,
        });
        return {success: true, data: response?.user};
    } catch (error) {
        let msg = error.message;
        if(msg.includes('(auth/invalid-email)')) msg = 'Invalid Email';
        if(msg.includes('(auth/email-already-in-use)')) msg ='Email already in use'
        return {success: false, msg}
    }
  };

  const updateUserData = async (userId) => {
    const docRef = doc(db, 'users', userId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()){
      let data = docSnap.data();
      setUser({...user, username: data.username, profileUrl: data.profileUrl, userId: data.userId});
    }
  }

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      return {success: true};
    } catch (error) {
      let msg = error.message;
        if(msg.includes('(auth/invalid-email)')) msg = 'Invalid Email';
        return {success: false, msg}
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return {success: true}
    } catch (error) {
      return {success: false, msg: error.message, error}
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
    const value = useContext(AuthContext);

    if(!value) {
        throw new Error('useAuth must be wrapped inside AuthContextProvider');
    }

    return value;
}
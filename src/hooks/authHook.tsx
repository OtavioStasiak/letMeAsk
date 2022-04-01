import React, {useState, useEffect, createContext, useContext} from "react";

import {auth, firebase} from '../services/firebase';


type AuthContextData = {
    signInWithGoogle: () => void;
    user: {id: string, name: string, avatar: string};
  };

  type AuthProviderProps = {
    children: React.ReactNode;
  };

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState({id: '', name: '', avatar: ''})
    
    function signInWithGoogle() {
        const provider = new firebase.auth.GoogleAuthProvider();

        auth.signInWithPopup(provider).then(result => {
            if(result.user) {
                const {displayName, photoURL, uid} = result.user;

                if(!displayName || !photoURL) {
                    throw new Error('Missing information from Google Account.');
                };

                setUser({
                    id: uid,
                    name: displayName,
                    avatar: photoURL
                });
            }
        })

    }
 
    return (
        <AuthContext.Provider 
        value={{
          signInWithGoogle,
          user
        }}>
          {children}
        </AuthContext.Provider>
      )
    }

    function useAuth() {
        const context = useContext(AuthContext);
      
        return context;
      }

      export {
        AuthProvider,
        useAuth
      }
// import { User } from 'firebase/auth'
import { User } from 'firebase/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth/cordova';
// import { useState } from 'react'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';

const useAuth = () => {

    //    Bu state larni orniga "Zastend" orqali export qilinyabdi.

    // const [isLoading, setLoading] = useState<boolean>(false)
    // const [error, setError] = useState<string>('');
    // const [user, setUser] = useState<User>({} as User)

    const { user, setUser, isLoading, setLoading, error, setError } = useAuthStore();

    const navigate = useNavigate()

    const signUp = async ( email: string, password: string ) => {
        setLoading( true );
        await createUserWithEmailAndPassword( auth, email, password ).then( res => {
            setUser( res.user );
            setLoading( false );
            navigate( '/' );
        } )
            .catch( error => {
                const result = error as Error;
                setError( result.message );
            } )
            .finally( () => setLoading( false ) )
    }

    const signIn = async ( email: string, password: string ) => {
        setLoading( true );
        await signInWithEmailAndPassword( auth, email, password ).then( res => {
            setUser( res.user );
            setLoading( false );
            navigate( '/' );
        } )
            .catch( error => {
                const result = error as Error;
                setError( result.message );
            } )
            .finally( () => setLoading( false ) )
    }

    const logout = () => {
        setLoading( true );

        //  bu yerda proms qaytaradi .then(() =>)
        signOut( auth )
            .then( () => {
                setUser( {} as User );
                navigate( '/auth' );
            } ).catch( err => {
                const result = err as Error;
                setError( result.message );
            } )

    }

    return { signIn, signUp, logout, user, isLoading, error }
}

export default useAuth;
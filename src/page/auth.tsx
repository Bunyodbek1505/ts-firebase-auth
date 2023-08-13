import { FormEvent, useState } from "react";
import useAuth from "../hooks/useAuth";
import { useAuthStore } from "../store/auth.store";

const Auth = () => {

  const [auth, setAuth] = useState<'signup' | 'signin'>( 'signin' );
  const [email, setEmail] = useState<string>( '' );
  const [password, setPassword] = useState<string>( '' );
  const [invalid, setInvalid] = useState<boolean>( false );
  const { signUp, signIn } = useAuth();
  //  Bu yerda "useAuthState" dan malumotlar chiqarilyabdi
  const { error, isLoading } = useAuthStore();

  const toggleAuth = ( state: 'signup' | 'signin' ) => {
    setAuth( state );
  }

  const onSubmit = ( e: FormEvent<HTMLFormElement> ) => {
    e.preventDefault();
    if ( !password.length || !email.length ) {
      setInvalid( true );
    }
    setInvalid( false );
    if ( auth === 'signup' ) {
      signUp( email, password );
    }
    else {
      signIn( email, password )
    }
    // const payload = { email, password };
    // console.log( payload )
  }

  return <main className="container form-signin text-center mt-4">
    <form className="m-auto w-50" onSubmit={onSubmit}>
      <img className="mb-4" src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" alt="" width="72" height="57" />
      <h1 className="h3 mb-3 fw-normal text-start"> {auth == 'signup' ? 'Sign up' : 'Sign in'} </h1>
      {
        error && <div className="alert alert-danger">{error}</div>
      }
      <div className="form-floating">
        <input type="email"
          onChange={( e ) => setEmail( e.target.value )}
          value={email}
          className={`form-control ${invalid && "is-invalid"}`}
          id="floatingInput" placeholder="name@example.com" />
        <label htmlFor="floatingInput">Email address</label>
      </div>
      <div className="form-floating">
        <input type="password"
          onChange={( e ) => setPassword( e.target.value )}
          value={password}
          className={`form-control ${invalid && "is-invalid"}`}
          id="floatingPassword "
          placeholder="Password" />
        <label htmlFor="floatingPassword">Password</label>
      </div>

      <button className="w-100 btn btn-lg btn-primary mt-3" disabled={isLoading} type="submit">
        {isLoading ? 'Loading..' : auth == 'signin' ? 'Sign In' : 'Sign Up'}
      </button>

      <p className="mt-2 fw-bold">
        {auth === 'signup' ? 'Already have account' : 'Not account yet:'} {' '}
        {auth == 'signup' ? (
          <span onClick={() => toggleAuth( 'signin' )} className="fw-normal text-primary " style={{ cursor: 'pointer' }}>Sign in</span>
        ) : (
          <span onClick={() => toggleAuth( 'signup' )} className="fw-normal text-primary " style={{ cursor: 'pointer' }}>Sign up</span>
        )}

      </p>
    </form>
  </main>

}

export default Auth;
import React, { useEffect, useRef, useState } from 'react'
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './register.css'
import axios from '../../api/axios'

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%]).{6,24}$/;
const EMAIL_REGEX = /^\S+@\S+\.\S+$/;
const REGISTER_URL = '/register';

const Register=()=> {
    const userRef = useRef();
    const errRef = useRef();
    
    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);


    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);
    
  useEffect(()=>{
    userRef.current.focus();
  }, [])

  useEffect(()=>{
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user])
  useEffect(()=>{
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result);
  }, [email])
  useEffect(()=>{
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match = pwd===matchPwd;
    setValidMatch(match);

  }, [pwd, matchPwd])

  useEffect(()=>{
    setErrMsg('');

  }, [user, pwd, matchPwd])

  const handleSubmit = async (e) =>{
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    if (!v1 || !v2 || !v3) {
        setErrMsg("Invalid Entry");
        return;
    }
    try {
        const response = await axios.post(String(REGISTER_URL), JSON.stringify({username: user, email: email, password: pwd, repassword: matchPwd}), 
        {
            headers: {'Content-Type': 'application/json'}
        }
        );
        setSuccess(true);
    } catch (error) {

        if(error.response.status === 400)
        {
            setErrMsg(error.response.data.error)
        }
        else
        {
            setErrMsg(error.response.data)
        }
    } 
    }
    return (
            <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="#">Sign In</a>
                    </p>
                </section>
            ) : (
    <section>
        <p ref={errRef} className={errMsg? "errmsg" : "offscreen"}
            aria-live="assertive"
        >
            {errMsg}
        </p>
        <h1>Register</h1>
        <form onSubmit={handleSubmit} className='formRegister'>
            <label htmlFor="username">
                Nombre de usuario:
                <span className={validName ? "valid": "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                <span className={validName || !user ? "hide": "invalid"}>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
            </label>
            <input 
                type="text"
                id='username'
                ref={userRef}
                autoComplete = "off"
                onChange={(e)=>setUser(e.target.value)}
                required
                aria-invalid = {validName?"false": "true"}
                aria-describedby = "uidnote"
                onFocus={()=>setUserFocus(true)}
                onBlur={()=>setUserFocus(false)}
            />
            <p id='uidnote' className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                4 to 24 characters, <br />
                Debe empezar con una letra. <br />
                Letras, numeros, subguiones, guiones permitidos.
            </p>

            <label htmlFor="email">
                Email:
                <span className={validEmail ? "valid": "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                <span className={validEmail || !email ? "hide": "invalid"}>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
            </label>
            <input 
                type="email" 
                name="email" 
                id="email"
                onChange={(e)=>setEmail(e.target.value)}
                required
                aria-invalid = {validEmail?"false": "true"}
                aria-describedby = "emailnote"
               />

            <label htmlFor="password">
                Contraseña:
                <span className={validPwd ? "valid": "hide"}>
                    <FontAwesomeIcon icon={faCheck}/>
                </span>
                <span className={validPwd || !pwd ? "hide": "invalid"}>
                    <FontAwesomeIcon icon={faTimes}/>
                </span>
            </label>
            <input 
                type='password' 
                id='password'
                onChange={(e)=>setPwd(e.target.value)}
                required
                aria-invalid = {validPwd?"false":"true"}
                aria-describedby = "pwdnote"
                onFocus={()=>setPwdFocus(true)}
                onBlur={()=>setPwdFocus(false)}
                />

                <p id='pwdnote' className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle}/>
                6 to 24 characters, <br />
                Debe incluir letras mayusculas y minusculas, un número y un caracter especial <br />
                <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
            </p>


            <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            aria-invalid={validMatch ? "false" : "true"}
                            aria-describedby="confirmnote"
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                            <FontAwesomeIcon icon={faInfoCircle} />
                            Debe coincidir con la primera contraseña
                        </p>

                        <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>
                    </form>
                    <p>
                        Already registered?<br />
                        <span className="line">
                            {/*put router link here*/}
                            <a href="#">Sign In</a>
                        </span>
                    </p>
    </section>
        )}
        </>
  )
}

export {Register}
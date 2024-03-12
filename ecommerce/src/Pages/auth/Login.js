import React, { useState } from 'react';
import styles from './auth.module.scss'
import loginImg from '../../assets/login.png'
import { Link, useNavigate } from 'react-router-dom'
import { FaGoogle } from 'react-icons/fa'
import Card from '../../Components/card/Card'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/confing'
import { ToastContainer, toast } from 'react-toastify';
import Loader from '../../Components/loader/Loader'

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isLoading, setLoading] = useState(false);

    const loginUser = (e) => {
        e.preventDefault();
        isLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                isLoading(false);
                toast.success("User Loggedin");
                setEmail('');
                setPassword('');
                navigate("/")
            })
            .catch(error => {
                toast.error(error.message);
                isLoading(false);
            });
    }
    return (
        <>

            <ToastContainer />
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <div className={styles.img}>
                    <img src={loginImg} alt="Login" width="400" />
                </div>
                <Card>
                    <div className={styles.form}>
                        <h2 >Login</h2>

                        <form onSubmit={loginUser}>
                            <input type="text" placeholder='Email' required onChange={event => setEmail(event.target.value)} value={email} />
                            <input type="password" placeholder='Password' required onChange={event => setPassword(event.target.value)} value={password} />
                            <button className="--btn --btn-primary --btn-block">Login</button>
                            <div className={styles.links}>
                                <Link to='/reset'>Forgot Password</Link>
                            </div>
                            <p>-- or --</p>
                        </form>
                        <button className="--btn --btn-danger --btn-block" type="submit"><FaGoogle color="#fff" /> Login with Google</button>
                        <span className={styles.register}>
                            <p>Don't have Account?  </p>
                            <Link to="/register"><u>Register</u></Link>
                        </span>
                    </div>
                </Card>
            </section>
        </>
    )
}

export default Login
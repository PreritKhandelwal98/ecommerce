import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import styles from './auth.module.scss'
import registerImg from '../../assets/register.png'
import Card from '../../Components/card/Card'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import Loader from '../../Components/loader/Loader'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../Firebase/confing'
function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cpassword, setCPassword] = useState('');
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const createUser = (e) => {
        e.preventDefault();
        if (password !== cpassword) {
            toast.error("Password do not match.");
        }
        setLoading(true)
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setLoading(false);
                toast.success("User Registered Successfully");
                setEmail('');
                setPassword('');
                navigate("/login")
            })
            .catch(error => {
                toast.error(error.message);
                setLoading(false);
            });
    }
    return (
        <>
            <ToastContainer />
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>

                <Card>
                    <div className={styles.form}>
                        <h2 >Register</h2>

                        <form onSubmit={createUser}>
                            <input type="text" placeholder='Email' required onChange={event => setEmail(event.target.value)} value={email} />
                            <input type="password" placeholder='Password' required onChange={event => setPassword(event.target.value)} value={password} />
                            <input type="password" placeholder='Confirm Password' required onChange={event => setCPassword(event.target.value)} value={cpassword} />
                            <button className="--btn --btn-primary --btn-block" type="submit">Register</button>
                            <div className={styles.links}>
                            </div>
                        </form>
                        <span className={styles.register}>
                            <p>Already have Account?  </p>
                            <Link to="/login"><u>Login</u></Link>
                        </span>
                    </div>
                </Card>
                <div className={styles.img}>
                    <img src={registerImg} alt="Register" width="400" />
                </div>
            </section>
        </>
    )
}

export default Register
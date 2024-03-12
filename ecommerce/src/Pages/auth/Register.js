import React from 'react'
import { Link } from 'react-router-dom'
import styles from './auth.module.scss'
import registerImg from '../../assets/register.png'
import Card from '../../Components/card/Card'

function Register() {
    return (
        <>
            <section className={`container ${styles.auth}`}>

                <Card>
                    <div className={styles.form}>
                        <h2 >Register</h2>

                        <form >
                            <input type="text" value="" placeholder='Email' required />
                            <input type="password" value="" placeholder='Password' required />
                            <input type="password" value="" placeholder='Confirm Password' required />
                            <button className="--btn --btn-primary --btn-block">Register</button>
                            <div className={styles.links}>
                            </div>
                        </form>
                        <span className={styles.register}>
                            <p>Already have Account?  </p>
                            <Link to="/login">Login</Link>
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
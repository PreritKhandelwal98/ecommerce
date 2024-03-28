import { useState, useEffect } from "react";
import styles from "./auth.module.scss";
import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import Card from "../../Components/card/Card";
import {
    GoogleAuthProvider,
    signInWithPopup,
} from "firebase/auth";
import { auth } from "../../Firebase/config";
import { toast } from "react-toastify";
import { SET_ACTIVE_USER } from "../../Redux/slice/authSlice";
import Loader from "../../Components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { selectPreviousURL } from "../../Redux/slice/cartSlice";
import axios from "axios";
import Cookies from 'universal-cookie';
const Login = () => {
    const [username, setUsername] = useState("");
    // const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const previousURL = useSelector(selectPreviousURL);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const redirectUser = () => {
        if (previousURL.includes("cart")) {
            return navigate("/cart");
        }
        navigate("/");
    };

    // const loginUser = (e) => {
    //     e.preventDefault();
    //     setIsLoading(true);

    //     signInWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             // const user = userCredential.user;
    //             setIsLoading(false);
    //             toast.success("Login Successful...");
    //             redirectUser();
    //         })
    //         .catch((error) => {
    //             setIsLoading(false);
    //             toast.error(error.message);
    //         });
    // };

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            setIsLoading(true);
            const { data } = await axios.post('http://localhost:8000/api/v1/users/login', {
                username,
                password
            });

            // Set cookies for access token and refresh token
            // cookies.set('accessToken', data.accessToken, { path: '/' });
            // cookies.set('refreshToken', data.refreshToken, { path: '/' });
            localStorage.setItem('accessToken', data.data.accessToken);

            if (data.success) {
                setIsLoading(false);
                toast.success("Login Successful");
                dispatch(SET_ACTIVE_USER(data.data.user));
                redirectUser();
                navigate('/');
            } else {
                throw new Error(data.message); // Throw an error if login is not successful
            }
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message || "Login failed"); // Display error message from backend or default message
        }
    }



    // Login with Gooogle
    const provider = new GoogleAuthProvider();
    const signInWithGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // const user = result.user;
                toast.success("Login Successfully");
                redirectUser();
            })
            .catch((error) => {
                toast.error(error.message);
            });
    };

    return (
        <>
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <div className={styles.img}>
                    <img src={loginImg} alt="Login" width="400" />
                </div>

                <Card>
                    <div className={styles.form}>
                        <h2>Login</h2>

                        <form onSubmit={loginUser}>
                            <input
                                type="text"
                                placeholder="Username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button type="submit" className="--btn --btn-primary --btn-block">
                                Login
                            </button>
                            <div className={styles.links}>
                                <Link to="/reset">Reset Password</Link>
                            </div>
                            <p>-- or --</p>
                        </form>
                        <button
                            className="--btn --btn-danger --btn-block"
                            onClick={signInWithGoogle}
                        >
                            <FaGoogle color="#fff" /> Login With Google
                        </button>
                        <span className={styles.register}>
                            <p>Don't have an account?</p>
                            <Link to="/register">Register</Link>
                        </span>
                    </div>
                </Card>
            </section>
        </>
    );
};

export default Login;
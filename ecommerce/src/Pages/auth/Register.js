import { useState } from "react";
import styles from "./auth.module.scss";
import registerImg from "../../assets/register.png";
import Card from "../../Components/card/Card";
import { Link, useNavigate } from "react-router-dom";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { auth } from "../../Firebase/config";
import Loader from "../../Components/loader/Loader";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [cPassword, setCPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // const registerUser = (e) => {
    //     e.preventDefault();
    //     if (password !== cPassword) {
    //         toast.error("Passwords do not match.");
    //     }
    //     setIsLoading(true);

    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((userCredential) => {
    //             const user = userCredential.user;
    //             console.log(user);
    //             setIsLoading(false);
    //             toast.success("Registration Successful...");
    //             navigate("/login");
    //         })
    //         .catch((error) => {
    //             toast.error(error.message);
    //             setIsLoading(false);
    //         });
    // };
    const registerUser = async (e) => {
        e.preventDefault();
        try {
            if (password !== cPassword) {
                toast.error("Passwords do not match.");
            }
            setIsLoading(true);
            const { data } = await axios.post("http://localhost:8080/api/v1/users/register", {
                email,
                password,
                username
            });
            if (data.success) {
                toast.success("Registered Successfully");
                navigate('/login');
            }
        } catch (error) {
            toast.error("Invalid Form Details Please Try Agian!");
            setIsLoading(false);
            console.log(error.message);
        }
    }
    return (
        <>
            {isLoading && <Loader />}
            <section className={`container ${styles.auth}`}>
                <Card>
                    <div className={styles.form}>
                        <h2>Register</h2>

                        <form onSubmit={registerUser}>
                            <input
                                type="text"
                                placeholder="Username"
                                required
                                value={username}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                required
                                value={cPassword}
                                onChange={(e) => setCPassword(e.target.value)}
                            />

                            <button type="submit" className="--btn --btn-primary --btn-block">
                                Register
                            </button>
                        </form>

                        <span className={styles.register}>
                            <p>Already an account?</p>
                            <Link to="/login">Login</Link>
                        </span>
                    </div>
                </Card>
                <div className={styles.img}>
                    <img src={registerImg} alt="Register" width="400" />
                </div>
            </section>
        </>
    );
};

export default Register;
import '.././App.css';
import { Container, Col, Row, Form } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";


import axios from "axios";
import { API_URL } from '../utils/constants'

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [warningMsg, setWarningMsg] = useState("");

    const navigate = useNavigate();

    const login = () => {

        const url = `${API_URL}/login`;

        axios.post(url, {
            username: username.username,
            password: password.password,
        })
            .then((response) => {
                localStorage.setItem('token', response.data);
                localStorage.setItem('username', username.username);
                navigate('/dashboard');
            })
            .catch((error) => {
                setWarningMsg("Invalid credentials!")
            });

    };

    const register = () => {

        const url = `${API_URL}/login/record`;

        axios.post(url, {
            username: username.username,
            password: password.password,
        })
            .then((response) => {
                setUsername(username);
                setPassword(password);

                const url = `${API_URL}/login`;

                axios.post(url, {
                    username: username.username,
                    password: password.password,
                })
                    .then((response) => {
                        localStorage.setItem('token', response.data);
                        localStorage.setItem('username', username.username);
                        navigate('/dashboard');
                    })
                    .catch((error) => {
                        setWarningMsg("Username exists already!")
                    });
            })
            .catch((error) => {
                setWarningMsg("Invalid credentials!")
            });
    };

    return (
        <div>
            <Form>
                <div className='loginformStyle'>
                    <div>
                        <Form.Group className="mb-3" controlId="username">
                            <Form.Label>Username </Form.Label>
                            <Form.Control type="text"
                                placeholder="username"
                                defaultValue={username}
                                onChange={e => setUsername({ ...username, username: e.target.value })} />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Group className="mb-3" controlId="password">
                            <Form.Label>Password </Form.Label>
                            <Form.Control type="text"
                                placeholder="password"
                                defaultValue={password}
                                onChange={e => setPassword({ ...password, password: e.target.value })} />
                        </Form.Group>
                    </div>
                    <div>
                        <Button onClick={login}>Log in</Button>
                        <Button onClick={register}>Register</Button>
                    </div>
                    <div>
                        <p>
                            {warningMsg}
                        </p>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default Login;
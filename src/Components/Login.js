import '.././App.css';
import { Container, Col, Row, Form } from "react-bootstrap";
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const login = () => {
        console.log(username);
        console.log(password);
        navigate('/dashboard');
    };

    return (
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
                </div>
            </div>
        </Form>
    );
}

export default Login;
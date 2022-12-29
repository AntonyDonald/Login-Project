import React, { useContext, useEffect } from 'react'
import { Button, Container, Form, FormGroup, Row, } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import api from '../api/Api';
import DataContext from '../context/DataContext';

const SignupPage = () => {
    const { getData, setGetData, username, setUserName, password, setPassword, navigate, retypepassword, setRetypePassword } = useContext(DataContext);

    const handleSignup = async () => {
        const filtered = getData.filter((data) => data.name === username)

        if ((username && password) === ""){
            toast.error("UserName  Or Password  Should not be Empty")
        } else {
            if (filtered.length !== 0) {
                // console.log("name already Exist")
                toast.error("name already Exist")
            } else if (password !== retypepassword) {
                toast.error("password mismatch")
            } else {
                const id = getData.length ? getData[getData.length - 1].id + 1 : 1;
                const newUser = { id: id, name: username, password: password }
    
                navigate('/')
                try {
                    const response = await api.post('/user/', newUser)
                    setGetData([...getData, response.data]);
    
                } catch (err) {
                    console.log(err.message)
                }
            }
        }

       
        setUserName("");
        setPassword("");
        setRetypePassword("");
    }

    return (
        <Container>
            <Row className='login_container'>
                <Form>
                    <FormGroup>
                        <Form.Label>New Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Enter Username'
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.Label> New Password</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Enter Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Form.Label> Retype New Password</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Enter Password'
                            value={retypepassword}
                            onChange={(e) => setRetypePassword(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={() => handleSignup()}>Signup</Button>
                        <ToastContainer />
                    </FormGroup>
                </Form>
            </Row>
        </Container>
    )
}

export default SignupPage
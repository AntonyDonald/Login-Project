import React, { useContext} from 'react';
import 'bootstrap/dist/css/bootstrap.css'
import { Container, FormGroup, Row, Form, Button, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import DataContext from '../context/DataContext';

const LoginPage = () => {
    const { getData, username, setUserName, password, setPassword,navigate,setAccess } = useContext(DataContext);
    

    const handleLogin = () => {
        const filtered = getData.filter((data) => (data.name) === username && (data.password) === password)
        
          if(filtered.length){
            const validUser = Object.keys(
                filtered[0]).filter((key) => key !== 'password').reduce((obj, key) => {
                    obj[key] = filtered[0][key];
                    return obj
                }, {})
            localStorage.setItem('loginuser' , JSON.stringify(validUser));
           setAccess(true)
            navigate('/home')

        } else {
            toast.error("Fail")
        }
        setUserName("");
        setPassword("");
    }
    return (
        <Container>
            <Row className='login_container'  >
                <Col lg md xl={6}>
                <Form className='form p-4'>
                    <FormGroup className='mb-2'>
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Enter Username'
                            value={username}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup  className='mb-2'>
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder='Enter Password'
                            value={password }
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup className='text-end'>
                        <Button onClick={() => handleLogin()}>Login</Button>
                        <Link to={'/signup'}>
                            <p>Need an Account ?</p>
                        </Link>
                        <ToastContainer/>
                    </FormGroup>
                </Form>
                </Col>
                <Col lg md xl={6}></Col>
            </Row>
        </Container>
    )
}

export default LoginPage
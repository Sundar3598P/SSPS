import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'

const RegisterScreen = ({ location,history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch =  useDispatch()
    
    const userRegister = useSelector(state => state.userRegister)

    const { loading, userInfo, error } = userRegister

    const redirect = location.search ? location.search.split('=')[1] : '/'
    
    useEffect(() => {
        if(userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        // dispatch
        if(password !== confirmPassword) {
            setMessage('Password do not match')
        }else {
            dispatch(register(name, email, password))
        }
    }


    return (
        <FormContainer>
            <h1>Register Page</h1>
            
            {message && <Message variant='danger'> {message} </Message>}

            {error && <Message variant='danger'> {error} </Message>}   
            {loading && <Loader />} 

            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label> Name</Form.Label>
                    <Form.Control type= 'text' placeHolder= 'Enter Your Name' value={name}
                     onChange={(e) => setName(e.target.value)}>                        
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type= 'email' placeHolder= 'Enter Email Address' value={email}
                     onChange={(e) => setEmail(e.target.value)}>                        
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type= 'password' placeHolder= 'Enter Password' value={password}
                     onChange={(e) => setPassword(e.target.value)}>                        
                    </Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type= 'password' placeHolder= 'Enter Confirm Password' value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}>                        
                    </Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'> Register </Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Already Register?
                    <Link to={redirect ? `/login?redirect=${redirect}`
                                        : '/login'}> Login
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
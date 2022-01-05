import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
// import { getUserDetails } from '../actions/userActions'
// import FormContainer from '../components/FormContainer'
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import { updateUserProfile } from '../actions/userActions'

const ProfileScreen = ({ location,history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch =  useDispatch()
    
    const userDetails = useSelector(state => state.userDetails)

    const { loading, user, error } = userDetails
    
    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)

    const { success } = userUpdateProfile
    
    // checking user is logged in or not
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() => {
        if(!userInfo) {
            history.push('/login')
        } else {
            if (!user || user.name || success){
                // dispatch(getUserDetails('profile'))
                dispatch({ type: USER_UPDATE_PROFILE_RESET })
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
        
    }, [history, userInfo, dispatch, user, success]);

    const submitHandler = (e) => {
        e.preventDefault()
        // dispatch
        if(password !== confirmPassword) {
            setMessage('Password do not match')
        }else {
            // dispatch updateUserProfile
            dispatch(updateUserProfile({ id:user._id,name, email, password}))

            
        }
    }

    

    return (
        <Row>
            <Col md={3}>
            <h2>Profile Update</h2>
            
            {message && <Message variant='danger'> {message} </Message>}

            {error && <Message variant='danger'> {error} </Message>}   
            {success && <Message variant='success'> Profile Updated </Message>}
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

                <Button type='submit' variant='primary'> Update </Button>
            </Form>
            </Col>
            <Col md={9}>
                <h1>My Orders</h1>
            </Col>
        </Row>
    )
}

export default ProfileScreen
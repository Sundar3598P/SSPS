import React, { useEffect} from 'react'
import { useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import {Link} from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import { addToCart, removeFromCart } from '../actions/cartActions'

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1         // Qty = 1 for minum 1 give If elase statement
    console.log(qty)

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const { cartItems } = cart

    useEffect(() => {
        // if product exist in the cart - dispatch
        if (productId) {
            dispatch(addToCart(productId, qty))
        }
    },[dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        // console.log('remove')
        dispatch(removeFromCart(id))
    }


    const checkOutHandler = () => {
        console.log('checkout')
        history.push('/login?redirect=shipping')
    }

    return (
        <Row>
             <h1>Items in Cart</h1>
           <Col md={8}>
              
               {cartItems.length === 0
                ? <Message>
                    Your Cart is Empity
                    <Link to='/'> Go Back</Link>
                </Message>
                : (
                    <ListGroup variant='flish'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product}>
                                <Row>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                    </Col>

                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`}>
                                             {item.name}
                                        </Link>
                                    </Col>

                                    <Col md={2}>
                                        ₹ {item.price}
                                    </Col>

                                    <Col md={2}>
                                        <Form.Control as='select' value={item.qty} onChange={(e) => dispatch(addToCart(item.product,
                                            Number( e.target.value)))}>
                                                {[...Array(item.countInStock).keys()].map((x)=>(
                                                     <option key={x+1} value={x+1}>
                                                     {x+1}
                                                 </option>
                                                ))}
                                        </Form.Control>
                                    </Col>

                                    <Col md={3}>
                                        <Button type='button' variant='light' onClick={() => removeFromCartHandler(item.product)}>
                                        <i class="fas fa-trash-alt"></i>

                                        </Button>
                                    </Col>
                                </Row>

                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                )
               }

           </Col>
           <Col md={4}>
               <Card>
               <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Sub Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)})</h2>
                            ₹ {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
                        </ListGroup.Item>
                        <Button type='button' className='btn-block' disabled={cartItems.length === 0}
                        onClick={checkOutHandler}>
                            Proceed To Checkout
                        </Button>
                    </ListGroup>
               </Card>

           </Col>
        </Row>
    )
}

export default CartScreen

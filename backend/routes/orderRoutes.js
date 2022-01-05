import express from 'express';

const router = express.Router()

import { protect } from '../middleware/authMiddleware.js';
import { addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered} from '../controllers/orderController.js';


router.route('/').post(protect, addOrderItems)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put( protect, updateOrderToPaid)
router.route('/:id/deliver').put( protect, admin, updateOrderToDelivered)


export default router
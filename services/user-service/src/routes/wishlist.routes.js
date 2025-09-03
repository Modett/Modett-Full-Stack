import express from 'express';
import { auth } from '../../middleware/auth.middleware';
import isAdmin from '../../middleware/admin.middleware';
import { wishlistValidationRules } from '../utils/wishlist.validator';

const wishlistRouter=express.Router();


export default wishlistRouter;
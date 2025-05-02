import express from 'express';
import { getMyFriends, getRecommendedUsers } from '../controllers/user.controller.js';
import protectRoute from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protectRoute, getRecommendedUsers);
router.get('/friends', protectRoute, getMyFriends);

export default router;
import express from 'express';
import { 
    getRecommendedUsers,
    getMyFriends,
    sendFriendRequest,
    acceptFriendRequest,
    getFriendRequests,
    getOutgoingFriendRequests,
} from '../controllers/user.controller.js';
import protectRoute from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', protectRoute, getRecommendedUsers);
router.get('/friends', protectRoute, getMyFriends);

router.post('/friend-request/:id', protectRoute, sendFriendRequest);
router.put('/friend-request/:id/accept', protectRoute, acceptFriendRequest);

router.get('/friend-request', protectRoute, getFriendRequests);
router.get('/outgoing-friend-request', protectRoute, getOutgoingFriendRequests);

export default router;
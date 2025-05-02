import User from '../models/user.model.js';
import FriendRequest from '../models/friendRequest.model.js';

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user._id;
    const currentUser = req.user;

    const recommendedUsers = await User.find({
      $and: [
        { _id: { $ne: currentUserId } },
        { $id: { $nin: currentUser.friends } },
        { isOnboarded: true },
      ],
    });
    
    res.status(200).json(recommendedUsers);
  } catch (error) {
    console.log('Error in getRecommendedUsers controller: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user._id)
      .select('friends')
      .populate(
        'friends',
        'fullName profilePic nativeLanguage learningLanguage'
      );

      res.status(200).json(user.friends);
  } catch (error) {
    console.log('Error in getMyFriends controller: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function sendFriendRequest(req, res) {
    try {
        const myId = req.user._id;
        const { id:recipientId } = req.params;

        if (myId === recipientId) {
            return res.status(400).json({ message: 'You cannot send request to yourself' });
        }
        
        const recipient = await User.findById(recipientId);

        if (!recipient) {
            return res.status(400).json({ message: 'Recipient not found' });
        }
        
        if (recipient.friends.includes(myId)) {
            return res.status(400).json({ message: 'You are already friend to this user' });
        }

        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId },
            ],
        });

        if (existingRequest) {
            return res.status(400).json({ message: 'Friend request is already exists between you and this user' });
        }

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        });

        res.status(400).json(friendRequest);
    } catch (error) {
        console.log('Error in sendFriendRequest controller: ', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export async function acceptFriendRequest(req, res) {
    try {
        const { id:requestId } = req.params;
        
        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(400).json({ message: 'Friend request not found' });
        }

        if (friendRequest.recipient.toString() !== req.user._id) {
            return res.status(400).json({ message: 'You are not authorized to accept this request' });
        }

        friendRequest.status = 'accepted';
        await friendRequest.save();

        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient },
        });

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender },
        });

        res.status(200).json({ message: 'Friend request accepted' });
    } catch (error) {
        console.log('Error in acceptFriendRequest controller: ', error);
        res.status(500).json({ message: 'Internal server error' }); 
    }
}

export async function getFriendRequests(req, res) {
  try {
    const incomingRequests = await FriendRequest.find({
      recipient: req.user._id,
      status: 'pending',
    }).populate('sender', 'fullName profilePic nativeLanguage learningLanguage');

    const acceptedRequest = await FriendRequest.find({
      sender: req.user._id,
      status: 'accepted',
    }).populate('recipient', 'fullName profilePic');

    res.status(200).json({ incomingRequests, acceptedRequest });
  } catch (error) {
    console.log('Error in getFriendRequests controller: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export async function getOutgoingFriendRequests(req, res) {
  try {
    const outgoingRequest = await FriendRequest.find({
      sender: req.user._id,
      status: 'pending',
    }).populate('recipient', 'fullName profilePic nativeLanguage, learningLanguage');

    res.status(200).json(outgoingRequest);
  } catch (error) {
    console.log('Error in getOutgoingFriendRequests controller: ', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
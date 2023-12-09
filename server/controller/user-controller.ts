import express from 'express';
import { User } from '../models/user-model';
import { Request, Response, NextFunction } from 'express';
const router = express.Router();

export interface User {
  first_name: string;
  last_name: string;
  email: string;
  gender: string;
  avatar: string;
  domain: string;
  available: boolean;
}

interface CustomRequest extends Request {
  user?: User ;
}

interface CustomResponse extends Response {}

export const addUser = async (req: CustomRequest, res: CustomResponse, next: NextFunction) => {
  try {
    const { first_name, last_name, email, gender, domain,avatar, available } = req.body;

    const existingUser: User | null = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    const newUser = new User({
      first_name,
      last_name,
      email,
      gender,
      avatar,
      domain,
      available,
    });

    // Save the user to the database
    await newUser.save();
    return res.json({ message: 'added successfully' });

  } catch (error) {
    console.error('Error adding user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ message: 'updated successfully' });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ message: 'deleted successfully' });

  } catch (error) {
    console.error('Error deleting user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    return res.json({ message: 'find successfully' });

  } catch (error) {
    console.error('Error getting user:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getFilteredUsers = async (req, res) => {
  try {
    const genderFilter = req.query.gender || [];
    const domainFilter = req.query.domain || [];
    const availabilityFilter = JSON.parse(decodeURIComponent(req.query.presence)) || [];
    ;

    console.log(genderFilter, domainFilter, availabilityFilter);


    const pipeline = [
      {
        $match: {
          gender: { $in: genderFilter },
          domain: { $in: domainFilter },
          available: { $in: availabilityFilter },
        },
      },
    ];

    const filteredUsers = await User.aggregate(pipeline);

    res.json({ data: filteredUsers });
  } catch (error) {
    console.error('Error filtering users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const take = req.query.take;
    const searchQuery = req.query.search;

    if (page < 1) {
      return res.status(400).json({ error: 'Invalid page number' });
    }

    const skip = (page - 1) * take;
    let users =[]

    if(searchQuery.length){
     users = await User.find({$text: {$search:searchQuery}})
    } else{
     users = await User.find()
     .skip(skip)
     .limit(take)
     .lean();
    }

     return res.json({ data: users });

  } catch (error) {
    console.error('Error getting users:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


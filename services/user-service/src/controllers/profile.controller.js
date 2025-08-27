import User from "../models/User.js";

// user
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// user
export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// user
export const deleteProfile = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.user.id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// user
export const updateBio = async (req, res) => {
  try {
    const userId = req.user.id;
    const { bio } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { bio },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "Bio updated successfully",
      bio: updatedUser.bio,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// user
export const getPublicProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("name bio");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      name: user.name,
      bio: user.bio,
      profileImage: user.profileImage,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// admin
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

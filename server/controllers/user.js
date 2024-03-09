import UserData from "../models/UserData.js";

export const addUserData = async (req, res) => {
  try {
    const userId = req.body.userId;
    const userData = req.body.userData;

    const user = await UserData.findOne({ userId: userId });
    console.log(user);
    if (user === null) {
      const newUserData = new UserData({ ...userData, userId });

      newUserData
        .save()
        .then((user) => res.status(200).json(user))
        .catch((err) => console.log(err));
    } else {
      UserData.findOneAndUpdate({ userId: userId }, userData, {
        new: true,
      }).then((user) => {
        res.status(200).json(user);
      });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const getUserData = async (req, res) => {
  try {
    const userId = req.body.id;

    UserData.findOne({ userId })
      .then((data) => res.status(200).json(data))
      .catch((err) => console.log(err));
  } catch (error) {
    res.status(500).json(error);
  }
};

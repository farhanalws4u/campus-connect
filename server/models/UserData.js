import mongoose from "mongoose";
const Schema = mongoose.Schema;
// Create Schema
const UserDataSchema = new Schema({
  bio: {
    type: String,
  },
  photoUrl: {
    type: String,
  },
  facebookLink: {
    type: String,
  },
  whatsappLink: {
    type: String,
  },
  instagramLink: {
    type: String,
  },
  linkedInLink: {
    type: String,
  },
  telegramLink: {
    type: String,
  },
  userId: {
    type: String,
  },
});
const UserData = mongoose.model("userData", UserDataSchema);
export default UserData;

import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const eventModel = Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  registeredUsers: [
    {
      eventNotification: {
        type: String,
        enum: ["YES", "NO", "MAYBE"],
      },
      user: {
        type: Object,
      },
    },
  ],
});

const Event = model("Event", eventModel);
export default Event;

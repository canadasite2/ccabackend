import Event from "../../models/Event.js";
import { ObjectId } from "mongoose";

export const createEvent = async (req, res) => {
  try {
    console.log(req.body);
    const newEvent = await Event.create(req.body);
    res.status(201).json({ success: true, data: newEvent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllEventsForAdmin = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const getAllEventsOfUserRegistered = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);

    const events = await Event.find({
      "registeredUsers.user.userId": userId,
    });

    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().select("-registeredUsers");
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const updateEventById = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req?.params?.id,
      req.body,
      { new: true }
    );
    if (!updatedEvent) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res.status(200).json({ success: true, data: updatedEvent });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteEventById = async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) {
      return res
        .status(404)
        .json({ success: false, message: "Event not found" });
    }
    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
      deletedEventId: deletedEvent._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const registerUserInEvent = async (req, res) => {
  try {
    const { eventId, eventNotification } = req.body;
    const { userId, email } = req;
    const event = await Event.findById({ _id: eventId });

    if (event) {
      const existingUser = event.registeredUsers.find(
        (user) => user.user.userId === userId
      );

      if (existingUser) {
        res.status(400).json({
          success: false,
          message: "already registered for this event",
        });
      } else {
        event.registeredUsers.push({
          eventNotification: eventNotification,
          user: {
            userId: userId,
            email: email,
          },
        });
        event.save();
        res.status(201).json({ success: true, message: "Registered Success" });
      }
    } else {
      res.status(404).json({ success: false, message: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

import Contact from "../../models/ContactUs.js";

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    if (contacts) {
      res.status(200).json({ success: true, contacts });
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching contacts", error });
  }
};
export const addContact = async (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  try {
    const newContact = new Contact({
      firstName,
      lastName,
      email,
      phone,
      message,
    });

    const savedContact = await newContact.save();
    if (savedContact) {
      res.status(201).json({ success: true, message: "Information Saved" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding contact", error });
  }
};
export const deleteContact = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedContact = await Contact.findByIdAndDelete(id);

    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }

    res
      .status(200)
      .json({ success: true, deletedContactId: deletedContact._id });
  } catch (error) {
    res.status(500).json({ message: "Error deleting contact", error });
  }
};

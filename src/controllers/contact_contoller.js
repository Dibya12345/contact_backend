import Contact from "../models/contactModel.js";
import User from "../models/userModel.js";
import CustomError from "../models/CustomError.js";

export const createContact = async (req, res, next) => {
  try {
    const contact = await Contact.create({
      user: req.uid,
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    });
    console.log(contact);
    //connected contacts with the user
    const user = await User.findById(req.uid);

    if (user) {
      console.log(contact);
      const contacts = [...user.contacts, contact];
      console.log(contacts);
      await user.updateOne({ contacts });

      return res.status(201).send({ success: true, contact });
    }
  } catch (err) {
    console.log(err);
    next(new CustomError("Something went wrong", 500));
  }
};

export const findAllContact = async (req, res, next) => {
  try {
    const tut = await Contact.find();

    return res.status(200).send({ success: true, Contact: tut });
  } catch (err) {
    console.log(err);
    next(new CustomError("Something went wrong", 500));
  }
};

export const findOneContact = async (req, res, next) => {
  try {
    const tut = await Contact.findById(req.params.id);

    if (!tut) {
      return next(new CustomError("Contact not found", 404));
    }
    res.send({ success: true, Contact: tut });
  } catch (err) {
    next(new CustomError("Something went wrong", 500));
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { user, name, phone, email } = req.body;
    const editContact = await Contact.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );

    if (!editContact) {
      return next(new CustomError("Contact not found", 404));
    }

    return res.status(200).send({ success: true, Contact: editContact });
  } catch (err) {
    next(new CustomError("Something went wrong", 500));
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return next(new CustomError("contact not found", 404));
    }

    if (contact.user != req.uid) {
      return next(new CustomError("Unauthorized access to delete route", 400));
    }

    await Contact.findByIdAndDelete(req.params.id);
    const user = await User.findById(req.uid);

    if (user) {
      let contacts = user.contacts.filter((tutId) => tutId != req.params.id);
      await user.updateOne({ contacts });
    }

    return res.send({ success: true, Contact });
  } catch (err) {
    console.log(err);
    next(new CustomError("Something went wrong", 500));
  }
};

export default {
  createContact,
  findAllContact,
  findOneContact,
  deleteContact,
  updateContact,
};

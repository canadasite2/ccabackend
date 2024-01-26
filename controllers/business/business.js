import Business from "../../models/Business.js";
import { uploadToCloudinary } from "../../utils/multer.js";

// Create a new business
export const createBusiness = async (req, res) => {
  try {
    let data = { ...req.body, userId: req.userId };

    const newBusiness = await Business.create(data);
    res.status(201).json({ success: true, data: newBusiness });
  } catch (error) {
    console.error("Error creating business:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Get all businesses
export const getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.find();
    res.status(200).json({ success: true, data: businesses });
  } catch (error) {
    console.error("Error fetching businesses:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
export const getAllApprovedBusinesses = async (req, res) => {
  try {
    const approvedBusinesses = await Business.find({
      approvedByAdmin: "approved",
    }).exec();
    return res.status(200).json({ success: true, data: approvedBusinesses });
  } catch (error) {
    console.error("Error fetching approved businesses:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// Get a single business by ID
export const getBusinessById = async (req, res) => {
  try {
    const business = await Business.findById(req.params.id);
    if (business) {
      res.status(200).json({ success: true, data: business });
    } else {
      res.status(404).json({ success: false, error: "Business not found" });
    }
  } catch (error) {
    console.error("Error fetching business by ID:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Update a business by ID
export const updateBusiness = async (req, res) => {
  try {
    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.businessId,
      req.body,
      { new: true }
    );
    if (updatedBusiness) {
      res.status(200).json({ success: true, data: updatedBusiness });
    } else {
      res.status(404).json({ success: false, error: "Business not found" });
    }
  } catch (error) {
    console.error("Error updating business:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

// Delete a business by ID
export const deleteBusiness = async (req, res) => {
  try {
    const deletedBusiness = await Business.findByIdAndDelete(
      req.params.businessId
    );
    if (deletedBusiness) {
      res.status(200).json({
        success: true,
        message: "Business deleted successfully",
        deletedBusinessId: deletedBusiness._id,
      });
    } else {
      res.status(404).json({ success: false, error: "Business not found" });
    }
  } catch (error) {
    console.error("Error deleting business:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
// approve business
export const statusOfBusiness = async (req, res) => {
  try {
    const updatedBusiness = await Business.findByIdAndUpdate(
      req.params.businessId,
      { approvedByAdmin: req.body.status },
      { new: true }
    );

    if (updatedBusiness) {
      res.status(200).json({ success: true, data: updatedBusiness });
    } else {
      res.status(404).json({ success: false, error: "Business not found" });
    }
  } catch (error) {
    console.error("Error updating 'approvedByAdmin' property:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

export const getAllBusinessOfMember = async (req, res) => {
  try {
    const businesses = await Business.find({ userId: req.userId });
    res.status(200).json({ success: true, data: businesses });
  } catch (error) {
    console.error("Error fetching businesses:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};
export const logoUploader = async (req, res) => {
  try {
    if (req.file.path) {
      const filePath = req.file.path;
      const result = await uploadToCloudinary(filePath);
      if (result) {
        res.status(200).json({ success: true, filePath: result.url });
      }
    } else {
      res.status(404).json({ success: false, message: "path not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

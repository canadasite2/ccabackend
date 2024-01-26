import Package from "../../models/Package.js";

// CREATE: Create a new package
export const createPackage = async (req, res) => {
  try {
    const newPackage = await Package.create(req.body);
    if (newPackage) {
      res.status(201).json({ success: true, package: newPackage });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// READ: Get all packages
export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    if (packages) {
      res.status(200).json({ success: true, packages });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// READ: Get a specific package by ID
export const getPackageById = async (req, res) => {
  try {
    const pack = await Package.findById(req.params.packageId);
    if (!pack) {
      res.status(404).json({ success: false, error: "Package not found" });
      return;
    }
    res.status(200).json({ success: true, package: pack });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// UPDATE: Update a specific package by ID
export const updatePackage = async (req, res) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.packageId,
      req.body,
      { new: true }
    );
    if (!updatedPackage) {
      res.status(404).json({ success: false, error: "Package not found" });
      return;
    }
    res.status(200).json({ success: true, updatedPackage });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE: Delete a specific package by ID
export const deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(
      req.params.packageId
    );
    if (!deletedPackage) {
      res.status(404).json({ success: false, error: "Package not found" });
      return;
    }
    res.status(201).json({
      success: true,
      message: "Package deleted",
      packageDeletedId: deletedPackage._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

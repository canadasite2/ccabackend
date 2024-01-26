import Category from "../../models/Blog-category.js";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        error: "Category with the same name already exists",
      });
    }

    const newCategory = new Category({ name });
    const savedCategory = await newCategory.save();

    res.status(201).json({ success: true, category: savedCategory });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const updateCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const existingCategory = await Category.findOne({ name, _id: { $ne: id } });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        error: "Category with the updated name already exists",
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name },
      { new: true }
    );

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ success: false, error: "Category not found" });
    }

    res.status(200).json({ success: true, category: updatedCategory });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(id);
    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, error: "Category not found" });
    }
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      categoryId: deletedCategory._id,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

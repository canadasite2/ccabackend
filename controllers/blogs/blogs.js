import Blogs from "../../models/Blog.js";
import BlogCategory from "../../models/Blog-category.js";
import { uploadToCloudinary } from "../../utils/multer.js";
export const createBlogPost = async (req, res) => {
  try {
    const { title, content, tags, category, publishDate, image } = req.body;

    const newBlogPost = new Blogs({
      title,
      content,
      image,
      tags,
      category,
      publishDate,
    });
    const savedBlogPost = await newBlogPost.save();
    const updateBlogCategoryCount = await BlogCategory.findOneAndUpdate(
      {
        name: category,
      },
      { $inc: { totalBlogs: 1 } },
      { new: true }
    );
    if (updateBlogCategoryCount && savedBlogPost) {
      res.status(200).json({ success: true, data: savedBlogPost });
    }
  } catch (error) {
    res.status(200).json({ success: false, error: error.message });
  }
};

export const getAllBlogPostForAdmin = async (req, res) => {
  try {
    const blogPosts = await Blogs.find();
    return res
      .status(200)
      .json({ success: true, count: blogPosts.length, data: blogPosts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
export const getAllBlogPost = async (req, res) => {
  try {
    const { isPremiumUser } = req.body;
    if (isPremiumUser) {
      const blogPosts = await Blogs.find({ publishDate: { $lt: new Date() } });
      return res
        .status(200)
        .json({ success: true, count: blogPosts.length, data: blogPosts });
    } else {
      const blogPosts = await Blogs.find({
        forPremiumUser: false,
        publishDate: { $lt: new Date() },
      });
      console.log();
      return res
        .status(200)
        .json({ success: true, count: blogPosts.length, data: blogPosts });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getBlogPostById = async (req, res) => {
  const id = req.params.id;

  try {
    const blogPost = await Blogs.findById(id);
    if (!blogPost) {
      return res
        .status(404)
        .json({ success: false, error: "Blog post not found" });
    }
    return res.status(200).json({ success: true, data: blogPost });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const updateBlogPostById = async (req, res) => {
  const id = req.params.id;
  const { title, content, image, tags, category, publishDate } = req.body;

  try {
    const updatedBlogPost = await Blogs.findByIdAndUpdate(
      id,
      { title, content, image, tags, category, publishDate },
      { new: true }
    );
    if (!updatedBlogPost) {
      return res
        .status(404)
        .json({ success: false, error: "Blog post not found" });
    }
    return res.status(200).json({ success: true, data: updatedBlogPost });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteBlogPostById = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedBlogPost = await Blogs.findByIdAndDelete(id);
    if (!deletedBlogPost) {
      return res
        .status(404)
        .json({ success: false, error: "Blog post not found" });
    }
    const updateBlogCategoryCount = await BlogCategory.findOneAndUpdate(
      {
        name: deletedBlogPost.category,
        totalBlogs: { $gte: 1 },
      },
      { $inc: { totalBlogs: -1 } },
      { new: true }
    );
    if (updateBlogCategoryCount && deletedBlogPost) {
      return res
        .status(200)
        .json({ success: true, deleteblogId: deletedBlogPost._id });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const changeBlogAccess = async (req, res) => {
  const { blogId } = req.params;
  const { value } = req.body;

  try {
    const updatedBlogPost = await Blogs.findByIdAndUpdate(
      blogId,
      { forPremiumUser: value },
      { new: true }
    );
    if (!updatedBlogPost) {
      return res
        .status(404)
        .json({ success: false, error: "Blog post not found" });
    }
    return res.status(200).json({ success: true, updatedBlogPost });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const ImageUploader = async (req, res) => {
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

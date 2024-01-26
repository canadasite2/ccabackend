import MediaBlogs from "../../models/MBlog.js";

export const createMBlogPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const newBlogPost = new MediaBlogs({
      title,
      content,
      media: req?.file?.path,
    });
    const savedBlogPost = await newBlogPost.save();
    res.status(200).json({ success: true, data: savedBlogPost });
  } catch (error) {
    res.status(200).json({ success: false, error: error.message });
  }
};

export const getAllMBlogPostForAdmin = async (req, res) => {
  try {
    const blogPosts = await MediaBlogs.find();
    return res
      .status(200)
      .json({ success: true, count: blogPosts.length, data: blogPosts });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};
export const getAllMBlogPost = async (req, res) => {
  try {
    const { isPremiumUser } = req.body;
    if (isPremiumUser) {
      const blogPosts = await MediaBlogs.find();
      return res
        .status(200)
        .json({ success: true, count: blogPosts.length, data: blogPosts });
    } else {
      const blogPosts = await MediaBlogs.find({ forPremiumUser: false });
      return res
        .status(200)
        .json({ success: true, count: blogPosts.length, data: blogPosts });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const getMBlogPostById = async (req, res) => {
  const id = req.params.id;

  try {
    const blogPost = await MediaBlogs.findById(id);
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

export const updateMBlogPostById = async (req, res) => {
  const id = req.params.id;
  const { title, content, media } = req.body;
  let updatedMedia =
    req?.file?.path && req?.file?.path !== "undefined" ? req.file.path : media;

  try {
    const updatedBlogPost = await MediaBlogs.findByIdAndUpdate(
      id,
      { title, content, media: updatedMedia },
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

export const deleteMBlogPostById = async (req, res) => {
  const id = req.params.id;

  try {
    const deletedBlogPost = await MediaBlogs.findByIdAndDelete(id);
    if (!deletedBlogPost) {
      return res
        .status(404)
        .json({ success: false, error: "Blog post not found" });
    }
    return res
      .status(200)
      .json({ success: true, deleteMblogId: deletedBlogPost._id });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export const changeMBlogAccess = async (req, res) => {
  const { blogId } = req.params;
  const { value } = req.body;

  try {
    const updatedBlogPost = await MediaBlogs.findByIdAndUpdate(
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

import Business from "../../models/Business.js";
import Category from "../../models/Category.js";
import Member from "../../models/Member.js";
import Package from "../../models/Package.js";

export const FetchDashboard = async (req, res) => {
  try {
    const businessCount = await Business.countDocuments();
    const categoryCount = await Category.countDocuments();
    const memberCount = await Member.countDocuments();
    const packageCount = await Package.countDocuments();
    const approvedBusinessCount = await Business.countDocuments({
      approvedByAdmin: "approved",
    });
    const rejectedBusinessCount = await Business.countDocuments({
      approvedByAdmin: "rejected",
    });
    const pendingBusinessCount = await Business.countDocuments({
      approvedByAdmin: "pending",
    });

    res.status(200).json({
      businessCount,
      categoryCount,
      memberCount,
      packageCount,
      approvedBusinessCount,
      rejectedBusinessCount,
      pendingBusinessCount,
    });
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

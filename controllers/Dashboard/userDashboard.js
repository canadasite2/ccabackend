import Business from "../../models/Business.js";

export const FetchUserDashboard = async (req, res) => {
  try {
    const businessCount = await Business.countDocuments({ userId: req.userId });

    const approvedBusinessCount = await Business.countDocuments({
      approvedByAdmin: "approved",
      userId: req.userId,
    });
    const rejectedBusinessCount = await Business.countDocuments({
      approvedByAdmin: "rejected",
      userId: req.userId,
    });
    const pendingBusinessCount = await Business.countDocuments({
      approvedByAdmin: "pending",
      userId: req.userId,
    });

    res.status(200).json({
      businessCount,
      approvedBusinessCount,
      rejectedBusinessCount,
      pendingBusinessCount,
    });
  } catch (error) {
    console.error("Error fetching dashboard:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

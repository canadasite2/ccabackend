import mongoose, { model } from "mongoose";
const { Schema } = mongoose;

const memberForm = Schema({
  primaryContact: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    currentAddress: {
      type: String,
    },
    city: {
      type: String,
    },
    postal: {
      type: String,
    },
    territory: {
      type: String,
    },
    cellPhone: {
      type: String,
    },
    homePhone: {
      type: String,
    },
    emailAddress: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  memberInformation: {
    nameOfTheCompany: {
      type: String,
    },
    headOfficeAddress: {
      type: String,
    },
    city: {
      type: String,
    },
    province: {
      type: String,
    },
    postal: {
      type: String,
    },
    telephone: {
      type: String,
    },
    website: {
      type: String,
    },
  },
  additionalInformation: {
    companyType: {
      type: String,
    },
    GST: {
      type: String,
    },
    totalEmployees: {
      type: String,
    },
    companyLogo: {
      type: String,
    },
    scopeOfBusiness: {
      type: String,
    },
    purposeOfMembership: {
      type: String,
    },
  },
  billingInformation: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    currentAddress: {
      type: String,
    },
    city: {
      type: String,
    },
    territory: {
      type: String,
    },
    cellPhone: {
      type: String,
    },
    homePhone: {
      type: String,
    },
    emailAddress: {
      type: String,
    },
  },
  packageInformation: {
    packageId: {
      type: mongoose.Types.ObjectId,
      ref: "package",
    },
    validTillDate: {
      type: Date,
    },
    paymentSuccess: {
      type: Boolean,
      default: false,
    },
  },
  status: {
    type: Boolean,
    default: false,
  },
});

const Member = model("member-details", memberForm);
export default Member;

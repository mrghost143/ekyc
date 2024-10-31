const relationList = [
  { id: "father", value: "father", label: "Father" },
  { id: "mother", value: "mother", label: "Mother" },
  { id: "spouse", value: "spouse", label: "Spouse" },
  { id: "brother", value: "brother", label: "Brother" },
  { id: "sister", value: "sister", label: "Sister" },
  { id: "other", value: "other", label: "Other" },
];

const majorProofList = [
  { value: "aadhaar", label: "Aadhaar Number" },
  { value: "pan", label: "Pan Number" },
  { value: "voting", label: "Voting ID" },
];
const minorProofList = [
  { value: "aadhaar", label: "Aadhaar Number" },
  { value: "pan", label: "Pan Number" },
];
export const SignUpInput = [
  {
    label: "Mobile Number",
    placeholder: "Enter mobile number here",
    name: "phoneNo",
    required: true,
    maxLength: 10,
  },
  {
    label: "Use Referral Code",
    placeholder: "Enter referral code here",
    name: "referralCode",
    required: false,
    maxLength: 12,
  },
];

export const personalRadioOne = [
  {
    label: "Gender",
    name: "gender",
    valueList: [
      { id: "male", value: "male", label: "Male" },
      { id: "female", value: "female", label: "Female" },
    ],
  },
  {
    label: "Marital Status",
    name: "maritalStatus",
    valueList: [
      { id: "single", value: "single", label: "Single" },
      { id: "married", value: "married", label: "Married" },
    ],
  },
  {
    label: "Income Range",
    name: "incomeRange",
    valueList: [
      { id: "Below ₹1 lakh", value: "Below ₹1 lakh", label: "Below ₹1 lakh" },
      { id: "₹1-5 lakhs", value: "₹1-5 lakhs", label: "₹1-5 lakhs" },
      { id: "₹5-10 lakhs", value: "₹5-10 lakhs", label: "₹5-10 lakhs" },
      { id: "₹10-25 lakhs", value: "₹10-25 lakhs", label: "₹10-25 lakhs" },
      {
        id: "More than ₹25 lakhs",
        value: "More than ₹25 lakhs",
        label: "More than ₹25 lakhs",
      },
    ],
  },
  {
    label: "Opt for Demat Debit Pledge Instruction (DDPI)",
    name: "ddpi",
    valueList: [
      { id: "yes", value: "yes", label: "Yes" },
      { id: "no", value: "no", label: "No" },
    ],
  },
];
export const personalSelectTwo = [
  {
    label: "Occupation Type",
    name: "occupation",
    options: [
      { value: "business", label: "Business" },
      { value: "abc", label: "Abc" },
      { value: "xyz", label: "Xyz" },
    ],
  },
  {
    label: "Trading Experience",
    name: "tradingExp",
    options: [
      { value: "new", label: "New" },
      { value: "old", label: "Old" },
    ],
  },
  {
    label: "Account Settlement Frequency",
    name: "accountSettlement",
    options: [
      { value: "quarterly", label: "Quarterly" },
      { value: "weekly", label: "Weekly" },
    ],
  },
];

export const personalRadioTwo = [
  {
    label: "Nominee Details",
    name: "isNominee",
    valueList: [
      { id: "now", value: "now", label: "Add Now" },
      { id: "later", value: "later", label: "Do it later" },
    ],
  },
  {
    label: "Issue Delivery Instruction Slip (DIS) booklet",
    name: "isDDPI",
    valueList: [
      { id: "yes", value: "yes", label: "Yes" },
      { id: "no", value: "no", label: "No" },
    ],
  },
];

const getType = (minor) => {
  if (minor) {
    return minorProofList;
  } else {
    return majorProofList;
  }
};

export const nomineeProofTypeGet = (minor = false) => {
  return {
    label: "Identity Proof Type",
    name: "nomineeIndentityProof",
    options: getType(minor),
  };
};

export const nomineeRelationRadio = {
  label: "Relationship to Nominee",
  name: "nomineeRelation",
  valueList: [
    { id: "nomineeFather", value: "father", label: "Father" },
    { id: "nomineeMother", value: "mother", label: "Mother" },
    { id: "nomineeSpouse", value: "spouse", label: "Spouse" },
    { id: "nomineeBrother", value: "brother", label: "Brother" },
    { id: "nomineeSister", value: "sister", label: "Sister" },
    { id: "nomineeOther", value: "other", label: "Other" },
  ],
};

export const guardianProofTypeOption = {
  label: "Identity Proof Type",
  name: "guardianIndentityProof",
  options: majorProofList,
};

export const guardianRelationRadio = {
  label: "Relationship to Guardian",
  name: "guardianRelation",
  valueList: [
    { id: "guardianFather", value: "father", label: "Father" },
    { id: "guardianMother", value: "mother", label: "Mother" },
    { id: "guardianSpouse", value: "spouse", label: "Spouse" },
    { id: "guardianBrother", value: "brother", label: "Brother" },
    { id: "guardianSister", value: "sister", label: "Sister" },
    { id: "guardianOther", value: "other", label: "Other" },
  ],
};

export const BankDetailsInput = [
  {
    label: "Bank Account Number",
    placeholder: "Enter bank account number",
    name: "bankNumber",
    maxLength: 20,
  },
  {
    label: "IFSC Code",
    placeholder: "Enter IFSC code here",
    name: "ifscCode",
    maxLength: 11,
  },
];

export const bankDetailSelect = [
  {
    label: "Bank Name",
    name: "bankName",
    options: [
      { value: "sbi", label: "SBI" },
      { value: "hdfc", label: "HDFC" },
      { value: "kotak", label: "KOTAK" },
    ],
  },
  {
    label: "Branch Location",
    name: "branchLocation",
    options: [
      { value: "mumbai", label: "Mumbai" },
      { value: "noida", label: "Noida" },
      { value: "thane", label: "Thane" },
    ],
  },
];


export const fnoRadio = {
  name: "fnoType",
  valueList: [
    { id: "bankStatement", label: "Bank Statement (last 6 months)" },
    { id: "itr", label: "ITR (last financial year)" },
    { id: "formSixteen", label: "Form 16 (last financial year)" },
    { id: "salarySlip", label: "Salary Slip (last 3 months)" },
    {
      id: "latestDematAccount",
      label: "Latest Demat account holdings statement",
    },
  ],
};


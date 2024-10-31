import * as yup from "yup";
import { getAge, stringToDOB } from "../shared/utils/common-function";
const validation = {
  number: yup.number(),
  string: yup.string(),
  select: yup.string().required("Please select any one"),
  dob: {
    todayMax: yup
      .string()
      .required("Please enter  DOB")
      .test(
        "Format=DD-MM-YYYY",
        "Please enter Date Format as DD-MM-YYYY",
        (value) => value.length === 8
      )
      .test("ForValidDate", "Please enter valid Date", (value) =>
        value.isValidDateString()
      )
      .test(
        "FutureDate",
        "Future Date is Not Allowed",
        (value) => new Date(stringToDOB(value)).getTime() < new Date().getTime()
      ),
    minor: yup
      .string()
      .required("Please enter  DOB")
      .test(
        "Format=DD-MM-YYYY",
        "Please enter Date Format as DD-MM-YYYY",
        (value) => value.length === 8
      )
      .test("ForValidDate", "Please enter valid Date", (value) =>
        value.isValidDateString()
      )
      .test(
        "FutureDate",
        "Future Date is Not Allowed",
        (value) => new Date(stringToDOB(value)).getTime() < new Date().getTime()
      )
      .test(
        "MinorAge",
        `Minimum age requires is ${18} years`,
        (value) => 18 <= getAge(value)
      ),
  },
  fname: yup.string().required("Please enter First Name"),
  lname: yup.string().required("Please enter Last Name"),

  mobileNumber: yup
    .string()
    .required("Please enter your mobile number")
    .matches(/^[6-9]{1}[0-9]{9}$/, "Please enter valid Mobile Number"),
  email: yup
    .string()
    .required("Please enter email address")
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      "Please enter valid email address"
    ),
  aadhar: yup
    .string()
    .required("Please enter Aadhar Number")
    .matches(/^[*]{8}[0-9]{4}$/, "Please enter last 4 digit of Aadhar Number"),
  pan: yup
    .string()
    .required("Please enter PAN Number")
    .matches(
      /^[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}$/,
      "Please enter valid PAN Number"
    )
    .transform((value) => value.toUpperCase()),
  panWithP: yup
    .string()
    .required("Please enter PAN Number")
    .matches(
      /^[A-Za-z]{3}[Pp]{1}[A-Za-z]{1}[0-9]{4}[A-Za-z]{1}$/,
      "Please enter valid PAN Number"
    )
    .transform((value) => value.toUpperCase()),

  birthCertificateNo: yup
    .string()
    .required("Please enter Birth Certificate.")
    .matches(/^[0-9]*$/, "Please enter valid Birth Certificate")
    .min(6, "Birth Certificate must be minimum 6 letters")
    .max(12, "Birth Certificate must be maximum  12 letters"),
  DL: yup
    .string()
    .required("Please enter DL number")
    .matches(
      /^[A-Za-z]{2}[0-9]{13}$/,
      "Please enter 15 Character valid DL number"
    ),
  voting: yup
    .string()
    .required("Please enter Voter ID Number")
    .matches(
      /^([a-zA-Z]){3}([0-9]){7}?$/,
      "Please enter valid 10 Character Voting ID"
    ),
  pincode: yup
    .string()
    .required("Please enter Pincode")
    .matches(/^(\d{0}|\d{6})$/, "Please enter valid Pincode"),
  boolNotReq: yup.bool().notRequired(),
  stringNotReq: yup.string().notRequired(),
  stringReq: yup.string().required(),
  name: yup.string().required("Please enter Name feild"),
};

export const OTPSchema = yup.object().shape({
  otp1: validation.stringReq,
  otp2: validation.stringReq,
  otp3: validation.stringReq,
  otp4: validation.stringReq,
});

export const LoginFormSchema = yup.object().shape({
  phoneNo: validation.mobileNumber,
  referCode: validation.stringNotReq,
});

export const emailSchema = yup.object().shape({
  email: validation.email,
});

export const personalStageOneSchema = yup.object().shape({
  fatherName: validation.name,
  gender: validation.select,
  maritalStatus: validation.select,
  incomeRange: validation.select,
  ddpi: validation.select,
});

export const personalStageTwoSchema = yup.object().shape({
  occupation: validation.select,
  tradingExp: validation.select,
  isNominee: validation.select,
  isDDPI: validation.select,
});
export const nomineeSchema = yup
  .object()
  .shape({
    nomineeName: validation.name,
    nomineeIndentityProof: validation.select,
    nomineeDob: validation.dob.todayMax,
    percentage: validation.stringReq,
    nomineeRelation: validation.select,
  })
  .when(([value], schema) => {
    if (value?.nomineeIndentityProof === "pan") {
      return schema.shape({
        nomineeIdNumber: validation.pan.test(
          "Same Identity Check",
          "Nominee ID cannot be the same as guardian ID",
          function (value) {
            return value !== this.parent.guardianIdNumber;
          }
        ),
      });
    } else if (value?.nomineeIndentityProof === "aadhaar") {
      return schema.shape({
        nomineeIdNumber: validation.aadhar,
      });
    } else if (value?.nomineeIndentityProof === "voting") {
      return schema.shape({
        nomineeIdNumber: validation.voting,
      });
    }
  })
  .when(([value], schema) => {
    if (value?.nomineeDob?.length === 8 && getAge(value?.nomineeDob) < 18) {
      return schema
        .shape({
          guardianName: validation.name,
          guardianIndentityProof: validation.select,
          guardianDob: validation.dob.minor,
          guardianRelation: validation.select,
        })
        .when(([value], schema) => {
          if (value?.guardianIndentityProof === "pan") {
            return schema.shape({
              guardianIdNumber: validation.pan.test(
                "Same Identity Check",
                "Guardian ID cannot be the same as nominee ID",
                function (value) {
                  return value !== this.parent.nomineeIdNumber;
                }
              ),
            });
          } else if (value?.guardianIndentityProof === "aadhaar") {
            return schema.shape({
              guardianIdNumber: validation.aadhar,
            });
          } else if (value?.guardianIndentityProof === "voting") {
            return schema.shape({
              guardianIdNumber: validation.voting,
            });
          }
        });
    }
  });


export const BankFormSchema = yup.object().shape({
  bankNumber: validation.string
    .required("Please enter Account number")
    .matches(/^[0-9]{8,20}$/, "Please enter valid Account number"),
  ifscCode: validation.string
    .required("Please enter IFSC code")
    .matches(/^[a-zA-Z0-9]{11}$/, "Please enter valid IFSC code"),
});

export const IfscSchema = yup.object().shape({
  bankName: validation.select,
  branchLocation: validation.select,
});

export const fnoSchema =yup.object().shape({
  fnoType: validation.select,
})
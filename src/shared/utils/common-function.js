// export const getAge = (enteredDate) => {
//   // it will accept two types of format yyyy-mm-dd and yyyy/mm/dd

//   // debugger
//   let optimizedBirthday = stringToDOB(enteredDate);
//   //set date based on birthday at 01:00:00 hours GMT+0100 (CET)
//   let myBirthday = new Date(optimizedBirthday);
//   console.log(myBirthday,"myBirthday");
  
//   // set current day on 01:00:00 hours GMT+0100 (CET)
//   let currentDate = new Date().toJSON().slice(0, 10) + " 01:00:00";
//   // calculate age comparing current date and borthday
//   let myAge = ~~((Date.now(currentDate) - myBirthday) / 31557600000);
//   return myAge;
// };



export const getAge = (enteredDate) => {
  // it will accept two types of format yyyy-mm-dd and yyyy/mm/dd

  let optimizedBirthday = stringToDOB(enteredDate);
  if (!optimizedBirthday) {
    return "Invalid date format";
  }
  
  // Parse the birthday into a Date object
  let myBirthday = new Date(optimizedBirthday);
  console.log(myBirthday, "myBirthday");
  
  // Get the current date
  let currentDate = new Date();

  // Calculate the difference in milliseconds
  let ageInMilliseconds = currentDate.getTime() - myBirthday.getTime();
  
  // Convert to years (divide by the number of milliseconds in a year)
  let age = Math.floor(ageInMilliseconds / 31557600000); // 1000 * 60 * 60 * 24 * 365.25

  return age;
};

export const stringToDOB = (string) => {
  // Check if the date is in the format yyyy-mm-dd or yyyy/mm/dd
  if (/\d{4}[-/]\d{2}[-/]\d{2}/.test(string)) {
    return string.replace(/\//g, "-"); // Replace / with - if needed
  }
  
  // If the input is in DDMMYYYY format (length of 8)
  if (string?.length === 8) {
    return (
      string.slice(4, 8) + "-" + string.slice(2, 4) + "-" + string.slice(0, 2)
    );
  } else {
    return ""; // Invalid format
  }
};


// export const stringToDOB = (string) => {
//   if (string?.length === 8) {
//     return (
//       string.slice(4, 8) + "-" + string.slice(2, 4) + "-" + string.slice(0, 2)
//     );
//   } else {
//     return "";
//   }
// };

export const storingData = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const retrievingData = (key) => {
  let data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  } else {
    return false;
  }
};

export const encodeMobile = (mobileNo) => {
  const phoneStr = String(mobileNo);
  return `+91 xxxxxx${phoneStr.slice(-4)}`;
};

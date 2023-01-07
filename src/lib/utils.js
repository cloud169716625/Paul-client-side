import axios from "axios";
import { EditorState, ContentState, convertFromHTML } from "draft-js";
import { browserName, browserVersion } from "react-device-detect";
import moment from "moment";
// import { DateTime as dt } from "luxon";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";

export const getGroupModules = ({ appModules = [], groupModules = [] }) => {
  const groupNames = groupModules?.map((el) => el?.name);
  const filteredModules = appModules?.filter((module) => {
    return !groupNames?.includes(module?.name);
  });
  const filteredModulesFalse = filteredModules.map((module) => {
    return {
      ...module,
      id: null,
      permissionDetail: {
        Create: false,
        View: false,
        Update: false,
        Remove: false,
      },
    };
  });
  const parsedGroupPermissions = groupModules.map((module) => {
    return {
      ...module,
      permissionDetail: JSON.parse(module && module?.permissionDetail),
    };
  });
  const newArray = [...filteredModulesFalse, ...parsedGroupPermissions];
  newArray.sort((a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  return newArray;
};

export const getUserModules = ({ appModules = [], userModules = [] }) => {
  const groupNames = userModules?.map((el) => el?.name);
  const filteredModules = appModules?.filter((module) => {
    return !groupNames?.includes(module?.name);
  });
  const filteredModulesFalse = filteredModules.map((module) => {
    return {
      ...module,
      id: null,
      permissionDetail: {
        Create: false,
        View: false,
        Update: false,
        Remove: false,
      },
    };
  });
  const parsedUserModules = userModules.map((module) => {
    return {
      ...module,
      permissionDetail: JSON.parse(module && module?.permissionDetail),
    };
  });
  const newArray = [...filteredModulesFalse, ...parsedUserModules];
  newArray.sort((a, b) => {
    let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();
    if (fa < fb) {
      return -1;
    }
    if (fa > fb) {
      return 1;
    }
    return 0;
  });
  return newArray;
};

export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

// Convert Image to Base64
export const convertBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload = () => {
      resolve(fileReader.result);
    };

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
};

// Create Image Data from Input type="image"
export const createServerImage = async (file) => {
  const fileName = file?.name;
  const imgData = {};
  if (fileName) {
    const ext = fileName.substr(fileName.lastIndexOf("."));
    const finalName = fileName.substr(0, fileName.indexOf("."));
    let base64image = "";
    try {
      base64image = await convertBase64(file);
      imgData.name = finalName;
      imgData.extension = `${ext}`;
      imgData.data = base64image;
      return imgData;
    } catch (e) {
      return undefined;
    }
  }
};

// Add Server URL Properly
export const addServerUrl = (
  url = "{server_url}/Files/Images/ApplicationUser/Usama.jpeg.jpeg"
) => {
  const truncated = url.substring(url.indexOf("/"), url.length);
  const finalURL = `${process.env.REACT_APP_BASEURL}${truncated}`;
  return finalURL;
};

// Convert URL to File
export const convertUrlToFile = async (imgUrl, fileName) => {
  const imgExt = imgUrl.split(/[#?]/)[0].split(".").pop().trim();
  try {
    const response = await fetch(imgUrl);
    const blob = await response.blob();
    const file = new File([blob], `${fileName}.` + imgExt, {
      type: blob.type,
    });
    return file;
  } catch (e) {
    // console.log(e);
  }
};

// Get Difference between now and date
export const getDifference = (date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const diffInMinutes = Math.round(diff / 60000);
  const diffInHours = Math.round(diffInMinutes / 60);
  const diffInDays = Math.round(diffInHours / 24);
  const diffInWeeks = Math.round(diffInDays / 7);
  const diffInMonths = Math.round(diffInDays / 30);
  const diffInYears = Math.round(diffInDays / 365);
  // console.log(date);
  if (diffInMinutes < 1) {
    return "Just Now";
  }
  if (diffInMinutes < 2) {
    return "1 Minute Ago";
  }
  if (diffInMinutes < 60) {
    return `${diffInMinutes} Minutes Ago`;
  }
  if (diffInHours < 2) {
    return "1 Hour Ago";
  }
  if (diffInHours < 24) {
    return `${diffInHours} Hours Ago`;
  }
  if (diffInDays < 2) {
    return "1 Day Ago";
  }
  if (diffInDays < 7) {
    return `${diffInDays} Days Ago`;
  }
  if (diffInWeeks < 2) {
    return "1 Week Ago";
  }
  if (diffInWeeks < 4) {
    return `${diffInWeeks} Weeks Ago`;
  }
  if (diffInMonths < 2) {
    return "1 Month Ago";
  }
  if (diffInMonths < 12) {
    return `${diffInMonths} Months Ago`;
  }
  if (diffInYears < 2) {
    return "1 Year Ago";
  }
  return `${diffInYears} Years Ago`;
};

// function convertUTCDateToLocalDate(date) {
//   var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

//   var offset = date.getTimezoneOffset() / 60;
//   var hours = date.getHours();

//   newDate.setHours(hours - offset);

//   return newDate;
// }

// export const getTimeDiff = (date) => {
//   const startTime = moment(new Date(date).toLocaleString(), "HH:mm:ss a");

//   const endTime = moment(new Date().toLocaleString(), "HH:mm:ss a");
//   // calculate total duration
//   const duration = moment.duration(endTime.diff(startTime));
//   // duration in hours
//   const hours = parseInt(duration.asHours());
//   const seconds = parseInt(duration.asSeconds());
//   // duration in minutes
//   const minutes = parseInt(duration.asMinutes()) % 60;
//   // const minutes = parseInt(duration.asMinutes());
//   const newHrs = hours === 0 ? "" : hours > 0 ? `${hours} hrs` : `${hours} hr`;
//   const newMins =
//     minutes === 0
//       ? `${seconds} ${seconds === 1 ? "second" : "seconds"}`
//       : minutes > 0
//       ? `${minutes} mins`
//       : `${minutes} min`;
//   let timeDiff = newHrs + " " + newMins;
//   return timeDiff;
// };

export const getTimeDiff = (date) => {
  const startTime = moment.utc(date);

  const endTime = moment.utc(new Date());

  // calculate total duration
  const duration = moment.duration(endTime.diff(startTime));
  // duration in days
  const days = parseInt(duration.asDays());

  // duration in hours
  const hours = parseInt(duration.asHours()) % 24;

  // duration in minutes
  const minutes = parseInt(duration.asMinutes()) % 60;

  const seconds = parseInt(duration.asSeconds());

  const newDays = days === 0 ? "" : days > 0 ? `${days}d` : "";

  const newHrs = hours === 0 ? "" : hours > 0 ? `${hours}h` : "";

  const newMins =
    minutes === 0 ? `${seconds}s` : minutes > 0 ? `${minutes}m` : "";

  let timeDiff = newDays + " " + newHrs + " " + newMins;

  return timeDiff;
};

// Get IP Address Info
export const getIPData = async () => {
  const res = await axios.get("https://geolocation-db.com/json/");
  const { city, state, country_name } = res.data;
  const cityString = city ? `${city}, ` : "";
  const stateString = state ? `${state}, ` : "";
  const countryString = country_name ? `${country_name}` : "";
  return {
    ip: '149.56.205.32', //res.data.IPv4,
    location: 'Montreal, QC CA', //`${cityString}${stateString}${countryString}`,
  };
};

// Get Device Name
export const getDeviceName = () => {
  return `${browserName} ${browserVersion}`;
};

// Convert camelCase to Title Case
export const convertCamelToTitle = (str) => {
  const result = str.replace(/([A-Z])/g, " $1");
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1);
  return finalResult;
};

// Convert HTML to Draft JS
export const convertHTMLToDraftState = (html) => {
  if (html) {
    const blocks = convertFromHTML(html);
    const state = ContentState.createFromBlockArray(
      blocks?.contentBlocks,
      blocks?.entityMap
    );
    return EditorState.createWithContent(state);
  } else {
    return EditorState.createEmpty();
  }
};

export const statusList = (i = "") => {
  let v = [
    {
      name: "Draft",
      bg: "#392F28",
      text: "#FFA800",
    },
    {
      name: "Pending",
      bg: "#392F28",
      text: "#FFA800",
    },
    {
      name: "Paid",
      bg: "#1C3238",
      text: "#0BB783",
    },
    {
      name: "Processing",
      bg: "#1C3238",
      text: "#0BB783",
    },
    {
      name: "Completed",
      bg: "#1C3238",
      text: "#0BB783",
    },
    {
      name: "Accepted",
      bg: "#1C3238",
      text: "#0BB783",
    },
    {
      name: "Cancelled",
      bg: "#3A2434",
      text: "#F64E60",
    },
  ];
  return i !== "" ? v[i] : v;
};

export const getNotificationType = ({ type }) => {
  switch (type) {
    case 0:
      return "New User Registered";
    case 1:
      return "New Ticket Created";
    case 2:
      return "Ticket Updated";
    case 3:
      return "New Order Created";
    case 4:
      return "Order Updated";
    case 5:
      return "New Comment Added on Ticket";
    case 6:
      return "New Reply Added on Ticket Comment";
    case 7:
      return "Category Generated";
    case 8:
      return "Bills";
    default:
      return "";
  }
};

export const getNotificationLink = ({ type }) => {
  switch (type) {
    case 0:
      return "/admin/dashboard/billing/clients/list/show";
    case 1:
      return "/admin/dashboard/support/tickets/list";
    case 2:
      return "/admin/dashboard/support/tickets/list";
    case 3:
      return "/admin/dashboard/support/tickets/list";
    case 4:
      return "/admin/dashboard/billing/orders/your-orders/list";
    case 5:
      return "/admin/dashboard/billing/orders/your-orders/list";
    case 6:
      return "/admin/dashboard/billing/orders/your-orders/list";
    case 7:
      return "/admin/dashboard/support/tickets/list";
    case 8:
      return "/admin/dashboard/support/tickets/list";
    case 9:
      return "#";
    case 10:
      return "#";
    case 11:
      return "/admin/dashboard/billing/invoices/list/show";
    case 12:
      return "/admin/dashboard/billing/invoices/list/show";
    case 13:
      return "#";
    case 14:
      return "#";
    case 15:
      return "/admin/dashboard/knowledge-base/feedback";
    case 16:
      return "/admin/dashboard/knowledge-base/feedback";
    case 17:
      return "/admin/dashboard/knowledge-base/feedback";
    case 18:
      return "/admin/dashboard/billing/products-services/list/show";
    default:
      return "#";
  }
};

export const getNotificationTarget = ({ target }) => {
  switch (target) {
    case 0:
      return "Clients";
    case 1:
      return "Admins";
    default:
      return "";
  }
};

export const groupBy = (objectArray, property) => {
  if (objectArray.length > 0) {
    return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
        acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
    }, {});
  }
};

export const genrateFirstLetterName = (value) => {
  let name = "";
  if (value) {
    let userN = value.split(" ");
    if (userN.length < 2) {
      name = userN[0].charAt(0);
    } else {
      name = userN[0].charAt(0) + userN[1].charAt(0);
    }
    return name;
  }
};

export const exportToExcel = (object) => {
  const fileType = "text/csv;charset=utf-8";
  const fileExtension = ".csv";

  // const json = JSON.stringify(object);
  const ws = XLSX.utils.json_to_sheet(object);

  const wb = {
    Sheets: { data: ws },
    SheetNames: [`data`],
  };

  const excelBuffer = XLSX.write(wb, { bookType: "csv", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(
    data,
    `Report-${moment().format("MM-DD-YYYY [at] HH:mm A")}` + fileExtension
  );
};

// Get Template Variables
export const getTemplateVariables = (templateType) => {
  const variables = {
    EmailConfirmation:
      "[fullName], [company], [address],[userName],[email],[emailVerificationUri]",
    EmailOTP: "[fullName], [company], [address],[otpcode],[userName]",
    General: "[userName],[email],[company],[address],[fullname]",
    Invoice: "[fullName], [company], [address],[invoicelink]",
    Orders: "[fullName], [company], [address],[orderlink]",
    ProductCancellation: "[fullName], [company], [address],[productlink]",
    ProductStatusUpdated: "[fullName], [company], [address],[productlink]",
    ResetPassword:
      "[fullName], [company], [address],[userName],[resetPasswordUri]",
    TicketAssignment: "[fullName], [company], [address],[ticketlink]",
    TicketCreated: "[fullName], [company], [address],[ticketlink]",
    TicketUpdated: "[fullName], [company], [address],[ticketlink]",
  };
  switch (templateType) {
    case 0:
      return variables?.General;
    case 1:
      return variables?.EmailConfirmation;
    case 2:
      return variables?.EmailOTP;
    case 3:
      return variables?.ProductCancellation;
    case 4:
      return variables?.ResetPassword;
    case 5:
      return variables?.TicketUpdated;
    case 7:
      return variables?.TicketAssignment;
    case 8:
      return variables?.Orders;
    case 9:
      return variables?.Invoice;
    case 10:
      return variables?.ProductStatusUpdated;
    default:
      return variables?.General;
  }
};

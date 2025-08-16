const ip: string = "98.86.214.11";

export const SERVER_URL = process.env.SERVER_URL || `http://${ip}:4000`;

export const COMPREFACE_URL = `http://${ip}:8000`;

export const COMPREFACE_API_KEY =
  process.env.COMPREFACE_API_KEY || "364163f2-01b8-4879-99ac-8a00aa628f2e";

//lOCAL CONSTANTS
// const local_ip = "192.168.0.17";
export const LOCAL_COMPREFACE_API_KEY = "f8938c56-8fe3-49f1-9abf-2d54a966c903";
// export const LOCAL_SERVER_URL =
//   process.env.SERVER_URL || `http://${local_ip}:4000`;
// export const LOCAL_COMPREFACE_URL = `http://${local_ip}:8000`;

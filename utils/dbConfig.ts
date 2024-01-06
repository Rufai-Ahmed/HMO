import { connect } from "mongoose";

const URL: string = "mongodb://localhost:27017/HMO";

export const dbConfig = async () => {
  try {
    return await connect(URL)
      .then(() => {
        console.log("DB connected");
      })
      .catch(() => {
        "Error encountered";
      });
  } catch (error) {
    return error;
  }
};

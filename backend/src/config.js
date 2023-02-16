import { config } from "dotenv";

config();

export default {
  port: process.env.SV_PORT || 4000,
};

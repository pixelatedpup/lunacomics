// api/index.js
import app from "../../server/server.js";
import serverless from "serverless-http";

export default serverless(app);

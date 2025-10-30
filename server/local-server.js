// local-server.js
import app from "./server.js";

// Pick port from env or default to 8000
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Server running locally on http://localhost:${PORT}`);
});

import express from "express";

const app = express();

app.listen(4000, () => {
  console.log(`Server is listening on port 3000`);
});

export { app };

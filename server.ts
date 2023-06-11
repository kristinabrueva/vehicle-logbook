import express from "express";
import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
interface MulterRequest extends Request {
  file: any;
}

const app = express();
const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Listening on port ${port}`));

// to show dinamic pages using pug engine
const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// to parse FormData
const upload = multer({ dest: "uploads/" });

let car: { make: string; model: string; badge: string } = {
  make: "",
  model: "",
  badge: "",
};
let fileContent: string[] = [""];

// app.use(express.urlencoded({ extended: true }));

// create a GET route
app.get("/", (req: Request, res: Response) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.get("/upload", async (req: Request, res: Response) => {
  res.render("upload", {
    title: "Uploads",
    car: car,
    logbook: fileContent,
  });
});

app.post("/upload", upload.single("file"), (req: Request, res: Response) => {
  car = req.body;
  try {
    fileContent = fs
      .readFileSync((req as MulterRequest).file.path, "utf8")
      .toString()
      .split("\n");
  } catch (e) {
    return "Could not read the file";
  }
  res.status(200).json(req.body);
});

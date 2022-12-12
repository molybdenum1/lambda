import fs from "fs";

export default function () {
  let data = fs.readFileSync(
    "C:/Users/kozel/proga/courses/lambda/13ip/loc.CSV",
    "utf-8"
  );
  return data.split("\r\n");
}

import fs from "fs";
import { google } from "googleapis";
import inquirer from "inquirer";

const GOOGLE_API_FOLDER_ID = "1nsrQ71wg3uWb6OWH607e0yozyKGMSwqk";

async function uploadFile() {
  try {
    const auth = new google.auth.GoogleAuth({
      keyFile: "./drive-uploader.json",
      scopes: ["https://www.googleapis.com/auth/drive"],
    });

    const driveService = google.drive({
      version: "v3",
      auth,
    });

    const fileMetaData = {
      name: "monkey.jpg",
      parents: [GOOGLE_API_FOLDER_ID],
    };

    const media = {
      mimeType: "image/jpg",
      body: fs.createReadStream("./monkey.jpg"),
    };

    const response = await driveService.files.create({
      resource: fileMetaData,
      media: media,
      field: "id",
    });
    return response.data.id;
  } catch (err) {
    console.log("Upload file error", err);
  }
}

async function consoleUpload() {
  const prompts1 = [
    {
      name: "file_path",
      type: "input",
      message: "Drag and drop or paste your photo ",
    },
  ];
  const { file_path } = await inquirer.prompt(prompts1);
  const file_default_name = file_path.split("/").at(-1);
  const prompts2 = [
    {
      name: "file_name",
      type: "input",
      message: "Enter name or use default",
      default: file_default_name,
    },
  ];
  const { file_name } = await inquirer.prompt(prompts2);

  console.log(file_path + " " + file_name);
}

consoleUpload();
//uploadFile().then(data => console.log(data))

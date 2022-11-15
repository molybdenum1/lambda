const fs = require('fs');
const {google} = require('googleapis');

const GOOGLE_API_ID = '1nsrQ71wg3uWb6OWH607e0yozyKGMSwqk';

async function uploadFiles() {
    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: './drive-uploader.json',
            scopes:  'https://www.googleapis.com/auth/drive'
        })
        const driveService = google.drive({
            version: 'v3',
            auth
        })
        const fileMetadata = {
            name: 'monkey.jpg',
            parent: [GOOGLE_API_ID]
        };
        const media = {
            mimeType: 'image/jpeg',
            body: fs.createReadStream('monkey.jpg'),
            
        };

        const file = await driveService.files.create({
            resource: fileMetadata,
            media: media,
            fields: 'id',
        });
        console.log('File Id:', file.data.id);
        return file.data.id;
    } catch (error) {
        console.log('upload file error', error);
    }
}

uploadFiles().then(data => console.log(data))
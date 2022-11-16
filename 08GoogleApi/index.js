const fs = require('fs')
const { google } = require('googleapis')

const GOOGLE_API_FOLDER_ID = '1nsrQ71wg3uWb6OWH607e0yozyKGMSwqk'

async function uploadFile(){
    try{
        const auth = new google.auth.GoogleAuth({
            keyFile: './drive-uploader.json',
            scopes: ['https://www.googleapis.com/auth/drive']
        })

        const driveService = google.drive({
            version: 'v3',
            auth
        })

        const fileMetaData = {
            'name': 'monkey.jpg',
            'parents': [GOOGLE_API_FOLDER_ID]
        }

        const media = {
            mimeType: 'image/jpg',
            body: fs.createReadStream('./monkey.jpg')
        }

        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
            field: 'id'
        })
        return response.data.id

    }catch(err){
        console.log('Upload file error', err)
    }
}

uploadFile().then(data => console.log(data))
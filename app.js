const Client = require('ssh2-sftp-client');
const fs = require('fs');
const path = require("path")

const config = {
    host: '172.16.102.5',
    username: 'surfline',
    password: 'WeWillFly&01'
};


const sftpClient = new Client("flytxt")

const input_dir = '/home/ftp_user/ftp_input/files'
const processed_dir = '/home/inadmin/cli-scripts/flytext-ftp-client/processed_files'

const dirListing = fs.readdirSync(input_dir, {encoding: 'utf-8'})
const promiseArray = []

sftpClient.connect(config)
    .then(() => {
        for (const file of dirListing) {
            const source_file = path.join(input_dir, file)
            const remote_file = file.includes("Month") ?`Monthly/${file}`:`Daily/${file}`
            promiseArray.push(sftpClient.put(source_file, remote_file))
        }
        return Promise.all(promiseArray)
    }).then(() => {
    return sftpClient.end()
        .then(() =>{
            for (const file of dirListing) {
                const source_file = path.join(input_dir, file)
                const destination_path = path.join(processed_dir, file)
                fs.renameSync(source_file,destination_path)
            }
        })
        .catch(error => {
            console.log(error)
            process.exit(1)
        })
}).catch(error =>{
    console.log(error)
    process.exit(1)
})




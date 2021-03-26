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
dirListing.forEach(file => {
    const source_file = path.join(input_dir, file)
    const remote_file = path.join(file)
    const destination_path = path.join(processed_dir, file)
    sftpClient.connect(config)
        .then(() => {
            return sftpClient.put(source_file, remote_file)
        }).then(() => {
        console.log(`${file} successfully pushed`)
        fs.renameSync(source_file, destination_path)
        return sftpClient.end()
    })


})



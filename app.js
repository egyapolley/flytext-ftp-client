const Client = require('ssh2-sftp-client');
const fs = require('fs');
const path = require("path")

const config = {
    host: '172.16.102.5',
    username: 'surfline',
    password: 'WeWillFly&01'
};

const src = '/home/ftp_user/ftp_input/files'
const processed_dir = '/home/inadmin/cli-scripts/flytext-ftp-client/processed_files'


const dirListing = fs.readdirSync(src, {encoding: 'utf-8'})

async function main() {

    const dst1 = "Daily"
    const dst2 ="Monthly"
    const client = new Client();

    try {
        await client.connect(config);
        client.on('upload', info => {
            console.log(`Listener: Uploaded ${info.source}`);
        });
        await client.uploadDir(src, dst1, /daily/i);
        await client.uploadDir(src,dst2,/monthly/i)
    } finally {
        client.end();
    }


}

if (dirListing.length >0){
    main()
        .then(()=>{
                for (const file of dirListing) {
                    const source_file = path.join(src, file)
                    const destination_path = path.join(processed_dir, file)
                    fs.renameSync(source_file,destination_path)
                }
            }
        )
        .catch(err => {
            console.log(`main error: ${err.message}`);
        });


}

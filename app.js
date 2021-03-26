const Client = require('ftp');
const fs = require('fs');
const path = require("path")

const client = new Client();
const input_dir ='/home/ftp_user/ftp_input/files'
const processed_dir ='/home/inadmin/cli-scripts/flytext-ftp-client/processed_files'

const dirListing =fs.readdirSync(input_dir,{encoding:'utf-8'})
dirListing.forEach(file =>{
    const source_file = path.join(input_dir, file)
    const remote_file= path.join(file)
    const destination_path=path.join(processed_dir,file)

    client.on('ready', function() {
        client.put(source_file, remote_file, function(err) {
            if (err) throw err;
            console.log(`${file} successfully pushed`)
            client.end();
            fs.rename(source_file,destination_path,err1 => {
                if (err1) throw err1
            })
        });
    });

    client.connect({
        host:'172.16.102.5',
        user:'surfline',
        password: 'WeWillFly&01',
        secure: true
    });


})



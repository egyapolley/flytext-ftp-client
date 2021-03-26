const fs = require("fs")

const source='/home/ftp_user/ftp_input/files/custommerInfo_daily240321.txt'
const remote ='/home/inadmin/cli-scripts/flytext-ftp-client/processed_files/custommerInfo_daily240321.txt'

fs.renameSync(source,remote)
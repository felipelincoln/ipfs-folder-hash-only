/**
 * install all node dependencies: `npm install`
 * update `folderName` variable to the folder path
 * run: `node index.js`
 */

const { create, globSource } = require('ipfs-core')

// update this value
const folderName = "folder"

async function main(){
    const ipfs = await create()

    const globSourceOptions = { recursive: true };

    const addOptions = {
      pin: true,
      wrapWithDirectory: true,
      timeout: 10000,
      onlyHash: true,
      shardSplitThreshold: 10000
    };

    const addedFiles = ipfs.addAll(globSource(folderName, "*" , globSourceOptions), addOptions)

    console.log("")
    for await (const file of addedFiles) {
      console.log(`hash ${file.cid} ${folderName}/${file.path}`)
    }
}

main()

const fs = require('fs');
const path = require('path');
const rootPath = path.resolve(__dirname, '../src/page');

const readDir = (url) => {
  const dirInfo = fs.statSync(url);
  console.log(dirInfo);
  if (dirInfo.isDirectory()) {
    const info = fs.readdirSync(url);
    info.map((item) => {
      const location = path.resolve(url, item);
      readDir(location);
    });
  } else {
    console.log(`路径${JSON.stringify(dirInfo)}`);
  }
};

readDir(rootPath);

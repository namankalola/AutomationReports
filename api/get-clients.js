const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const clientsDir = path.join(process.cwd(), 'clients');
  const folders = fs.readdirSync(clientsDir).filter(file => {
    const filePath = path.join(clientsDir, file);
    return fs.statSync(filePath).isDirectory();
  });

  res.status(200).json(folders);
}

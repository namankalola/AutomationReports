const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const { client } = req.query; // Client folder name
  const clientDir = path.join(process.cwd(), 'clients', client);

  if (!fs.existsSync(clientDir)) {
    return res.status(404).json({ error: 'Client not found' });
  }

  const files = fs.readdirSync(clientDir)
    .filter(file => file.endsWith('.html'))
    .map(file => {
      const filePath = path.join(clientDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        modifiedDate: stats.mtime, // Last modified date
      };
    });

  res.status(200).json(files);
}

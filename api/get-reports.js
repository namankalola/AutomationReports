const fs = require('fs');
const path = require('path');

export default function handler(req, res) {
  const reportsDir = path.join(process.cwd(), 'reports');
  const files = fs.readdirSync(reportsDir)
    .filter(file => file.endsWith('.html'))
    .map(file => {
      const filePath = path.join(reportsDir, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        modifiedDate: stats.mtime, // Last modified date
      };
    });

  res.status(200).json(files);
}

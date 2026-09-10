const fs = require('fs');
const glob = require('glob');

glob('src/**/*.jsx', (err, files) => {
  files.forEach(f => {
    let content = fs.readFileSync(f, 'utf8');
    content = content.replace(/bg-gradient-to-[a-z]+ from-sky-[0-9]+[^"']*text-white/g, match => match.replace('text-white', 'text-slate-900'));
    content = content.replace(/bg-sky-[0-9]+[^"']*text-white/g, match => match.replace('text-white', 'text-slate-900'));
    fs.writeFileSync(f, content);
  });
});

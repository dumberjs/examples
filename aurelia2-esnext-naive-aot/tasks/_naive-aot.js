const {Transform} = require('stream');
const fs = require('fs');
const modifyCode = require('modify-code');

function fileExists(path) {
  try {
    const stats = fs.statSync(path);
    return stats.isFile();
  } catch (e) {
    return false;
  }
}

// for aurelia vnext
// if some.js is paired with some.html,
// inject @customElement for it
module.exports = function() {
  return new Transform({
    objectMode: true,
    transform: function(file, enc, cb) {
      if (file.isBuffer() &&
          file.extname === '.js' &&
          fileExists(file.path.slice(0, -3) + '.html')) {
        const code = file.contents.toString();
        if (!code.includes('@customElement')) {
          const idx = code.indexOf('export class');
          if (idx !== -1) {
            const m = modifyCode(code);
            const mod = file.basename.slice(0, -3);
            m.prepend(`import { customElement } from '@aurelia/runtime';\nimport template from './${mod}.html';\n`);
            m.insert(idx, `@customElement({ name: '${mod}', template })\n`);
            const r = m.transform();
            file.contents = Buffer.from(r.code);
            file.sourceMap = r.map;
          }
        }
      }

      cb(null, file);
    }
  });
}

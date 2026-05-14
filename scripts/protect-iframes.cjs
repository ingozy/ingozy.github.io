const fs = require('fs');
const path = require('path');
const { minify } = require('terser');

const antiDebugScript = `
(function(){try{
  document.addEventListener('contextmenu',function(e){e.preventDefault();});
  document.addEventListener('keydown',function(e){
    if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&(e.key==='I'||e.key==='J'))||(e.ctrlKey&&e.key==='U')){e.preventDefault();}
  });
  setInterval(function(){
    if(window.outerHeight-window.innerHeight>160||window.outerWidth-window.innerWidth>160){document.body.innerHTML='';}
  },1000);
}catch(e){}})();
`;

const copyrightWatermark =
  '© 2025 ingozhou. All rights reserved. Unauthorized commercial use is prohibited.';

async function obfuscateHtmlFile(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');
  const originalSize = Buffer.byteLength(html, 'utf8');

  // 1. Inject anti-debug after <head>
  const headMatch = html.match(/<head[^>]*>/i);
  if (headMatch) {
    const idx = headMatch.index + headMatch[0].length;
    html = html.slice(0, idx) + '\n<script>' + antiDebugScript + '</script>' + html.slice(idx);
  }

  // 2. Add copyright comment after DOCTYPE
  if (!html.includes('© 2025 ingozhou')) {
    const doctypeMatch = html.match(/<!DOCTYPE[^>]*>/i);
    if (doctypeMatch) {
      const after = doctypeMatch.index + doctypeMatch[0].length;
      html =
        html.slice(0, after) +
        '\n<!--\n  ' +
        copyrightWatermark +
        '\n  Source: github.com/ingozhou66\n-->' +
        html.slice(after);
    }
  }

  // 3. Minify inline <script> tags with terser (safe, handles eval correctly)
  const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let lastIndex = 0;
  let result = '';

  while ((match = scriptRegex.exec(html)) !== null) {
    result += html.slice(lastIndex, match.index);

    const fullMatch = match[0];
    const jsCode = match[1];

    if (jsCode.trim().length < 50) {
      result += fullMatch;
      lastIndex = scriptRegex.lastIndex;
      continue;
    }

    const tagOpen = fullMatch.substring(0, fullMatch.indexOf('>') + 1);
    if (/\bsrc\s*=/.test(tagOpen)) {
      result += fullMatch;
      lastIndex = scriptRegex.lastIndex;
      continue;
    }

    try {
      const minified = await minify(jsCode, {
        compress: {
          drop_console: false,
          drop_debugger: true,
          passes: 2,
        },
        mangle: {
          properties: false,
          toplevel: false,
        },
        format: {
          comments: false,
        },
      });

      if (!minified.code) {
        throw new Error('Terser returned empty code');
      }

      const codeStart = fullMatch.indexOf(jsCode);
      const beforeCode = fullMatch.substring(0, codeStart);
      const afterCode = fullMatch.substring(codeStart + jsCode.length);
      result += beforeCode + '\n' + minified.code + '\n' + afterCode;
    } catch (err) {
      console.warn(`Warning: could not minify script in ${path.basename(filePath)}: ${err.message}`);
      result += fullMatch;
    }

    lastIndex = scriptRegex.lastIndex;
  }

  result += html.slice(lastIndex);
  fs.writeFileSync(filePath, result);

  const newSize = Buffer.byteLength(result, 'utf8');
  console.log(
    `✓ Protected: ${path.basename(filePath)} (${(originalSize / 1024).toFixed(1)}KB → ${(newSize / 1024).toFixed(1)}KB, ${((newSize / originalSize) * 100).toFixed(1)}%)`
  );
}

(async () => {
  const files = [
    path.join(__dirname, '../public/projects/01-家庭财务中枢.html'),
    path.join(__dirname, '../public/projects/03-持仓管理器.html'),
  ];

  for (const file of files) {
    await obfuscateHtmlFile(file);
  }
  console.log('Done.');
})();

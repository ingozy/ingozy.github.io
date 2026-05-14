const fs = require('fs');
const path = require('path');

const antiDebugScript = `(function(){try{document.addEventListener('contextmenu',function(e){e.preventDefault();});document.addEventListener('keydown',function(e){if(e.key==='F12'||(e.ctrlKey&&e.shiftKey&&(e.key==='I'||e.key==='J'))||(e.ctrlKey&&e.key==='U')){e.preventDefault();}});}catch(e){}})();`;

const copyrightNote = '<!--\n  © 2025 ingozhou. 保留所有权利.\n  未经授权,禁止用于商业用途。\n  Source: github.com/ingo-zhou\n-->';

function protect(filePath) {
  let html = fs.readFileSync(filePath, 'utf8');

  // Add anti-debug after <head>
  if (!html.includes("contextmenu")) {
    const headMatch = html.match(/<head[^>]*>/i);
    if (headMatch) {
      const idx = headMatch.index + headMatch[0].length;
      html = html.slice(0, idx) + '\n<script>' + antiDebugScript + '</script>' + html.slice(idx);
    }
  }

  // Add copyright after DOCTYPE if not present
  if (!html.includes('© 2025 ingozhou')) {
    const doctypeMatch = html.match(/<!DOCTYPE[^>]*>/i);
    if (doctypeMatch) {
      const after = doctypeMatch.index + doctypeMatch[0].length;
      html = html.slice(0, after) + '\n' + copyrightNote + html.slice(after);
    }
  }

  fs.writeFileSync(filePath, html);
  console.log('✓ Protected:', path.basename(filePath));
}

[
  path.join(__dirname, '../public/projects/01-家庭财务中枢.html'),
  path.join(__dirname, '../public/projects/03-持仓管理器.html'),
].forEach(protect);

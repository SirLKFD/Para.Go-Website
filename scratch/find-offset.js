import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const assetsDir = path.join(projectRoot, 'assets');
const backupDir = path.join(projectRoot, 'assets_backup');
const scratchDir = path.join(projectRoot, 'scratch');

function findBytes(filePath, targetBytes) {
  if (!fs.existsSync(filePath)) return 'File not found';
  const buffer = fs.readFileSync(filePath);
  const offsets = [];
  
  for (let i = 0; i <= buffer.length - targetBytes.length; i++) {
    let match = true;
    for (let j = 0; j < targetBytes.length; j++) {
      if (buffer[i + j] !== targetBytes[j]) {
        match = false;
        break;
      }
    }
    if (match) offsets.push(i);
  }
  return offsets;
}

// 1364299314 in decimal is 0x51525332.
// In little-endian, the bytes would be: 32 53 52 51
// In big-endian, the bytes would be: 51 52 53 32
const targetLE = [0x32, 0x53, 0x52, 0x51];
const targetBE = [0x51, 0x52, 0x53, 0x32];

const results = [];
results.push(`Jeepney (Backup) LE offsets: ${findBytes(path.join(backupDir, 'Jeepney_Model.stl'), targetLE)}`);
results.push(`Jeepney (Backup) BE offsets: ${findBytes(path.join(backupDir, 'Jeepney_Model.stl'), targetBE)}`);
results.push(`Jeepney (Public) LE offsets: ${findBytes(path.join(assetsDir, 'Jeepney_Model.stl'), targetLE)}`);
results.push(`Jeepney (Public) BE offsets: ${findBytes(path.join(assetsDir, 'Jeepney_Model.stl'), targetBE)}`);

fs.writeFileSync(path.join(scratchDir, 'find_offsets.txt'), results.join('\n'));
console.log('Offsets search complete. Output written to scratch/find_offsets.txt');

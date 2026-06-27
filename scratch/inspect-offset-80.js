import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');
const assetsDir = path.join(projectRoot, 'assets');
const backupDir = path.join(projectRoot, 'assets_backup');
const scratchDir = path.join(projectRoot, 'scratch');

function inspectOffset80(filePath) {
  if (!fs.existsSync(filePath)) return 'File not found';
  const buffer = fs.readFileSync(filePath);
  if (buffer.length < 84) return 'File too small';
  const slice = buffer.slice(80, 84);
  const hex = Array.from(slice).map(b => b.toString(16).padStart(2, '0')).join(' ');
  const value = slice.readUInt32LE(0);
  const valueBE = slice.readUInt32BE(0);
  return `Hex: ${hex} | LE Val: ${value} | BE Val: ${valueBE}`;
}

const results = [];
results.push(`Jeepney (Backup) offset 80: ${inspectOffset80(path.join(backupDir, 'Jeepney_Model.stl'))}`);
results.push(`Jeepney (Public) offset 80: ${inspectOffset80(path.join(assetsDir, 'Jeepney_Model.stl'))}`);
results.push(`Module (Backup) offset 80:  ${inspectOffset80(path.join(backupDir, 'Unit_Prototype.stl'))}`);
results.push(`Module (Public) offset 80:  ${inspectOffset80(path.join(assetsDir, 'Unit_Prototype.stl'))}`);

fs.writeFileSync(path.join(scratchDir, 'offset_80.txt'), results.join('\n'));
console.log('Inspection complete. Output written to scratch/offset_80.txt');

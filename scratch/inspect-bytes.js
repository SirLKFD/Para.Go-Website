import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');
const assetsDir = path.join(projectRoot, 'assets');
const backupDir = path.join(projectRoot, 'assets_backup');
const scratchDir = path.join(projectRoot, 'scratch');

if (!fs.existsSync(scratchDir)) {
  fs.mkdirSync(scratchDir, { recursive: true });
}

const inspectFile = (filePath) => {
  if (!fs.existsSync(filePath)) return 'File not found';
  const fd = fs.openSync(filePath, 'r');
  const buffer = Buffer.alloc(30);
  fs.readSync(fd, buffer, 0, 30, 0);
  fs.closeSync(fd);
  return Array.from(buffer).map(b => b.toString(16).padStart(2, '0')).join(' ');
};

const results = [];
results.push(`Backup Unit_Prototype: ${inspectFile(path.join(backupDir, 'Unit_Prototype.stl'))}`);
results.push(`Public Unit_Prototype: ${inspectFile(path.join(assetsDir, 'Unit_Prototype.stl'))}`);
results.push(`Backup Jeepney_Model:  ${inspectFile(path.join(backupDir, 'Jeepney_Model.stl'))}`);
results.push(`Public Jeepney_Model:  ${inspectFile(path.join(assetsDir, 'Jeepney_Model.stl'))}`);

fs.writeFileSync(path.join(scratchDir, 'inspect.txt'), results.join('\n'));
console.log('Inspection complete. Output written to scratch/inspect.txt');

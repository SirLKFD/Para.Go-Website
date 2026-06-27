import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scratchDir = path.join(__dirname, '..', 'scratch');

async function checkLive() {
  const urls = [
    'https://parago.top/Unit_Prototype.stl',
    'https://parago.top/Jeepney_Model.stl'
  ];

  const results = [];

  for (const url of urls) {
    try {
      const res = await fetch(url);
      const arrayBuffer = await res.arrayBuffer();
      const bytes = new Uint8Array(arrayBuffer.slice(0, 30));
      const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(' ');
      results.push(`URL: ${url}`);
      results.push(`Status: ${res.status}`);
      results.push(`Length: ${arrayBuffer.byteLength}`);
      results.push(`Hex: ${hex}`);
      results.push('');
    } catch (e) {
      results.push(`URL: ${url} failed: ${e.message}`);
      results.push('');
    }
  }

  fs.writeFileSync(path.join(scratchDir, 'live_inspect.txt'), results.join('\n'));
  console.log('Inspection complete. Output written to scratch/live_inspect.txt');
}

checkLive();

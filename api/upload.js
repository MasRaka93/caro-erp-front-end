import formidable from 'formidable';
import { readFile } from 'fs/promises';
import * as XLSX from 'xlsx';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Metode tidak diizinkan' });
  }

  const form = new formidable.IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, fields, files) => {
    if (err || !files.file) {
      return res.status(400).json({ error: 'Gagal mengunggah file.' });
    }

    try {
      const filePath = files.file[0].filepath;
      const buffer = await readFile(filePath);
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

      // Buang header jika perlu, atau gunakan sesuai struktur template
      const headers = jsonData[0];
      const data = jsonData.slice(1).map(row => {
        const obj = {};
        headers.forEach((key, i) => {
          obj[key] = row[i] || '';
        });
        return obj;
      });

      return res.status(200).json(data);
    } catch (error) {
      console.error('Kesalahan saat membaca file:', error);
      return res.status(500).json({ error: 'Gagal memproses file Excel.' });
    }
  });
}
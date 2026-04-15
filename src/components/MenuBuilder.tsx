import { useState } from 'react';
import QRCode from 'qrcode';
import { PDFDocument } from 'pdf-lib';
import { studioApi } from '../lib/studioApi';

export default function MenuBuilder() {
  const [name, setName] = useState('North Table Bistro');
  const [categories, setCategories] = useState('Starters, Main Dishes, Drinks');
  const [allergens, setAllergens] = useState('Contains dairy, nuts');

  const exportMenu = async () => {
    const menuPath = `${name.toLowerCase().replaceAll(' ', '-')}-menu.html`;
    const qr = await QRCode.toDataURL(`https://local.menu/${menuPath}`);
    const html = `<html><body><h1>${name}</h1><p>Categories: ${categories}</p><p>Allergens: ${allergens}</p><img src="${qr}" /></body></html>`;
    await studioApi.exportFile({ filename: menuPath, content: html });

    const pdf = await PDFDocument.create();
    pdf.addPage([595, 842]);
    const bytes = await pdf.save();
    await studioApi.exportFile({ filename: `${name}-menu.pdf`, content: bytes });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <section className="panel space-y-3">
        <h2 className="text-lg font-semibold">QR Menu Builder</h2>
        <input className="w-full rounded bg-slate-800 p-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="Restaurant" />
        <textarea className="w-full rounded bg-slate-800 p-2" value={categories} onChange={(e) => setCategories(e.target.value)} placeholder="Food categories" />
        <textarea className="w-full rounded bg-slate-800 p-2" value={allergens} onChange={(e) => setAllergens(e.target.value)} placeholder="Allergens" />
        <button className="rounded bg-emerald-500 px-3 py-2 font-semibold text-slate-950" onClick={exportMenu}>Export HTML / QR / PDF</button>
      </section>
      <section className="panel">
        <h3 className="mb-3 font-semibold">Table QR generation</h3>
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 15 }).map((_, i) => (
            <div key={i} className="rounded bg-slate-800 p-2 text-center text-xs">Table {i + 1}</div>
          ))}
        </div>
      </section>
    </div>
  );
}

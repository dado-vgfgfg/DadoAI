import { useEffect, useRef, useState } from 'react';
import { Canvas, Rect, Textbox } from 'fabric';
import QRCode from 'qrcode';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { studioApi } from '../lib/studioApi';

export default function LoyaltyBuilder() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [businessName, setBusinessName] = useState('Moonlight Coffee');
  const [rewardPoints, setRewardPoints] = useState(8);
  const [joinUrl, setJoinUrl] = useState('https://example.com/join');

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = new Canvas(canvasRef.current, { width: 520, height: 290, backgroundColor: '#0f172a' });
    canvas.add(
      new Rect({ left: 10, top: 10, width: 500, height: 270, rx: 24, ry: 24, fill: '#1e293b', stroke: '#22d3ee', strokeWidth: 2 }),
      new Textbox('Drag & drop card elements', { left: 30, top: 25, width: 260, fill: '#e2e8f0', fontSize: 22 }),
      new Textbox('Wallet style preview', { left: 30, top: 80, width: 260, fill: '#94a3b8', fontSize: 16 })
    );

    return () => canvas.dispose();
  }, []);

  const exportCard = async () => {
    const qrData = await QRCode.toDataURL(joinUrl);
    const html = `<html><body><h1>${businessName}</h1><p>Reward points: ${rewardPoints}</p><img src="${qrData}"/></body></html>`;
    await studioApi.exportFile({ filename: `${businessName}-loyalty.html`, content: html });

    const pdf = await PDFDocument.create();
    const page = pdf.addPage([420, 220]);
    const font = await pdf.embedFont(StandardFonts.HelveticaBold);
    page.drawText(`${businessName} Loyalty Card`, { x: 20, y: 185, size: 20, font, color: rgb(0.2, 0.8, 0.9) });
    page.drawText(`Reward points: ${rewardPoints}`, { x: 20, y: 150, size: 14 });
    const bytes = await pdf.save();
    await studioApi.exportFile({ filename: `${businessName}-loyalty.pdf`, content: bytes });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <section className="panel space-y-3">
        <h2 className="text-lg font-semibold">Loyalty Card Builder</h2>
        <input className="w-full rounded bg-slate-800 p-2" value={businessName} onChange={(e) => setBusinessName(e.target.value)} placeholder="Business" />
        <input className="w-full rounded bg-slate-800 p-2" type="number" value={rewardPoints} onChange={(e) => setRewardPoints(Number(e.target.value))} />
        <input className="w-full rounded bg-slate-800 p-2" value={joinUrl} onChange={(e) => setJoinUrl(e.target.value)} placeholder="QR Join URL" />
        <textarea className="h-24 w-full rounded bg-slate-800 p-2" defaultValue="Mini customer page copy" />
        <button className="rounded bg-cyan-500 px-3 py-2 font-semibold text-slate-950" onClick={exportCard}>Export HTML / PDF</button>
      </section>
      <section className="panel">
        <canvas ref={canvasRef} />
      </section>
    </div>
  );
}

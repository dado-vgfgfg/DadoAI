import { useState } from 'react';
import QRCode from 'qrcode';
import { studioApi } from '../lib/studioApi';

export default function InvitationBuilder() {
  const [title, setTitle] = useState('Ava & Liam Wedding');
  const [date, setDate] = useState('2026-08-10T18:00');
  const [map, setMap] = useState('https://maps.google.com');
  const [whatsapp, setWhatsapp] = useState('https://wa.me/11234567890');

  const exportInvitation = async () => {
    const qr = await QRCode.toDataURL(whatsapp);
    const html = `<!doctype html><html><body><h1>${title}</h1><p>Date: ${new Date(date).toLocaleString()}</p><p><a href="${map}">Map</a></p><p><a href="${whatsapp}">RSVP WhatsApp</a></p><img src="${qr}"><script>const target=new Date('${date}');setInterval(()=>{document.getElementById('c').innerText=Math.max(0,target-new Date())},1000)</script><div id="c"></div></body></html>`;
    await studioApi.exportFile({ filename: `${title}-invite.html`, content: html });
  };

  return (
    <div className="grid gap-4 lg:grid-cols-[360px_1fr]">
      <section className="panel space-y-3">
        <h2 className="text-lg font-semibold">Online Invitation Builder</h2>
        <input className="w-full rounded bg-slate-800 p-2" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="w-full rounded bg-slate-800 p-2" type="datetime-local" value={date} onChange={(e) => setDate(e.target.value)} />
        <input className="w-full rounded bg-slate-800 p-2" value={map} onChange={(e) => setMap(e.target.value)} placeholder="Map URL" />
        <input className="w-full rounded bg-slate-800 p-2" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="RSVP WhatsApp URL" />
        <button className="rounded bg-fuchsia-500 px-3 py-2 font-semibold" onClick={exportInvitation}>Export Story + HTML Page</button>
      </section>
      <section className="panel">
        <h3 className="mb-2 font-semibold">Template Presets</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {['Classic Floral', 'Modern Neon', 'Minimal White', 'Boho Sunset'].map((template) => (
            <button key={template} className="rounded-lg border border-slate-700 p-3 text-left hover:bg-slate-800">{template}</button>
          ))}
        </div>
      </section>
    </div>
  );
}

// Komponen pendukung FT-06: Menampilkan konfirmasi tautan WhatsApp siap kirim beserta opsi buka ulang dan salin pesan.

import { Check, CheckCircle2, Copy, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface PanelKonfirmasiWaProps {
  url: string;
  pesan: string;
}

export function PanelKonfirmasiWa({ url, pesan }: PanelKonfirmasiWaProps) {
  const [tersalin, setTersalin] = useState(false);

  async function handleSalinPesan() {
    try {
      await navigator.clipboard.writeText(pesan);
      setTersalin(true);
      window.setTimeout(() => setTersalin(false), 2500);
    } catch {
      setTersalin(false);
    }
  }

  return (
    <section
      role="status"
      aria-live="polite"
      className="space-y-4 rounded-2xl bg-emerald-50 p-6 text-emerald-800"
    >
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
        <div className="space-y-1">
          <h2 className="text-base font-semibold">
            Pesanan siap dikirim ke WhatsApp
          </h2>
          <p className="text-sm">
            Jika WhatsApp belum terbuka otomatis, gunakan tombol di bawah atau salin pesan pesanan Anda.
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 motion-reduce:transition-none"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          <span className="whitespace-nowrap">Buka WhatsApp</span>
        </a>

        <button
          type="button"
          onClick={handleSalinPesan}
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 transition-colors duration-150 ease-out hover:bg-neutral-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 motion-reduce:transition-none"
        >
          {tersalin ? (
            <>
              <Check className="h-4 w-4 shrink-0 text-emerald-800" />
              <span className="whitespace-nowrap">Pesan Tersalin</span>
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 shrink-0" />
              <span className="whitespace-nowrap">Salin Pesan</span>
            </>
          )}
        </button>
      </div>
    </section>
  );
}

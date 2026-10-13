"use client";

import { useState } from "react";
import { Check, Mail } from "lucide-react";
import { checkout as ck, freeAccess as fa } from "@/lib/data";
import { Modal } from "./Modal";
import { WhatsApp } from "./WhatsAppIcon";

// Opened from "Share" in the payment card: hands the payment link to a parent or guardian.
export function SharePaymentLink({ onClose }: { onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const msg = `Please complete my ₹${fa.price} Catalyst seat booking: ${ck.shareLink}`;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(ck.shareLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* clipboard blocked — the link is visible to copy by hand */ }
  };

  return (
    <Modal label="Share payment link" onClose={onClose} className="max-w-[405px] shadow-[0_24px_60px_rgba(15,15,30,.28)]"
      overlayClassName="p-4 !bg-black/40 !backdrop-blur-[2px]"
      closeClassName="bg-transparent text-dim hover:bg-bg hover:text-ink">
      <div className="px-6 pb-6 pt-5">
        <h2 className="text-[16px] font-bold">Share payment link</h2>
        <div className="-mx-6 mt-4 border-t border-line" />

        <p className="mt-4 text-[13.5px] text-muted">Share this link with your parent or guardian</p>

        <div className="mt-3 flex gap-2.5">
          <input readOnly value={ck.shareLink}
            className="min-w-0 flex-1 truncate rounded-xl border border-line bg-white px-3.5 py-2.5 text-[13px] text-muted outline-none" />
          <button type="button" onClick={copy}
            className="flex shrink-0 items-center gap-1.5 rounded-xl bg-[#0F172A] px-4 py-2.5 text-[13.5px] font-bold text-white transition hover:bg-black">
            {copied ? <><Check className="size-4" /> Copied</> : "Copy"}
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <a href={`https://wa.me/?text=${encodeURIComponent(msg)}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl border border-line bg-white py-3 text-[13.5px] font-semibold transition hover:bg-bg">
            <WhatsApp className="size-[18px] text-[#25D366]" /> WhatsApp
          </a>
          <a href={`mailto:?subject=${encodeURIComponent("Catalyst seat booking")}&body=${encodeURIComponent(msg)}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-line bg-white py-3 text-[13.5px] font-semibold transition hover:bg-bg">
            <Mail className="size-[18px] text-dim" /> Email
          </a>
        </div>
      </div>
    </Modal>
  );
}

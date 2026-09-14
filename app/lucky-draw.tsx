"use client";

import { useEffect, useRef, useState } from "react";

// Reject the incomplete group so all ten outcomes have equal probability.
function winsDraw() {
  const value = new Uint8Array(1);
  do { crypto.getRandomValues(value); } while (value[0] >= 250);
  return value[0] % 10 === 0;
}

export default function LuckyDraw() {
  const dialog = useRef<HTMLDialogElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const busy = useRef(false);
  const [stage, setStage] = useState<"ready" | "drawing" | "won" | "lost">("ready");
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function draw() {
    if (busy.current || stage === "won") return;
    busy.current = true;
    setStage("drawing");
    const won = winsDraw();
    timer.current = setTimeout(() => {
      setStage(won ? "won" : "lost");
      busy.current = false;
      timer.current = null;
    }, 1100);
  }

  async function copyCoupon() {
    try {
      await navigator.clipboard.writeText("ISLE90");
      setCopied(true);
      setCopyError(false);
    } catch { setCopyError(true); }
  }

  return <>
    <button className="lucky-launch" onClick={() => dialog.current?.showModal()} aria-haspopup="dialog" aria-controls="lucky-dialog"><span aria-hidden="true">✧</span><span>優惠抽獎<small>10% 機率贏九折</small></span></button>
    <dialog ref={dialog} id="lucky-dialog" className="lucky-dialog" aria-labelledby="lucky-title" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="lucky-content">
        <button className="close" aria-label="關閉抽獎視窗" onClick={() => dialog.current?.close()}>✕</button>
        <div className="eyebrow">A LITTLE ISLAND LUCK</div>
        <div className={`lucky-gift ${stage === "drawing" ? "is-drawing" : ""}`} aria-hidden="true">{stage === "won" ? "✦" : "🎁"}</div>
        <h2 id="lucky-title">把一點幸運，帶回去。</h2>
        <p className="lucky-description">抽中全館酒品 <strong>9 折優惠券</strong><br/>每次抽獎，中獎機率皆為 10%。</p>
        <div className="lucky-result" role="status" aria-live="polite" aria-atomic="true">
          {stage === "ready" && <p>準備好了嗎？讓島嶼送你一份小驚喜。</p>}
          {stage === "drawing" && <p>幸運正在醞釀中⋯</p>}
          {stage === "lost" && <p>這次與優惠券擦肩而過，<br/>再試一次，看看下一份幸運！</p>}
          {stage === "won" && <div className="lucky-ticket"><span>恭喜中獎 · 島嶼專屬好禮</span><b>全館酒品 <em>9</em> 折</b><p>優惠碼 <code>ISLE90</code></p></div>}
        </div>
        {stage === "won" ? <button className="primary lucky-action" onClick={copyCoupon}>{copied ? "已複製優惠碼 ✓" : "複製優惠碼"}</button> : <button className="primary lucky-action" onClick={draw} disabled={stage === "drawing"}>{stage === "drawing" ? "抽獎中⋯" : stage === "lost" ? "再抽一次 ↗" : "試試手氣 ↗"}</button>}
        <div role="status">{copyError && <p className="copy-error">無法自動複製，請手動複製優惠碼 ISLE90。</p>}</div>
        <div className="lucky-rules">每次獨立抽獎，可重試；抽 10 次不保證中獎。<br/>此為體驗活動，優惠券尚未串接結帳核銷。</div>
      </div>
    </dialog>
  </>;
}

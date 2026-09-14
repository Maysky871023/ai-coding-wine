"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";

export default function EmailNotify() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = email.trim();
    setEmail(value);
    // Combine the browser's email validation with a public domain suffix.
    if (input.current) input.current.value = value;
    if (!value || !input.current?.validity.valid || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setError("請輸入有效的 Email 地址，例如 hello@example.com");
      input.current?.focus();
      return;
    }
    setError("");
    dialog.current?.showModal();
  }

  return <section className="email-notify glass" aria-labelledby="notify-title">
    <div className="eyebrow">COMING SOON · 即將開放</div>
    <h2 id="notify-title">想搶先收到島嶼的新消息？</h2>
    <p>新的風味故事與精選酒藏，正在慢慢醞釀。<br/>Email 通知功能即將登場，與我們一起期待下一份島嶼驚喜。</p>
    <form className="notify-form" onSubmit={submit} noValidate>
      <div className="notify-field"><label className="notify-label" htmlFor="notify-email">您的 Email</label><input ref={input} id="notify-email" name="email" type="email" autoComplete="email" inputMode="email" placeholder="輸入您的 Email 地址" maxLength={254} required value={email} onChange={event => { setEmail(event.target.value); setError(""); }} aria-invalid={Boolean(error)} aria-describedby={error ? "notify-error notify-note" : "notify-note"} /></div>
      <button className="primary" type="submit">加入通知名單 <span>→</span></button>
      {error && <p id="notify-error" className="notify-error" role="alert">{error}</p>}
    </form>
    <small id="notify-note">功能開發中，目前僅供體驗，不會儲存 Email 或寄送郵件。</small>
    <dialog ref={dialog} className="notify-dialog" aria-labelledby="notify-dialog-title" aria-describedby="notify-dialog-description" onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      <div className="notify-dialog-content"><div className="eyebrow">GOOD THINGS TAKE TIME</div><span className="notify-spark" aria-hidden="true">✧</span><h2 id="notify-dialog-title">請等待消息</h2><p id="notify-dialog-description">感謝您的期待！通知功能仍在開發中，敬請期待。<br/>這次填寫的 Email 不會儲存，也尚未加入通知名單。</p><form method="dialog"><button className="primary">我知道了</button></form></div>
    </dialog>
  </section>;
}

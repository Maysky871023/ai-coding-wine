"use client";

import { useEffect, useRef, useState } from "react";
import type { FormEvent } from "react";

const NAME_STORAGE_KEY = "isle-spirit-visitor-name";

export default function VisitorWelcome() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const element = dialog.current;
    const frame = requestAnimationFrame(() => {
      let savedName = "";
      try {
        savedName = localStorage.getItem(NAME_STORAGE_KEY)?.trim().slice(0, 30) ?? "";
      } catch {
        // Visitors can still enter a name when browser storage is unavailable.
      }
      if (savedName) {
        setName(savedName);
      } else {
        element?.showModal();
      }
    });
    return () => {
      cancelAnimationFrame(frame);
      element?.close();
    };
  }, []);

  useEffect(() => {
    if (!name) return;
    try {
      localStorage.setItem(NAME_STORAGE_KEY, name);
    } catch {
      // Keep the greeting available for this visit even if saving is blocked.
    }
    dialog.current?.close();
  }, [name]);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) {
      setError("請輸入您的稱呼，不能只有空白喔。");
      return;
    }
    setName(trimmed);
    setError("");
    dialog.current?.close();
  }

  return <>
    {name && <div className="visitor-banner" role="status"><span aria-hidden="true">✧</span><p>歡迎，<strong>{name}</strong>！一起探索島嶼的美好風味。</p></div>}
    <dialog ref={dialog} className="visitor-dialog" aria-labelledby="visitor-title" aria-describedby="visitor-description" onCancel={event => event.preventDefault()}>
      <form className="visitor-form" onSubmit={submit}>
        <div className="eyebrow">WELCOME TO ISLE & SPIRIT</div>
        <div className="visitor-symbol" aria-hidden="true">島</div>
        <h2 id="visitor-title">旅人，該怎麼稱呼您？</h2>
        <p id="visitor-description">留下一個稱呼，<br/>讓我們陪您開啟這趟島嶼風味之旅。</p>
        <label htmlFor="visitor-name">您的稱呼</label>
        <input id="visitor-name" name="visitor-name" type="text" placeholder="例如：小島" value={input} onChange={event => { setInput(event.target.value); setError(""); }} maxLength={30} required autoComplete="off" aria-invalid={Boolean(error)} aria-describedby={error ? "visitor-error" : undefined} />
        {error && <p id="visitor-error" className="visitor-error" role="alert">{error}</p>}
        <button className="primary" type="submit">開始探索 <span>↗</span></button>
      </form>
    </dialog>
  </>;
}

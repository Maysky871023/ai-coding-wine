"use client";

import { useEffect, useRef, useState } from "react";

const TOTAL = 10;
const targetFor = (shot: number) => 25 + ((shot * 29 + 17) % 51);
const pointsFor = (distance: number) => distance <= 4 ? 100 : distance <= 11 ? 50 : 0;

export default function BottleGame() {
  const [phase, setPhase] = useState<"ready" | "aim" | "flight" | "result" | "over">("ready");
  const [shots, setShots] = useState(0);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [message, setMessage] = useState("準備好挑戰十次投擲了嗎？");
  const [landing, setLanding] = useState<number | null>(null);
  const aim = useRef(50);
  const marker = useRef<HTMLDivElement>(null);
  const bottle = useRef<SVGGElement>(null);
  const lock = useRef(false);
  const target = targetFor(shots);

  useEffect(() => {
    if (phase !== "aim") return;
    let frame = 0;
    const start = performance.now();
    const animate = (time: number) => {
      aim.current = 50 + 43 * Math.sin((time - start) / 650);
      if (marker.current) marker.current.style.left = `${aim.current}%`;
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [phase]);

  useEffect(() => {
    if (phase !== "flight") return;
    let frame = 0;
    const start = performance.now();
    const endX = aim.current * 6;
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 1 : 850;
    const animate = (time: number) => {
      const t = Math.min(1, (time - start) / duration);
      const x = 300 + (endX - 300) * t;
      const y = 310 - 85 * t - 170 * Math.sin(Math.PI * t);
      bottle.current?.setAttribute("transform", `translate(${x} ${y}) rotate(${360 * t})`);
      if (t < 1) { frame = requestAnimationFrame(animate); return; }
      const points = pointsFor(Math.abs(aim.current - target));
      setLanding(aim.current);
      const total = score + points;
      setScore(total);
      setBest(previous => Math.max(previous, total));
      setMessage(points === 100 ? "完美落點！＋100 分 ✦" : points === 50 ? "成功命中！＋50 分" : "差一點！這次 0 分，下次再瞄準。" );
      setPhase(shots + 1 === TOTAL ? "over" : "result");
      lock.current = false;
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [phase, target, shots, score]);

  function action() {
    if (lock.current) return;
    if (phase === "aim") { lock.current = true; setPhase("flight"); return; }
    if (phase === "flight") return;
    if (phase === "ready" || phase === "over") { setShots(0); setScore(0); }
    else setShots(previous => previous + 1);
    setLanding(null);
    aim.current = 50;
    bottle.current?.setAttribute("transform", "translate(300 310)");
    setMessage("指針進入金色區域時，按下「丟出酒瓶」！");
    setPhase("aim");
  }

  return <section className="game-panel glass" aria-label="丟酒瓶計分遊戲">
    <div className="game-scoreboard"><div>目前得分<strong>{score.toString().padStart(3, "0")}</strong></div><div>投擲回合<strong>{phase === "ready" ? "—" : shots + 1}<small> / {TOTAL}</small></strong></div><div>本次造訪最高分<strong>{best.toString().padStart(3, "0")}</strong></div></div>
    <div className="game-scene" aria-hidden="true"><svg viewBox="0 0 600 360"><defs><linearGradient id="game-sky" x2="0" y2="1"><stop stopColor="#293d32"/><stop offset="1" stopColor="#111e19"/></linearGradient></defs><rect width="600" height="360" rx="15" fill="url(#game-sky)"/><circle cx="490" cy="68" r="33" fill="#c8ad7c22"/><path d="M0 205 110 95 200 178 310 70 460 180 540 125 600 170V360H0Z" fill="#344b38"/><path d="M0 240 140 180 270 248 410 153 600 240V360H0Z" fill="#21392c"/><ellipse cx="300" cy="280" rx="285" ry="58" fill="#16261e"/><ellipse cx={target * 6} cy="233" rx="66" ry="17" fill="#c8ad7c25" stroke="#c8ad7c" strokeDasharray="5 5"/><ellipse cx={target * 6} cy="233" rx="24" ry="8" fill="#e7c584aa"/>{landing !== null && <circle cx={landing * 6} cy="233" r="5" fill="#fff4c9"/>}<g ref={bottle} transform="translate(300 310)"><path d="M-6-45H6V-27L15-18V14Q15 20 9 20H-9Q-15 20-15 14V-18L-6-27Z" fill="#94b278" stroke="#d7e5ba" strokeWidth="2"/><rect x="-7" y="-49" width="14" height="7" rx="2" fill="#c8ad7c"/><rect x="-11" y="-10" width="22" height="20" rx="2" fill="#eee0ba"/><text textAnchor="middle" y="5" fontSize="13" fill="#233c28">島</text></g><text x="22" y="30" fill="#abbba0" fontSize="10" letterSpacing="3">FORMOSA BOTTLE TOSS</text></svg></div>
    <div className="game-controls"><div className="aim-label"><span>落點指針</span><span>金色中心 100 分・外圈 50 分</span></div><div className="aim-track" aria-hidden="true"><div className="aim-zone" style={{ left: `${target}%` }}><span /></div><div ref={marker} className="aim-marker" style={{ left: "50%" }}>▼</div></div><p className="game-message" role="status" aria-live="polite">{message}{phase === "over" && <strong> 本局結束，總分 {score} / 1000！</strong>}</p><button className="primary game-action" onClick={action} disabled={phase === "flight"}>{phase === "ready" ? "開始挑戰 ↗" : phase === "aim" ? "丟出酒瓶！" : phase === "flight" ? "酒瓶飛行中⋯" : phase === "over" ? "再玩一局 ↻" : "下一瓶 →"}</button><p className="game-help">點擊或觸碰按鈕投擲；鍵盤可用 Tab 選取按鈕後按空白鍵或 Enter。<br/>每局 10 瓶，落在金色區域得分，落空不扣分。</p></div>
  </section>;
}

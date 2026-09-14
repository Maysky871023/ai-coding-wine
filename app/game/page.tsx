import type { Metadata } from "next";
import Link from "next/link";
import BottleGame from "./bottle-game";

export const metadata: Metadata = { title: "丟瓶樂｜島嶼之釀", description: "抓準時機丟出虛擬酒瓶，挑戰十次投擲的最高分。純娛樂小遊戲。" };

export default function GamePage() {
  return <div className="site"><header><Link className="brand" href="/"><b>島</b><span>島嶼之釀<small>ISLE & SPIRIT</small></span></Link><nav aria-label="主要導覽"><Link href="/">首頁</Link><Link href="/blog">風味誌</Link><Link className="game-nav" href="/game" aria-current="page">丟瓶樂</Link></nav></header><main className="game-main"><div className="eyebrow">ISLAND ARCADE / JUST FOR FUN</div><h1>把煩惱放下，<span>丟一瓶！</span></h1><p className="game-intro">瞄準島嶼上的金色落點，看看你的手感有多準。</p><BottleGame /><p className="game-disclaimer">純娛樂・虛擬投擲・分數不兌換獎品或優惠券</p></main></div>;
}

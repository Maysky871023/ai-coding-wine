import type { Metadata } from "next";
import "./globals.css";
import LuckyDraw from "./lucky-draw";
import VisitorWelcome from "./visitor-welcome";
export const metadata: Metadata = {
 title: "島嶼之釀 ISLE & SPIRIT｜品味台灣特色酒類",
 description: "從台灣威士忌、金門高粱到梅酒與在地精釀，探索島嶼的風土故事與獨特風味。",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
 return <html lang="zh-Hant"><body><VisitorWelcome />{children}<LuckyDraw /></body></html>;
}

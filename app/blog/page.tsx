import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "島嶼風味誌｜三篇文章認識台灣酒類",
  description: "從台灣威士忌的熟成、金門高粱的釀造，到台灣啤酒的日常文化，讀懂杯中的島嶼故事。",
};

const articles = [
  {
    id: "taiwan-whisky", number: "01", mark: "山", category: "威士忌 · 風土筆記", english: "THE WARMTH OF OUR ISLAND",
    title: "台灣威士忌：讓島嶼氣候，寫進橡木桶裡",
    intro: "認識台灣威士忌，可以先把目光從年份移開，看看酒廠所在的土地。氣候與木桶，都是塑造風味的重要角色。",
    sections: [
      { title: "從宜蘭出發的熟成故事", text: "以宜蘭的噶瑪蘭酒廠為例，品牌將台灣的亞熱帶氣候視為製酒特色之一。溫暖環境能加快熟成中的變化，但酒廠仍需仔細管理木桶與酒液的互動。這提醒我們：年份提供了時間資訊，卻無法單獨說明一杯酒的全部個性。" },
      { title: "把香氣當成一段閱讀", text: "初次認識一款威士忌，不必急著找到標準答案。先觀察酒色，再慢慢辨認香氣：它讓你想到新鮮水果、乾果，還是木質氣息？這些是描述感受的詞彙，而非每一瓶台灣威士忌都必須具備的特徵。把自己的印象記下來，比背誦風味表更有意思。" },
      { title: "從酒標認識差異", text: "閱讀酒標上的酒廠、桶型與酒精濃度，再對照品牌提供的酒款說明，可以讓品飲更有脈絡。即使來自同一座島嶼，不同酒廠、批次與桶型，也可能呈現截然不同的風貌。台灣威士忌的魅力，正是這些值得細讀的差異。" },
    ],
    source: "噶瑪蘭品牌新聞稿：亞熱帶氣候與木桶管理", url: "https://kyodonewsprwire.jp/release/202606110700",
  },
  {
    id: "kinmen-kaoliang", number: "02", mark: "金", category: "高粱 · 釀造工藝", english: "GRAIN, CRAFT & TIME",
    title: "金門高粱：一粒穀物，如何成為島嶼經典",
    intro: "透明的酒液裡，藏著製麴、發酵、蒸餾與窖藏的工夫。認識高粱酒，從原料背後的釀造過程開始。",
    sections: [
      { title: "高粱與小麥，各有任務", text: "依金門酒廠的製程介紹，高粱是主要釀酒原料，小麥則用於製麴。麴經研磨後加入蒸煮、冷卻的高粱，參與發酵過程。原料並不是單獨決定風味的答案，釀造工序同樣扮演關鍵角色。" },
      { title: "蒸餾之後，還有時間的工作", text: "酒廠將製程分為製麴、製酒、窖藏與包裝。蒸餾後的酒液會經過貯存，使酒質與口感逐漸穩定；調酒師再進行調配，通過品質評鑑後才包裝上市。因此，一瓶高粱的完成，包含了釀造與後續品質管理的共同成果。" },
      { title: "用自己的語言認識清香", text: "談到高粱，許多人先想到濃烈。若把注意力放回香氣，可以試著記錄穀物感、香氣的乾淨程度，以及入口後留下的印象。這些筆記沒有唯一答案，也不必用酒精濃度來判斷好壞；不同酒款的風格，值得分別認識。" },
    ],
    source: "金門酒廠：Production Process 製酒流程", url: "https://www.kkl.com.tw/en/about04.aspx",
  },
  {
    id: "taiwan-beer", number: "03", mark: "麥", category: "啤酒 · 日常文化", english: "A LITTLE TASTE OF EVERYDAY",
    title: "台灣啤酒：從百年釀造，走進日常餐桌",
    intro: "有些味道不只存在於杯中，也存在於生活記憶。台灣啤酒的故事，連著產業變遷，也連著人們相聚的場景。",
    sections: [
      { title: "從高砂啤酒開始", text: "台灣啤酒官方將品牌歷史追溯至 1919 年的高砂麥酒株式會社。一路經過專賣制度、進口市場開放與市場競爭，啤酒也隨著社會生活改變。認識這段背景，能讓熟悉的品牌名稱多一層歷史厚度。" },
      { title: "一個品牌，不只一種風味", text: "除了經典與金牌系列，台啤官方也列有生啤酒、水果啤酒和特釀系列。這些分類提供了探索方向，但同一類別裡的產品仍可能不同。想理解一瓶酒，先閱讀它的原料、產品說明與保存標示，通常比只看包裝顏色更有幫助。" },
      { title: "把日常變成風味筆記", text: "閱讀啤酒，可以從香氣、甜感、苦味與口感四個角度出發。它讓你想到麵包、穀物，還是水果？入口的氣泡感如何？餐桌上的記憶可以是起點，但不需要成為標準。把觀察寫成幾句自己的話，下次再回頭比較，就能慢慢建立屬於自己的風味地圖。" },
    ],
    source: "台灣啤酒官方：認識台啤與產品系列", url: "https://www.twbeer.com.tw/about",
  },
];

export default function Blog() {
  return <div className="site blog-site">
    <header><Link className="brand" href="/"><b>島</b><span>島嶼之釀<small>ISLE & SPIRIT</small></span></Link><nav aria-label="主要導覽"><Link href="/#collection">探索酒款</Link><Link href="/blog" aria-current="page">風味誌</Link><Link className="game-nav" href="/game">丟瓶樂</Link></nav><Link href="/" className="nav-button">返回首頁 <span>↗</span></Link></header>
    <main className="blog-main">
      <section className="blog-hero"><div className="eyebrow">THE ISLAND JOURNAL · VOL. 01</div><h1>杯中有風土，<br/><span>字裡有故事。</span></h1><p>島嶼風味誌 / 從三段故事，認識台灣酒釀。<br/>把閱讀的步調放慢，讓土地與工藝，帶你走近每一種風味。</p><span className="journal-seal" aria-hidden="true">誌</span></section>
      <nav className="journal-index" aria-label="文章目錄">{articles.map(article => <a className="glass journal-card" href={`#${article.id}`} key={article.id}><div className="eyebrow">{article.number} / {article.category}</div><span className="journal-mark" aria-hidden="true">{article.mark}</span><h2>{article.title}</h2><span className="read-article">閱讀全文 <span>↓</span></span></a>)}</nav>
      <div className="journal-articles">{articles.map(article => <article className="journal-article" id={article.id} key={article.id}><aside><span className="article-number">{article.number}</span><p>{article.category}</p><a href="#">回到文章目錄 ↑</a></aside><div className="article-body"><div className="eyebrow">{article.english}</div><h2>{article.title}</h2><p className="article-intro">{article.intro}</p>{article.sections.map(section => <section key={section.title}><h3>{section.title}</h3><p>{section.text}</p></section>)}<div className="article-source">參考資料 <a href={article.url} target="_blank" rel="noopener noreferrer">{article.source} ↗</a><small>風味描述為閱讀與觀察方向，實際表現依酒款而異。</small></div></div></article>)}</div>
      <section className="about"><div className="eyebrow">KEEP EXPLORING</div><h2>故事讀完了，探索才剛開始。</h2><p>回到島嶼酒藏，尋找下一個想認識的風味。</p><Link className="primary" href="/#collection">探索島嶼酒藏 <span>↗</span></Link></section>
    </main>
    <footer><Link className="brand" href="/"><b>島</b><span>島嶼之釀<small>ISLE & SPIRIT</small></span></Link><span>© 2026 ISLE & SPIRIT. 台灣風味概念網站</span><a href="#">回到頂端 ↑</a></footer><div className="responsible">禁止酒駕 <span>·</span> 未滿十八歲禁止飲酒 <span>·</span> 理性品飲，享受生活</div>
  </div>;
}

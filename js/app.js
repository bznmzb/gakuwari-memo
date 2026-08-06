// ===== 学割 節約シミュレーター =====
// year=年間の節約額の目安。href="#" は後でASPのアフィリリンクに差し替え。

const ITEMS = [
  {id:"apple", ico:"🎧", bg:"#3a1f2b", name:"Apple Music 学割", year:6000, desc:"月500円オフ", href:"https://music.apple.com/jp/student", pr:true},
  {id:"spotify", ico:"🟢", bg:"#1d3328", name:"Spotify 学割", year:6000, desc:"月500円オフ", href:"https://www.spotify.com/jp/student/", pr:true},
  {id:"youtube", ico:"▶️", bg:"#3a2020", name:"YouTube Premium 学割", year:6000, desc:"月500円オフ", href:"https://www.youtube.com/premium/student", pr:true},
  {id:"prime", ico:"📦", bg:"#1f2a3a", name:"Amazon Prime Student", year:3600, desc:"月300円＋6ヶ月無料", href:"https://www.amazon.co.jp/b?node=2410972051", pr:true},
  {id:"adobe", ico:"🎨", bg:"#3a2020", name:"Adobe CC 学割", year:36000, desc:"学生は大幅オフ", href:"https://www.adobe.com/jp/creativecloud/buy/students.html", pr:true},
  {id:"hair", ico:"💇", bg:"#3a1f2e", name:"美容院の学割", year:6000, desc:"学生証で割引", href:"https://www.google.com/search?q=美容院+学割", pr:true},
  {id:"karaoke", ico:"🎤", bg:"#2a1f3a", name:"カラオケの学割", year:5000, desc:"平日昼が激安", href:"https://www.google.com/search?q=カラオケ+学割", pr:false},
  {id:"train", ico:"🚄", bg:"#1d3328", name:"帰省・交通の学割", year:8000, desc:"JR・新幹線2割引", href:"https://jreastfaq.jreast.co.jp/faq/show/2977?category_id=15&site_domain=default", pr:false},
  {id:"movie", ico:"🎬", bg:"#2a1f3a", name:"映画館の学割", year:5400, desc:"学生1,000円〜", href:"https://www.google.com/search?q=映画館+学生料金", pr:false},
];

const sel = new Set();

function show(id){document.querySelectorAll(".screen").forEach(s=>s.classList.remove("active"));
  document.getElementById(id).classList.add("active");window.scrollTo(0,0);}

function startSim(){
  document.getElementById("simList").innerHTML = ITEMS.map(it=>
    `<button class="sim-item" id="it-${it.id}" onclick="toggle('${it.id}')">
       <span class="ico" style="background:${it.bg}">${it.ico}</span>
       <span class="t"><b>${it.name}</b><span>${it.desc}</span></span>
       <span class="check">＋</span>
     </button>`).join("");
  updateTotal();
  show("select");
}

function toggle(id){
  if(sel.has(id)){sel.delete(id);document.getElementById("it-"+id).classList.remove("on");}
  else{sel.add(id);document.getElementById("it-"+id).classList.add("on");}
  updateTotal();
}

function total(){return ITEMS.filter(i=>sel.has(i.id)).reduce((s,i)=>s+i.year,0);}

function updateTotal(){
  const t=total();
  document.getElementById("liveTotal").textContent="¥"+t.toLocaleString();
  const btn=document.getElementById("resultBtn");
  btn.disabled = sel.size===0;
  btn.textContent = sel.size===0 ? "1つ以上えらんでね" : "結果を見る →";
}

function countUp(el,to){
  let cur=0;const step=Math.max(1,Math.round(to/40));
  const t=setInterval(()=>{cur+=step;if(cur>=to){cur=to;clearInterval(t);}
    el.textContent=cur.toLocaleString();},22);
}

function showResult(){
  if(sel.size===0)return;
  const t=total();
  countUp(document.getElementById("bigNum"),t);
  document.getElementById("yearsNum").textContent="¥"+(t*4).toLocaleString();
  const picked=ITEMS.filter(i=>sel.has(i.id));
  document.getElementById("breakList").innerHTML=picked.map(i=>
    `<a class="rec" href="${i.href}" target="_blank" rel="${i.pr?'nofollow sponsored noopener':'noopener'}">
       <span class="ico" style="background:${i.bg}">${i.ico}</span>
       <span class="txt"><b>${i.name}${i.pr?'<span class="pr-tag">PR</span>':''}</b><span>年間 約¥${i.year.toLocaleString()} お得</span></span>
       <span class="go">›</span></a>`).join("");
  show("result");
}

function shareX(){
  const t=total();
  const url=encodeURIComponent(location.href);
  const text=encodeURIComponent(`私は学割で年間 約¥${t.toLocaleString()} お得になるらしい🐷💰 #学割\nあなたはいくら？→`);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`,"_blank");
}
function shareLine(){
  const t=total();const url=encodeURIComponent(location.href);
  window.open(`https://line.me/R/msg/text/?${encodeURIComponent(`学割で年間¥${t.toLocaleString()}お得らしい🐷 あなたも計算してみて→ `)}${url}`,"_blank");
}
function retry(){sel.clear();startSim();}

window.addEventListener("DOMContentLoaded",()=>show("start"));

// Community Reviews
const SR = {3:[{n:"骑行小白",d:"2025-08-15",t:"第一个4000m垭口，爬到我怀疑人生。折多塘住一晚适应海拔很重要！",s:"★★★★★"},{n:"老张爱骑车",d:"2025-07-20",t:"折多山名不虚传。建议5点前出发，上午风小。下坡一定控速！",s:"★★★★☆"}],4:[{n:"风中的骑者",d:"2025-08-10",t:"200km高海拔骑行，最漫长的一天。但毛垭草原的日落值回所有。",s:"★★★★★"},{n:"川藏老兵",d:"2025-06-28",t:"天路十八弯下来记得捏闸。高海拔缺氧才是最大敌人。",s:"★★★★☆"}],7:[{n:"极限挑战者",d:"2025-08-20",t:"东达山5008m！三座大山一天翻完，到左贡时腿已经不是自己的了。",s:"★★★★★"}],10:[{n:"单车日记",d:"2025-08-05",t:"鲁朗石锅鸡名不虚传！这一路最美的一段，森林雪山藏寨像在画里骑。",s:"★★★★★"},{n:"林芝土著",d:"2025-07-22",t:"鲁朗到色季拉山这段我骑过很多次，每次都被美哭。",s:"★★★★★"}],12:[{n:"追风少年",d:"2025-08-18",t:"看到布达拉宫的那一刻……这辈子值了。",s:"★★★★★"},{n:"骑行老炮",d:"2025-07-30",t:"12天骑完川藏线，不是终点是起点。",s:"★★★★★"}]};

function initCommunity() {
  document.querySelectorAll(".day-card").forEach(card => {
    const hdr = card.querySelector(".day-header .d");
    if (!hdr) return;
    const dn = parseInt(hdr.textContent.replace("D",""));
    if (!dn) return;
    const di = card.querySelector(".detail-inner");
    if (!di) return;
    
    // Reviews section
    const sec = document.createElement("div");
    sec.style.margin = "12px 0 0";
    sec.innerHTML = '<strong style="color:var(--gd);font-size:.9rem">💬 骑友点评</strong><div class="rvl"></div>';
    const rvl = sec.querySelector(".rvl");
    
    // Add sample reviews
    (SR[dn]||[]).forEach(r => {
      const el = document.createElement("div");
      el.style.cssText = "border-left:2px solid var(--gd);padding:8px 12px;margin:6px 0;background:rgba(0,0,0,0.15);border-radius:0 6px 6px 0";
      el.innerHTML = '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:3px"><span style="font-size:.78rem;color:var(--gd);font-weight:600">' + r.n + '</span><span style="font-size:.68rem;color:var(--mt)">' + r.d + '</span><span style="font-size:.78rem;color:var(--or);margin-left:auto">' + r.s + '</span></div><div style="font-size:.78rem;color:var(--tx);line-height:1.5">' + r.t + '</div>';
      rvl.appendChild(el);
    });
    
    // Review form
    const frm = document.createElement("div");
    frm.style.cssText = "margin-top:8px;padding:8px;background:rgba(0,0,0,0.15);border-radius:8px";
    frm.innerHTML = '<textarea class="ri" data-d="' + dn + '" placeholder="分享你的骑行体验..." rows="2" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:8px;color:var(--tx);font-size:.8rem;font-family:inherit;resize:none;outline:none"></textarea><div style="display:flex;gap:8px;align-items:center;margin-top:6px"><div class="str" data-d="' + dn + '">' + [1,2,3,4,5].map(v => '<span class="st" data-v="' + v + '" onclick="rs(this,' + dn + ',' + v + ')" style="cursor:pointer;font-size:1.3rem;color:var(--mt)">★</span>').join("") + '</div><button class="rb" onclick="ar(' + dn + ')" style="padding:5px 14px;background:var(--gd);border:none;border-radius:6px;color:#0a1628;font-size:.75rem;font-weight:600;cursor:pointer">发布点评</button></div>';
    rvl.appendChild(frm);
    di.appendChild(sec);
    
    // Load saved rating
    const rv = localStorage.getItem("rate_" + dn);
    if (rv) document.querySelectorAll('.str[data-d="' + dn + '"] .st').forEach(s => s.style.color = parseInt(s.dataset.v) <= parseInt(rv) ? "var(--or)" : "var(--mt)");
  });
  
  // Load my reviews
  try {
    const my = JSON.parse(localStorage.getItem("my_rvs") || "{}");
    for (const d in my) foundReview(d, my[d]);
  } catch(e) {}
  
  // Add achievements
  addAch();
  
  // Load progress
  const n = parseInt(localStorage.getItem("prog") || "0");
  document.querySelectorAll(".chk input").forEach((x,i) => { if (i < n) x.checked = true; });
  upPr();
}

function foundReview(d, rvs) {
  rvs.forEach(r => {
    const ta = document.querySelector('.ri[data-d="' + d + '"]');
    if (!ta) return;
    const el = document.createElement("div");
    el.style.cssText = "border-left:2px solid var(--gd);padding:8px 12px;margin:6px 0;background:rgba(0,0,0,0.15);border-radius:0 6px 6px 0";
    el.innerHTML = '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:3px"><span style="font-size:.78rem;color:var(--gd);font-weight:600">我</span><span style="font-size:.68rem;color:var(--mt)">刚刚</span><span style="font-size:.78rem;color:var(--or);margin-left:auto">★★★★★</span></div><div style="font-size:.78rem;color:var(--tx);line-height:1.5">' + r.t + '</div>';
    ta.closest(".rvl").insertBefore(el, ta.closest("div"));
  });
}

function rs(e, d, v) {
  e.parentElement.querySelectorAll(".st").forEach(s => s.style.color = parseInt(s.dataset.v) <= v ? "var(--or)" : "var(--mt)");
  localStorage.setItem("rate_" + d, v);
}

function ar(d) {
  const ta = document.querySelector('.ri[data-d="' + d + '"]');
  if (!ta || !ta.value.trim()) { alert("请填写点评"); return; }
  const my = JSON.parse(localStorage.getItem("my_rvs") || "{}");
  if (!my[d]) my[d] = [];
  my[d].push({t:ta.value});
  localStorage.setItem("my_rvs", JSON.stringify(my));
  const el = document.createElement("div");
  el.style.cssText = "border-left:2px solid var(--gd);padding:8px 12px;margin:6px 0;background:rgba(0,0,0,0.15);border-radius:0 6px 6px 0";
  el.innerHTML = '<div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-bottom:3px"><span style="font-size:.78rem;color:var(--gd);font-weight:600">我</span><span style="font-size:.68rem;color:var(--mt)">刚刚</span><span style="font-size:.78rem;color:var(--or);margin-left:auto">★★★★★</span></div><div style="font-size:.78rem;color:var(--tx);line-height:1.5">' + ta.value + '</div>';
  ta.closest(".rvl").insertBefore(el, ta.closest("div"));
  ta.value = "";
}

function upPr() {
  let n = 0;
  document.querySelectorAll(".chk input").forEach(x => { if (x.checked) n++; });
  localStorage.setItem("prog", n);
  const bar = document.getElementById("progBar");
  const lbl = document.getElementById("progLabel");
  if (bar && lbl) { bar.style.width = (n/12*100) + "%"; lbl.textContent = n + " / 12 天"; }
  ca(n);
}

function ca(n) {
  document.querySelectorAll(".ach").forEach(a => {
    const r = parseInt(a.dataset.req);
    if (r > 0 && n >= r) a.classList.add("unlocked");
  });
  if (n >= 6) document.querySelectorAll('.ach[data-req="0"]').forEach(a => a.classList.add("unlocked"));
}

function addAch() {
  const tabs = document.querySelector(".tabs");
  const cont = document.querySelector(".container");
  if (!tabs || !cont) return;
  const t = document.createElement("div"); t.className = "tab"; t.dataset.tab = "4"; t.textContent = "🏆 成就";
  tabs.appendChild(t);
  const c = document.createElement("div"); c.className = "tab-c"; c.dataset.tc = "4";
  c.innerHTML = '<h3 style="color:var(--gd);font-size:1rem;margin-bottom:10px">🏅 成就徽章</h3><p style="font-size:.78rem;color:var(--mt);margin-bottom:8px">完成每日打卡解锁</p><div class="achs" id="ac"><div class="ach" data-req="1"><span class="ai">🌟</span><div class="an">首日启程</div><div class="ad">完成D1</div></div><div class="ach" data-req="3"><span class="ai">🏔️</span><div class="an">翻越折多山</div><div class="ad">完成D3</div></div><div class="ach" data-req="7"><span class="ai">⛰️</span><div class="an">征服东达山</div><div class="ad">完成D7</div></div><div class="ach" data-req="10"><span class="ai">🍜</span><div class="an">鲁朗石锅鸡</div><div class="ad">完成D10</div></div><div class="ach" data-req="12"><span class="ai">🏁</span><div class="an">抵达拉萨</div><div class="ad">完成D12</div></div><div class="ach" data-req="0"><span class="ai">🔥</span><div class="an">半程勇士</div><div class="ad">完成6天</div></div><div class="ach" data-req="0"><span class="ai">🏆</span><div class="an">川藏征服者</div><div class="ad">完成全部12天</div></div></div>';
  cont.appendChild(c);
  const s = document.createElement("style");
  s.textContent = ".achs{display:grid;grid-template-columns:repeat(auto-fill,minmax(85px,1fr));gap:8px;margin:10px 0}.ach{text-align:center;padding:10px 6px;background:var(--cd);border:1px solid rgba(255,255,255,0.04);border-radius:8px}.ach.unlocked{border-color:rgba(212,168,67,0.3);background:rgba(212,168,67,0.05)}.ach .ai{font-size:1.5rem;display:block}.ach .an{font-size:.65rem;color:var(--mt)}.ach.unlocked .an{color:var(--gd)}.ach .ad{font-size:.58rem;color:var(--mt);opacity:.5}";
  document.head.appendChild(s);
  // Extend tab handler
  document.querySelectorAll(".tab").forEach(t => {
    t.addEventListener("click", function() {
      document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
      this.classList.add("active");
      document.querySelectorAll(".tab-c").forEach(x => x.classList.remove("active"));
      document.querySelector('[data-tc="' + this.dataset.tab + '"]').classList.add("active");
    });
  });
  ca(parseInt(localStorage.getItem("prog") || "0"));
}

// Listen for day card completion checkbox changes
document.addEventListener("change", function(e) {
  if (e.target.classList.contains("cp")) { upPr(); ca(parseInt(localStorage.getItem("prog") || "0")); }
});

// Init on DOM ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCommunity);
} else {
  initCommunity();
}

console.log("🚴 川藏线骑行社区 v3 已加载 (骑友点评 + 完成打卡 + 成就系统)");// ==========================================
// Enhanced v3.1: Certificate + Enhanced Features
// ==========================================

// Certificate Generator
function genCert() {
  const n = parseInt(localStorage.getItem("prog") || "0");
  if (n < 12) { alert("完成全部 12 天打卡后才能生成证书！"); return; }
  
  const name = prompt("请输入你的名字或昵称（将显示在证书上）：", "骑行勇士") || "骑行勇士";
  const days = [];
  document.querySelectorAll(".day-card .dh").forEach((h, i) => {
    const d = h.querySelector(".d")?.textContent || "D" + (i+1);
    const r = h.querySelector(".rn")?.textContent || "";
    days.push({d, r});
  });
  
  // Build SVG certificate
  const w = 800, h = 1100;
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">';
  // Background
  svg += '<defs><linearGradient id="bg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#0a1628"/><stop offset="100%" stop-color="#152238"/></linearGradient>';
  svg += '<linearGradient id="gd" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#d4a843"/><stop offset="50%" stop-color="#f0d070"/><stop offset="100%" stop-color="#d4a843"/></linearGradient>';
  svg += '<filter id="sh"><feDropShadow dx="0" dy="4" stdDeviation="8" flood-opacity="0.3"/></filter></defs>';
  svg += '<rect width="' + w + '" height="' + h + '" fill="url(#bg)"/>';
  // Border
  svg += '<rect x="20" y="20" width="760" height="1060" rx="16" fill="none" stroke="#d4a843" stroke-width="2" opacity="0.3"/>';
  svg += '<rect x="30" y="30" width="740" height="1040" rx="12" fill="none" stroke="#d4a843" stroke-width="1" opacity="0.15"/>';
  // Title
  svg += '<text x="400" y="100" text-anchor="middle" fill="url(#gd)" font-size="36" font-weight="bold" font-family="sans-serif" filter="url(#sh)">🚴 川藏线骑行证书</text>';
  svg += '<text x="400" y="140" text-anchor="middle" fill="#90aec8" font-size="16" font-family="sans-serif">Chengdu → Lhasa · G318 Sichuan-Tibet Highway</text>';
  // Divider
  svg += '<line x1="200" y1="170" x2="600" y2="170" stroke="#d4a843" stroke-width="1" opacity="0.4"/>';
  // Recipient
  svg += '<text x="400" y="220" text-anchor="middle" fill="#fff" font-size="18" font-family="sans-serif">兹证明</text>';
  svg += '<text x="400" y="270" text-anchor="middle" fill="#d4a843" font-size="32" font-weight="bold" font-family="sans-serif">' + name + '</text>';
  svg += '<text x="400" y="310" text-anchor="middle" fill="#fff" font-size="16" font-family="sans-serif">成功完成 G318 川藏南线全程骑行</text>';
  // Stats
  svg += '<rect x="100" y="350" width="600" height="120" rx="8" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.06)"/>';
  svg += '<text x="400" y="385" text-anchor="middle" fill="#90aec8" font-size="13" font-family="sans-serif">路线数据</text>';
  svg += '<text x="200" y="420" text-anchor="middle" fill="#d4a843" font-size="20" font-weight="bold">~2,120 km</text><text x="200" y="440" text-anchor="middle" fill="#90aec8" font-size="11">总里程</text>';
  svg += '<text x="400" y="420" text-anchor="middle" fill="#d4a843" font-size="20" font-weight="bold">12 天</text><text x="400" y="440" text-anchor="middle" fill="#90aec8" font-size="11">骑行天数</text>';
  svg += '<text x="600" y="420" text-anchor="middle" fill="#d4a843" font-size="20" font-weight="bold">14 座</text><text x="600" y="440" text-anchor="middle" fill="#90aec8" font-size="11">4,000m+垭口</text>';
  // Route
  svg += '<text x="400" y="510" text-anchor="middle" fill="#90aec8" font-size="13" font-family="sans-serif">途经路线</text>';
  svg += '<line x1="150" y1="525" x2="650" y2="525" stroke="rgba(255,255,255,0.06)"/>';
  
  const rx2 = [150, 191, 233, 275, 316, 358, 400, 441, 483, 525, 566, 608, 650];
  const ry2 = [545, 545, 545, 545, 545, 545, 545, 545, 545, 545, 545, 545, 545];
  svg += '<polyline points="' + rx2.map((x,i) => x + ',' + (ry2[i]-5)).join(' ') + '" fill="none" stroke="#d4a843" stroke-width="2" opacity="0.5"/>';
  
  days.forEach((d, i) => {
    const x = rx2[i], y = ry2[i];
    svg += '<circle cx="' + x + '" cy="' + y + '" r="4" fill="#6abf6a" stroke="#fff" stroke-width="1"/>';
    svg += '<text x="' + x + '" y="' + (y - 14) + '" text-anchor="middle" fill="#b0c4d8" font-size="7" font-family="sans-serif">' + d.d + '</text>';
    if (i % 2 === 0) {
      svg += '<text x="' + x + '" y="' + (y + 18) + '" text-anchor="middle" fill="#708898" font-size="6" font-family="sans-serif">' + d.r.split("→")[1]?.trim()?.substring(0,4) + '</text>';
    }
  });
  svg += '<text x="148" y="578" text-anchor="middle" fill="#d4a843" font-size="10" font-weight="bold">成都</text>';
  svg += '<text x="652" y="578" text-anchor="middle" fill="#d4a843" font-size="10" font-weight="bold">拉萨</text>';
  
  // Passes
  svg += '<text x="400" y="620" text-anchor="middle" fill="#90aec8" font-size="13" font-family="sans-serif">翻越雪山垭口</text>';
  const passes = "折多山4298m · 卡子拉山4718m · 海子山4685m · 东达山5008m · 业拉山4658m · 色季拉山4728m · 米拉山5013m";
  svg += '<text x="400" y="645" text-anchor="middle" fill="#e8a040" font-size="9" font-family="sans-serif">' + passes + '</text>';
  
  // Date
  svg += '<line x1="200" y1="690" x2="600" y2="690" stroke="rgba(255,255,255,0.06)"/>';
  svg += '<text x="400" y="730" text-anchor="middle" fill="#90aec8" font-size="12" font-family="sans-serif">发证日期：' + new Date().toISOString().slice(0,10) + '</text>';
  
  // Quote
  svg += '<text x="400" y="800" text-anchor="middle" fill="rgba(212,168,67,0.4)" font-size="14" font-style="italic" font-family="sans-serif">「路在轮下，心在天上」</text>';
  
  // Footer
  svg += '<text x="400" y="880" text-anchor="middle" fill="#607888" font-size="9" font-family="sans-serif">川藏线 G318 骑行社区 · https://github.com/your-username/318-cycling</text>';
  svg += '<text x="400" y="900" text-anchor="middle" fill="#607888" font-size="8" font-family="sans-serif">本证书为骑行纪念，数据基于用户自行录入的行程信息</text>';
  
  svg += '</svg>';
  
  // Show certificate in lightbox
  const lb = document.getElementById("lb");
  const img = document.getElementById("lbi");
  if (lb && img) {
    img.src = "data:image/svg+xml," + encodeURIComponent(svg);
    lb.classList.add("show");
    document.getElementById("lbc").textContent = "🏆 骑行证书";
  }
  
  // Save to text for download
  localStorage.setItem("cert_svg", svg);
  localStorage.setItem("cert_name", name);
}

// Download certificate
function dlCert() {
  const svg = localStorage.getItem("cert_svg");
  if (!svg) { genCert(); return; }
  const name = localStorage.getItem("cert_name") || "骑行勇士";
  const blob = new Blob([svg], {type: "image/svg+xml"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "川藏线骑行证书_" + name + ".svg";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Add certificate controls to route overview
function addCertUI() {
  const shareBar = document.querySelector(".share-bar");
  if (!shareBar) return;
  
  const btn = document.createElement("button");
  btn.className = "share-btn";
  btn.style.cssText = "padding:7px 14px;border-radius:8px;border:none;cursor:pointer;font-size:.78rem;font-weight:600";
  btn.style.background = "var(--gd)";
  btn.style.color = "#0a1628";
  btn.textContent = "🏆 生成骑行证书";
  btn.onclick = genCert;
  shareBar.appendChild(btn);
  
  const dl = document.createElement("button");
  dl.className = "share-btn";
  dl.style.cssText = "padding:7px 14px;border-radius:8px;border:none;cursor:pointer;font-size:.78rem;font-weight:600";
  dl.style.background = "var(--bl)";
  dl.style.color = "#fff";
  dl.textContent = "📥 下载证书";
  dl.onclick = dlCert;
  shareBar.appendChild(dl);
}

// Add daily tips to day cards
function addDayTips() {
  const tips = {
    1: "💡 第一天控制节奏，别太兴奋骑太快。成都到雅安平路为主，适应骑行姿势最重要。",
    2: "💡 二郎山隧道有4km长，记得开前后灯。过隧道前吃午饭，隧道口有补给点。",
    3: "💡 最关键的一天！4:30前出发，中午前到折多山垭口（下午风大）。康定吃午饭，下坡控速！",
    4: "💡 超长的一天！4:00出发，带足干粮和水。雅江到剪子湾隧道这段盘山路很耗体力。",
    5: "💡 海子山垭口后80km超长下坡，注意刹车点刹，别一直捏着不放。",
    6: "💡 金沙江大桥是川藏分界线，记得拍照打卡。进入西藏后路况可能变差。",
    7: "💡 最艰难的一天！三座大山。东达山5008m是最高点，特别关注高反症状。",
    8: "💡 怒江72拐是川藏线标志性景观，但下坡一定小心再小心！",
    9: "💡 然乌湖美到窒息，值得停下来拍照。波密海拔低，可以好好休整。",
    10: "💡 鲁朗石锅鸡必吃！到鲁朗如果累了可以住一晚，第二天再翻色季拉山。",
    11: "💡 最漫长的一天（230km）。沿尼洋河骑行风景不错，工布江达可以吃午饭。",
    12: "💡 胜利日！翻过最后一座5000m大山，一路下坡到拉萨。下午就能到布达拉宫！"
  };
  
  document.querySelectorAll(".day-card").forEach(card => {
    const hdr = card.querySelector(".day-header .d");
    if (!hdr) return;
    const dn = parseInt(hdr.textContent.replace("D",""));
    if (!dn || !tips[dn]) return;
    const di = card.querySelector(".detail-inner");
    if (!di) return;
    
    const tip = document.createElement("div");
    tip.style.cssText = "margin:6px 0;padding:8px 12px;background:rgba(212,168,67,0.08);border:1px solid rgba(212,168,67,0.15);border-radius:6px;font-size:.8rem;color:var(--gd)";
    tip.textContent = tips[dn];
    
    // Insert after highlights
    const highlights = di.querySelector('[style*="亮点"]');
    if (highlights) {
      highlights.parentNode.insertBefore(tip, highlights.nextSibling);
    } else {
      di.insertBefore(tip, di.firstChild);
    }
  });
}

// Enhance existing tabs setup
function enhanceTabs() {
  // Fix tab switching for dynamically added tabs
  document.querySelectorAll(".tab").forEach(t => {
    t.removeEventListener("click", tabHandler);
    t.addEventListener("click", tabHandler);
  });
}

function tabHandler() {
  document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
  this.classList.add("active");
  document.querySelectorAll(".tab-c").forEach(x => x.classList.remove("active"));
  const tc = document.querySelector('[data-tc="' + this.dataset.tab + '"]');
  if (tc) tc.classList.add("active");
}

// Enhanced updateProgress with milestone messages
const origUpPr = window.upPr;
window.upPr = function() {
  let n = 0;
  document.querySelectorAll(".chk input").forEach(x => { if (x.checked) n++; });
  localStorage.setItem("prog", n);
  const bar = document.getElementById("progBar");
  const lbl = document.getElementById("progLabel");
  if (bar && lbl) {
    bar.style.width = (n/12*100) + "%";
    const msgs = {0:"尚未出发",3:"🏔️ 抵达康定，翻越折多山！",6:"🔥 半程达成！到达理塘",9:"🌲 抵达波密！穿越森林",12:"🏆 拉萨！你做到了！"};
    let msg = "";
    Object.keys(msgs).sort((a,b)=>b-a).forEach(k => { if (n >= parseInt(k) && !msg) msg = msgs[k]; });
    lbl.textContent = n + " / 12 天" + (msg ? " · " + msg : "");
    
    // Check if all done
    if (n === 12) {
      // Add confetti-like effect
      const sc = document.querySelector(".share-bar");
      if (sc) sc.style.animation = "pulse 0.5s ease 3";
    }
  }
  ca(n);
};

// Run after DOM ready
(function() {
  setTimeout(function() {
    addCertUI();
    addDayTips();
    enhanceTabs();
    // Re-run init to load progress with new handler
    const n = parseInt(localStorage.getItem("prog") || "0");
    document.querySelectorAll(".chk input").forEach((x,i) => { if (i < n) x.checked = true; });
    window.upPr();
  }, 500);
})();

console.log("🏆 川藏线骑行社区 v3.1 — 证书生成 + 每日贴士已加载");// ==========================================
// v3.2: 川藏线实战信息数据库
// ==========================================

const PRACTICAL = {
  1: {
    title: "D1 成都 → 雅安 (140km)",
    acc: [{n:"东升竹庄青年旅舍",p:"","pr":"40-60元",t:"川藏线经典首站，骑友聚集地，提供简餐和床位，老板熟悉路况"},
          {n:"雅安市区多家经济型酒店",p:"","pr":"80-150元",t:"如7天、如家等连锁酒店，条件较好"}],
    food: [{n:"雅安城区",t:"出城前可以在雅安吃午饭，砂锅雅鱼是当地特色"}, {n:"沿途乡镇",t:"双流、新津、蒲江都有餐馆，每隔20km左右有补给"}],
    repair: [{n:"成都车行",t:"出发前在成都做好全面保养。雅安有美利达、捷安特专卖店可做最后检修"}],
    hosp: [{n:"雅安市人民医院",p:"0835-2222220",t:"三甲医院，位于雅安城区"}],
    road: "全程G318国道，路况良好，平缓起伏。出成都后车流量较大，注意安全。",
    dangers: ["成都出城路段车多拥挤", "注意避让大型货车"],
    tips: ["第一天不宜过度消耗体力，控制在140km以内", "建议7:00前出发，下午3点左右到达雅安", "检查所有装备，后面山路多"]
  },
  2: {
    title: "D2 雅安 → 泸定 (135km)",
    acc: [{n:"泸定桥青年旅舍",p:"","pr":"50-70元",t:"靠近泸定桥，老板热心，可帮忙联系下一站住宿"},
          {n:"青松客栈",p:"","pr":"50-70元",t:"骑友推荐，干净卫生，有热水淋浴"}],
    food: [{n:"天全县城",t:"约40km处，午饭好选择"}, {n:"二郎山隧道口",t:"有小吃摊和便利店，可补给"}],
    repair: [{n:"天全县城",t:"有简单的修车铺，能补胎调刹车"}, {n:"泸定县城",t:"有自行车修理店"}],
    hosp: [{n:"天全县人民医院",p:"0835-7222222"}, {n:"泸定县人民医院",p:"0836-3122120"}],
    road: "持续上坡约90km至二郎山隧道（海拔2200m），之后长下坡至泸定。弯多坡陡。",
    dangers: ["二郎山路段弯多坡陡，大型货车频繁", "下坡长距离刹车，注意刹车过热"],
    tips: ["提前准备头灯通过二郎山隧道（约4km）", "下坡控制速度，建议不超过35km/h", "天全县城是午饭最佳补给点"]
  },
  3: {
    title: "D3 泸定 → 新都桥 (130km)",
    acc: [{n:"康巴客栈",p:"","pr":"50-80元",t:"新都桥镇，藏式风格，老板热情"},
          {n:"行者驿站",p:"","pr":"50-80元",t:"骑友聚集，提供自行车存放"]}],
    food: [{n:"康定城区",t:"约50km处，午饭推荐。康定市区选择多。"}, {n:"折多塘村",t:"约70km处，有简单的面馆和便利店"}],
    repair: [{n:"康定县城",t:"有专业自行车店，可做维修保养"}, {n:"新都桥镇",t:"有简单的修车铺"}],
    hosp: [{n:"康定市人民医院",p:"0836-2822120",t:"甘孜州最好的医院之一"}, {n:"新都桥镇卫生院",p:"0836-2866120"}],
    road: "泸定→康定50km陡上坡 → 康定→折多山垭口35km盘山路（爬升1900m）→ 下坡至新都桥。",
    dangers: ["折多山是川藏线第一道难关，高反首次考验", "垭口风大温度低，注意保暖"],
    tips: ["★最关键的一天！建议4:30前出发", "中午前翻过折多山（下午风大易起雾）", "康定吃午饭，爬坡前补充能量", "折多塘村可住一晚适应海拔，但行程紧"]
  },
  4: {
    title: "D4 新都桥 → 理塘 (200km)",
    acc: [{n:"理塘云端客栈",p:"","pr":"50-80元",t:"海拔高注意保暖，有电热毯"}, {n:"雅江县城客栈",p:"","pr":"50-80元",t:"如体力不支可在雅江住一晚分两天走"}],
    food: [{n:"雅江县城",t:"约80km处，午饭理想选择"}, {n:"剪子湾隧道口",t:"有补给点"}],
    repair: [{n:"雅江县城",t:"有修车铺"}, {n:"理塘县城",t:"有自行车维修店"}],
    hosp: [{n:"雅江县人民医院",p:"0836-5124120"}, {n:"理塘县人民医院",p:"0836-5322120",t:"高海拔地区，注意高反"}],
    road: "新都桥→雅江（下坡至2560m）→剪子湾山隧道（4659m）→卡子拉山（4718m）→理塘。",
    dangers: ["全程高海拔（4000m+），高反风险极高", "200km极端长距离，体力消耗大"],
    tips: ["★全程最艰难的一日之一！建议4:00出发", "带足干粮和水，全程高海拔", "如体力不支，可在雅江住一晚分两天", "理塘海拔4014m，注意高反症状"]
  },
  5: {
    title: "D5 理塘 → 巴塘 (190km)",
    acc: [{n:"胖姐客栈",p:"","pr":"50-70元",t:"川藏线著名接待站，食宿一体，老板热情"}],
    food: [{n:"禾尼乡",t:"约50km处，有餐馆"}, {n:"姊妹湖观景台",t:"有小吃摊"}],
    repair: [{n:"巴塘县城",t:"有自行车维修店"}],
    hosp: [{n:"巴塘县人民医院",p:"0836-5622120"}],
    road: "理塘→海子山垭口约85km缓上坡，垭口后约80km超长下坡至巴塘（海拔2580m）。",
    dangers: ["80km连续下坡！刹车容易过热", "海子山垭口附近可能有野生动物"],
    tips: ["点刹！点刹！点刹！不要一直捏刹车", "姊妹湖是G318标志性景观，必停拍照", "巴塘海拔低（2580m），好好休整恢复"]
  },
  6: {
    title: "D6 巴塘 → 芒康 (110km)",
    acc: [{n:"茶马古道客栈",p:"","pr":"50-80元",t:"进藏后首个大站，可补充物资"},
          {n:"芒康青年旅舍",p:"","pr":"50-80元"}],
    food: [{n:"金沙江大桥",t:"过桥前有四川侧的小吃摊"}],
    repair: [{n:"芒康县城",t:"有修车铺"}],
    hosp: [{n:"芒康县人民医院",p:"0895-4542120"}],
    road: "巴塘→金沙江大桥约30km缓下坡（进入西藏）→爬宗巴拉山（4150m）→芒康。",
    dangers: ["金沙江大桥检查站需登记身份证和边防证", "进入西藏后路况可能变差"],
    tips: ["在金沙江大桥检查站提前准备好身份证", "过桥后正式进入西藏，路况可能变差", "宗巴拉山爬坡约40km，备足水"]
  },
  7: {
    title: "D7 芒康 → 左贡 (160km)",
    acc: [{n:"左贡骑行客栈",p:"","pr":"60-100元",t:"价格稍高但条件较好，可洗衣充电"},
          {n:"如美镇旅馆",p:"","pr":"40-60元",t:"如体力不支可在如美镇住一晚"}],
    food: [{n:"如美镇",t:"约55km处，午饭好选择"}, {n:"东达山垭口",t:"有补给点（但较贵）"}],
    repair: [{n:"左贡县城",t:"有自行车维修店"}],
    hosp: [{n:"左贡县人民医院",p:"0895-4552120"}],
    road: "翻越拉乌山(4338m)→如美镇→觉巴山(3890m)→东达山(5008m)→左贡。三座大山！",
    dangers: ["东达山5008m是川藏线最高点之一，高反风险极大", "觉巴山悬崖险道，注意落石"],
    tips: ["★全程最艰难的一日之一！4:00出发", "东达山5008m——关注高反症状", "如体力不支可在如美镇住一晚分两天走", "带足补给，三座大山能量消耗极大"]
  },
  8: {
    title: "D8 左贡 → 八宿 (200km)",
    acc: [{n:"八宿游客之家",p:"","pr":"50-80元",t:"干净卫生，有热水淋浴"},
          {n:"八宿青年旅舍",p:"","pr":"50-80元"}],
    food: [{n:"邦达镇",t:"约100km处，午饭理想选择"}, {n:"怒江桥附近",t:"有补给点"}],
    repair: [{n:"八宿县城",t:"有自行车维修店"}],
    hosp: [{n:"八宿县人民医院",p:"0895-4562120"}],
    road: "左贡→邦达(4120m)约100km平缓起伏→业拉山(4658m)→怒江72拐→八宿。",
    dangers: ["怒江72拐是川藏线最危险路段之一！弯急坡陡", "72拐下坡需极度谨慎"],
    tips: ["72拐下坡务必控制速度、检查刹车", "弯道极多，切勿越线骑行", "邦达草原非常美，可以停下来拍照"]
  },
  9: {
    title: "D9 八宿 → 波密 (220km)",
    acc: [{n:"雪山江景客栈",p:"","pr":"50-80元",t:"推窗见雪山，环境优美"},
          {n:"然乌镇旅馆",p:"","pr":"50-80元",t:"如体力不支可在然乌住一晚"}],
    food: [{n:"然乌镇",t:"约90km处，午饭好选择"}, {n:"玉普乡",t:"约150km处"}],
    repair: [{n:"波密县城",t:"有自行车维修店"}],
    hosp: [{n:"波密县人民医院",p:"0894-5422120"}],
    road: "八宿→安久拉山(4325m)约70km上坡→然乌→波密约130km缓下坡。",
    dangers: ["安久拉山下山路段可能有暗冰（尤其清晨）"],
    tips: ["然乌湖美到窒息，必停拍照！", "波密海拔低（2750m），好好休整", "这一段风景极美——雪山、森林、江河"]
  },
  10: {
    title: "D10 波密 → 八一镇 (210km)",
    acc: [{n:"林芝渡口客栈",p:"","pr":"50-100元",t:"林芝市区，选择多可好好休整"},
          {n:"鲁朗镇客栈",p:"","pr":"50-80元",t:"如累了可在鲁朗住一晚，清晨鲁朗林海特别美"}],
    food: [{n:"通麦镇",t:"约90km处，有餐馆"}, {n:"鲁朗镇",t:"鲁朗石锅鸡必吃！！约160km处"}],
    repair: [{n:"八一镇（林芝）",t:"林芝市区有专业自行车店"}],
    hosp: [{n:"林芝市人民医院",p:"0894-5833120",t:"地市级医院，条件好"}],
    road: "波密→通麦(2070m)约90km缓下坡→鲁朗(3370m)→色季拉山(4728m)→八一镇。",
    dangers: ["通麦路段雨季易塌方（已修隧道路况改善）", "色季拉山垭口风大"],
    tips: ["鲁朗石锅鸡——川藏线最著名的美食，一定不要错过", "天气好时在色季拉山垭口可远眺南迦巴瓦峰", "路程长，建议4:30出发"]
  },
  11: {
    title: "D11 八一镇 → 松多 (230km)",
    acc: [{n:"松多骑行客栈",p:"","pr":"40-60元",t:"条件简陋但充满骑行氛围，川藏线著名客栈"},
          {n:"工布江达旅馆",p:"","pr":"50-80元",t:"如体力不支可在工布江达住一晚"}],
    food: [{n:"工布江达县城",t:"约130km处，午饭好选择"}, {n:"金达镇",t:"约180km处"}],
    repair: [{n:"工布江达县城",t:"有修车铺"}],
    hosp: [{n:"工布江达县人民医院",p:"0894-5412120"}],
    road: "八一→工布江达(3440m)约130km沿尼洋河缓上坡→松多(4288m)约100km持续缓上。",
    dangers: ["230km超长距离，体力消耗大", "最后30km坡度稍大"],
    tips: ["路程极长（230km）但坡度较缓", "尽量在天亮前出发（6点前）", "松多住宿条件简陋，做好心理准备", "这是最后一站！明天就到拉萨了！"]
  },
  12: {
    title: "D12 松多 → 拉萨 (170km)",
    acc: [{n:"平措康桑青年旅舍",p:"","pr":"40-80元",t:"拉萨最著名的青旅，骑友聚集地"},
          {n:"东措国际青年旅舍",p:"","pr":"40-80元",t:"老牌青旅，氛围好"}],
    food: [{n:"墨竹工卡县城",t:"约80km处，午饭好选择"}, {n:"达孜区",t:"约130km处"}],
    repair: [{n:"拉萨市区",t:"拉萨有专业自行车店，可做长途后的保养"}],
    hosp: [{n:"拉萨市人民医院",p:"0891-6332222",t:"拉萨最好的医院之一"}],
    road: "松多→米拉山(5013m)约30km爬坡→约140km下坡和平路至拉萨。",
    dangers: ["米拉山垭口海拔5013m，注意高反", "最后一段进入拉萨市区，车多注意安全"],
    tips: ["★胜利日！！翻过最后一座5000m大山", "米拉山垭口挂满经幡，是川藏线标志性打卡点", "下坡140km直达拉萨，注意控制速度", "下午即可抵达布达拉宫广场——全程最激动的时刻！"]
  }
};

// Build practical info tab
function buildInfoTab() {
  const container = document.querySelector(".container");
  if (!container) return;
  
  // Add tab
  const tabs = document.querySelector(".tabs");
  const tabBtn = document.createElement("div");
  tabBtn.className = "tab";
  tabBtn.dataset.tab = "5";
  tabBtn.textContent = "📖 实战信息";
  tabs.appendChild(tabBtn);
  
  // Add content
  const content = document.createElement("div");
  content.className = "tab-c";
  content.dataset.tc = "5";
  
  let html = '<h3 style="color:var(--gd);font-size:1.05rem;margin-bottom:8px">📖 川藏线实战信息库</h3>';
  html += '<p style="font-size:.78rem;color:var(--mt);margin-bottom:12px">住宿电话 · 修车点 · 医疗站 · 路况情报 · 实战经验 —— 一库在手，出发不愁</p>';
  
  // Day selector
  html += '<div class="info-nav" style="display:flex;gap:4px;overflow-x:auto;margin-bottom:12px;padding-bottom:4px">';
  for (let i = 1; i <= 12; i++) {
    html += '<button class="info-day-btn" data-day="' + i + '" style="flex-shrink:0;padding:6px 12px;border-radius:6px;border:1px solid rgba(255,255,255,0.1);background:transparent;color:var(--mt);cursor:pointer;font-size:.75rem;white-space:nowrap;transition:all .2s">D' + i + '</button>';
  }
  html += '</div>';
  
  // Info display area
  html += '<div id="infoDisplay"></div>';
  
  content.innerHTML = html;
  container.appendChild(content);
  
  // Add styles
  const style = document.createElement("style");
  style.textContent = '.info-day-btn.active{background:var(--gd);color:#0a1628;border-color:var(--gd)}.info-day-btn:hover{background:rgba(212,168,67,0.15)}.info-card{background:var(--cd);border:1px solid rgba(255,255,255,0.04);border-radius:8px;padding:12px 14px;margin-bottom:10px}.info-card h4{color:var(--gd);font-size:.85rem;margin-bottom:6px}.info-card .item{display:flex;justify-content:space-between;align-items:flex-start;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.03);font-size:.78rem}.info-card .item:last-child{border-bottom:none}.info-card .item .name{color:var(--tx)}.info-card .item .phone{color:var(--bl);font-size:.7rem;white-space:nowrap}.info-card .item .price{color:var(--or);font-size:.7rem}.info-card .item .tip{color:var(--mt);font-size:.7rem;margin-top:2px;width:100%}.info-card .tag{display:inline-block;padding:1px 8px;border-radius:10px;font-size:.68rem;margin-right:4px;margin-bottom:2px}.tag-acc{background:rgba(212,168,67,0.12);color:var(--gd)}.tag-food{background:rgba(232,160,64,0.12);color:var(--or)}.tag-repair{background:rgba(106,191,106,0.12);color:var(--gr)}.tag-med{background:rgba(74,156,212,0.12);color:var(--bl)}';
  document.head.appendChild(style);
  
  // Tab click handler
  document.querySelectorAll(".tab").forEach(t => {
    t.addEventListener("click", function() {
      document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
      this.classList.add("active");
      document.querySelectorAll(".tab-c").forEach(x => x.classList.remove("active"));
      const tc = document.querySelector('[data-tc="' + this.dataset.tab + '"]');
      if (tc) tc.classList.add("active");
      if (this.dataset.tab === "5") showInfo(1);
    });
  });
  
  // Day button click handlers
  document.querySelectorAll(".info-day-btn").forEach(btn => {
    btn.addEventListener("click", function() {
      document.querySelectorAll(".info-day-btn").forEach(b => b.classList.remove("active"));
      this.classList.add("active");
      showInfo(parseInt(this.dataset.day));
    });
  });
}

function showInfo(day) {
  const data = PRACTICAL[day];
  if (!data) return;
  const display = document.getElementById("infoDisplay");
  if (!display) return;
  
  let html = '<div style="margin-bottom:8px"><strong style="color:var(--gd);font-size:.9rem">' + data.title + '</strong></div>';
  
  // Road conditions
  html += '<div class="info-card"><h4>🛣️ 路况信息</h4><div class="item"><div><div class="name">' + data.road + '</div></div></div></div>';
  
  // Tips
  html += '<div class="info-card"><h4>💡 实战贴士</h4>';
  data.tips.forEach(t => {
    html += '<div class="item"><div><div class="name">• ' + t + '</div></div></div>';
  });
  html += '</div>';
  
  // Dangers
  html += '<div class="info-card"><h4 style="color:var(--rd)">⚠️ 安全提醒</h4>';
  data.dangers.forEach(d => {
    html += '<div class="item"><div><div class="name">• ' + d + '</div></div></div>';
  });
  html += '</div>';
  
  // Accommodation
  html += '<div class="info-card"><h4>🏠 住宿推荐</h4>';
  data.acc.forEach(a => {
    html += '<div class="item"><div><div class="name">' + a.n + '</div><div class="tip">' + a.t + '</div></div><div style="text-align:right;flex-shrink:0;margin-left:8px">';
    if (a.p) html += '<div class="phone">📞 ' + a.p + '</div>';
    html += '<div class="price">' + a.pr + '</div></div></div>';
  });
  html += '</div>';
  
  // Dining
  html += '<div class="info-card"><h4>🍽️ 餐饮补给</h4>';
  data.food.forEach(f => {
    html += '<div class="item"><div><div class="name">🍴 ' + f.n + '</div><div class="tip">' + f.t + '</div></div></div>';
  });
  html += '</div>';
  
  // Repair
  html += '<div class="info-card"><h4>🔧 修车点</h4>';
  data.repair.forEach(r => {
    html += '<div class="item"><div><div class="name">🔩 ' + r.n + '</div><div class="tip">' + r.t + '</div></div></div>';
  });
  html += '</div>';
  
  // Medical
  html += '<div class="info-card"><h4>🏥 医疗点</h4>';
  data.hosp.forEach(h => {
    html += '<div class="item"><div><div class="name">🏨 ' + h.n + '</div><div class="tip">' + (h.t || "") + '</div></div><div style="flex-shrink:0;margin-left:8px">';
    if (h.p) html += '<div class="phone">📞 ' + h.p + '</div>';
    html += '</div></div>';
  });
  html += '</div>';
  
  display.innerHTML = html;
  
  // Highlight current day button
  document.querySelectorAll(".info-day-btn").forEach(b => {
    b.classList.toggle("active", parseInt(b.dataset.day) === day);
  });
}

// Initialize after DOM ready
setTimeout(buildInfoTab, 600);

// ==========================================
// v3.3: 骑行游记系统
// ==========================================
const MOODS = ["😊","😤","🥺","🏔️","🌄","🚴","💪","🔥","🌟","😭","☀️","⛰️"];

function upgradeLogs() {
  document.querySelectorAll(".day-card").forEach(card => {
    const hdr = card.querySelector(".day-header .d");
    if (!hdr) return;
    const dn = parseInt(hdr.textContent.replace("D",""));
    if (!dn) return;
    const di = card.querySelector(".detail-inner");
    if (!di) return;
    if (di.querySelector(".journal-form")) return;
    
    const ta = di.querySelector("textarea[placeholder*='记录今日']");
    if (!ta) return;
    ta.style.display = "none";
    
    const form = document.createElement("div");
    form.className = "journal-form";
    form.style.cssText = "margin:10px 0 0;padding:10px;background:rgba(0,0,0,0.15);border-radius:8px";
    form.innerHTML = 
      '<div style="display:flex;align-items:center;gap:6px;margin-bottom:6px">' +
      '<input class="jt" data-day="' + dn + '" placeholder="给今天的骑行起个标题..." style="flex:1;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:7px 10px;color:var(--tx);font-size:.82rem;font-family:inherit;outline:none">' +
      '<span class="jm" style="font-size:1.5rem;cursor:pointer" onclick="cycleMood(' + dn + ')">😊</span></div>' +
      '<textarea class="jc" placeholder="记录今天的骑行经历、路况、遇到的人、看到的风景..." rows="2" style="width:100%;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:6px;padding:7px 10px;color:var(--tx);font-size:.8rem;font-family:inherit;resize:vertical;min-height:50px;outline:none"></textarea>' +
      '<div style="display:flex;justify-content:space-between;align-items:center;margin-top:6px">' +
      '<span style="font-size:.65rem;color:var(--mt)">📸 照片功能即将上线</span>' +
      '<button class="jb" onclick="pubJournal(' + dn + ')" style="padding:5px 16px;background:var(--gd);border:none;border-radius:6px;color:#0a1628;font-size:.75rem;font-weight:600;cursor:pointer">📝 发布游记</button></div>';
    
    // Insert form after textarea
    ta.parentNode.insertBefore(form, ta.nextSibling);
    
    // Restore draft
    const dd = localStorage.getItem("jt_draft_" + dn);
    if (dd) { try {
      const d = JSON.parse(dd);
      form.querySelector(".jt").value = d.t || "";
      form.querySelector(".jc").value = d.c || "";
      form.querySelector(".jm").textContent = d.m || "😊";
    } catch(e) {} }
    
    // Auto-save draft
    form.querySelectorAll("input, textarea").forEach(el => {
      el.addEventListener("input", function() {
        const f = this.closest(".journal-form");
        localStorage.setItem("jt_draft_" + dn, JSON.stringify({
          t: f.querySelector(".jt").value,
          c: f.querySelector(".jc").value,
          m: f.querySelector(".jm").textContent
        }));
      });
    });
  });
}

function cycleMood(dn) {
  const span = document.querySelector('.jm');
  if (!span) return;
  const cur = span.textContent;
  let found = false;
  for (const m of MOODS) {
    if (found) { span.textContent = m; saveMoodDraft(dn); return; }
    if (m === cur) found = true;
  }
  span.textContent = MOODS[0];
  saveMoodDraft(dn);
}

function saveMoodDraft(dn) {
  const form = document.querySelector(".journal-form");
  if (!form) return;
  localStorage.setItem("jt_draft_" + dn, JSON.stringify({
    t: form.querySelector(".jt").value,
    c: form.querySelector(".jc").value,
    m: form.querySelector(".jm").textContent
  }));
}

function pubJournal(dn) {
  const form = document.querySelector(".journal-form");
  if (!form) return;
  const title = form.querySelector(".jt")?.value?.trim();
  const content = form.querySelector(".jc")?.value?.trim();
  const mood = form.querySelector(".jm")?.textContent || "😊";
  if (!title) { alert("请给游记起个标题"); return; }
  if (!content || content.length < 10) { alert("游记内容至少10个字"); return; }
  
  const entries = JSON.parse(localStorage.getItem("jt_entries") || "[]");
  entries.unshift({
    id: Date.now(), day: dn, title, content, mood,
    date: new Date().toISOString().slice(0,10),
    time: new Date().toLocaleTimeString("zh-CN", {hour:"2-digit",minute:"2-digit"})
  });
  localStorage.setItem("jt_entries", JSON.stringify(entries));
  form.querySelector(".jt").value = "";
  form.querySelector(".jc").value = "";
  localStorage.removeItem("jt_draft_" + dn);
  alert("🎉 游记发布成功！前往「📝 游记」标签查看");
  if (document.getElementById("journalFeed")) renderJournalFeed();
}

function renderJournalFeed() {
  const feed = document.getElementById("journalFeed");
  if (!feed) return;
  const entries = JSON.parse(localStorage.getItem("jt_entries") || "[]");
  const stat = document.getElementById("journalStat");
  if (stat) stat.textContent = entries.length + " 篇游记 · " + new Set(entries.map(e => e.day)).size + " 天";
  
  if (entries.length === 0) {
    feed.innerHTML = '<div style="text-align:center;padding:40px 20px;color:var(--mt);font-size:.9rem"><div style="font-size:3rem;margin-bottom:12px">📝</div><div>还没有发布游记</div><div style="font-size:.8rem;margin-top:6px">在「📋 行程」中展开任意一天，写下你的骑行故事吧</div></div>';
    return;
  }
  
  const days = ["成都→雅安","雅安→泸定","泸定→新都桥","新都桥→理塘","理塘→巴塘","巴塘→芒康","芒康→左贡","左贡→八宿","八宿→波密","波密→八一镇","八一镇→松多","松多→拉萨"];
  let html = "";
  
  entries.forEach(e => {
    const route = days[e.day - 1] || "";
    const preview = e.content.length > 120 ? e.content.substring(0, 120) + "..." : e.content;
    const et = e.title.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    const ec = preview.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    
    html += '<div class="je" style="background:var(--cd);border:1px solid rgba(255,255,255,0.06);border-radius:10px;padding:14px 16px;margin-bottom:10px;transition:all .2s">';
    html += '<div style="display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:6px;flex-wrap:wrap">';
    html += '<div><span style="font-size:1.2rem">' + e.mood + '</span> <strong style="color:var(--gd);font-size:.9rem">' + et + '</strong></div>';
    html += '<span style="font-size:.68rem;color:var(--mt);white-space:nowrap">D' + e.day + ' · ' + e.date + '</span></div>';
    html += '<div style="font-size:.72rem;color:var(--mt);margin-bottom:6px">' + route + '</div>';
    html += '<div style="font-size:.82rem;color:var(--tx);line-height:1.6;white-space:pre-wrap">' + ec + '</div>';
    html += '<div style="display:flex;gap:8px;margin-top:8px">';
    html += '<button class="jee" onclick="expandEntry(' + e.id + ')" style="padding:3px 10px;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:transparent;color:var(--mt);cursor:pointer;font-size:.7rem">📖 阅读全文</button>';
    html += '<button onclick="shareEntry(' + e.id + ')" style="padding:3px 10px;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:transparent;color:var(--mt);cursor:pointer;font-size:.7rem">📤 分享</button>';
    html += '<button onclick="delEntry(' + e.id + ')" style="padding:3px 10px;border-radius:4px;border:1px solid rgba(255,255,255,0.1);background:transparent;color:var(--mt);cursor:pointer;font-size:.7rem;margin-left:auto">🗑️</button>';
    html += '</div></div>';
  });
  
  feed.innerHTML = html;
}

function expandEntry(id) {
  const entries = JSON.parse(localStorage.getItem("jt_entries") || "[]");
  const e = entries.find(x => x.id === id);
  if (!e) return;
  const days = ["成都→雅安","雅安→泸定","泸定→新都桥","新都桥→理塘","理塘→巴塘","巴塘→芒康","芒康→左贡","左贡→八宿","八宿→波密","波密→八一镇","八一镇→松多","松多→拉萨"];
  const route = days[e.day - 1] || "";
  const et = e.title.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const ec = e.content.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  
  const w = 700, h = 800;
  const lines = [];
  const cl = 30;
  for (let i = 0; i < ec.length; i += cl) lines.push(ec.substring(i, i + cl));
  const ml = Math.min(lines.length, 26);
  
  let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '"><rect width="' + w + '" height="' + h + '" fill="#0a1628" rx="12"/>';
  svg += '<rect x="15" y="15" width="670" height="770" rx="10" fill="none" stroke="#d4a843" stroke-width="1" opacity="0.2"/>';
  svg += '<text x="40" y="60" font-size="28">' + e.mood + '</text>';
  svg += '<text x="40" y="100" fill="#d4a843" font-size="22" font-weight="bold" font-family="sans-serif">' + et + '</text>';
  svg += '<text x="40" y="130" fill="#607888" font-size="13" font-family="sans-serif">D' + e.day + ' · ' + route + ' · ' + e.date + '</text>';
  svg += '<line x1="40" y1="150" x2="660" y2="150" stroke="rgba(255,255,255,0.06)"/>';
  for (let i = 0; i < ml; i++) {
    svg += '<text x="40" y="' + (185 + i * 22) + '" fill="#b0c4d8" font-size="14" font-family="sans-serif">' + lines[i] + '</text>';
  }
  if (lines.length > ml) svg += '<text x="40" y="' + (185 + ml * 22) + '" fill="#607888" font-size="13">......</text>';
  svg += '<text x="350" y="740" text-anchor="middle" fill="rgba(212,168,67,0.3)" font-size="12" font-style="italic" font-family="sans-serif">「路在轮下，心在天上」</text></svg>';
  
  const lb = document.getElementById("lbi");
  const lc = document.getElementById("lbc");
  if (lb && lc) {
    lb.src = "data:image/svg+xml," + encodeURIComponent(svg);
    document.getElementById("lb").classList.add("show");
    lc.textContent = "📖 " + e.title;
  }
}

function shareEntry(id) {
  const entries = JSON.parse(localStorage.getItem("jt_entries") || "[]");
  const e = entries.find(x => x.id === id);
  if (!e) return;
  const days = ["成都→雅安","雅安→泸定","泸定→新都桥","新都桥→理塘","理塘→巴塘","巴塘→芒康","芒康→左贡","左贡→八宿","八宿→波密","波密→八一镇","八一镇→松多","松多→拉萨"];
  const route = days[e.day - 1] || "";
  const txt = e.mood + " D" + e.day + " " + route + "\n「" + e.title + "」\n\n" + e.content.substring(0, 200) + "\n\n🚴 川藏线骑行社区";
  navigator.clipboard.writeText(txt).then(() => alert("📤 已复制，可以分享到朋友圈了！")).catch(() => prompt("复制:", txt));
}

function delEntry(id) {
  if (!confirm("确定删除？")) return;
  let entries = JSON.parse(localStorage.getItem("jt_entries") || "[]");
  entries = entries.filter(e => e.id !== id);
  localStorage.setItem("jt_entries", JSON.stringify(entries));
  renderJournalFeed();
}

function buildJournalTab() {
  const container = document.querySelector(".container");
  if (!container) return;
  const tabs = document.querySelector(".tabs");
  const btn = document.createElement("div");
  btn.className = "tab"; btn.dataset.tab = "6"; btn.textContent = "📝 游记";
  tabs.appendChild(btn);
  
  const content = document.createElement("div");
  content.className = "tab-c"; content.dataset.tc = "6";
  content.innerHTML = '<h3 style="color:var(--gd);font-size:1rem;margin-bottom:4px">📝 骑行游记</h3><p style="font-size:.75rem;color:var(--mt);margin-bottom:10px" id="journalStat">加载中...</p><div id="journalFeed"></div>';
  container.appendChild(content);
  
  const s = document.createElement("style");
  s.textContent = '.je:hover{border-color:rgba(212,168,67,0.2)!important;background:rgba(255,255,255,0.06)!important}.jee:hover{background:rgba(212,168,67,0.1)!important;border-color:rgba(212,168,67,0.2)!important;color:var(--gd)!important}';
  document.head.appendChild(s);
  
  renderJournalFeed();
  
  document.querySelectorAll(".tab").forEach(t => {
    t.addEventListener("click", function() {
      document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
      this.classList.add("active");
      document.querySelectorAll(".tab-c").forEach(x => x.classList.remove("active"));
      const tc = document.querySelector('[data-tc="' + this.dataset.tab + '"]');
      if (tc) { tc.classList.add("active"); if (this.dataset.tab === "6") renderJournalFeed(); }
    });
  });
}

// Init after DOM ready
setTimeout(function() { upgradeLogs(); buildJournalTab(); }, 900);
// ==========================================
// v3.4: 社区社交互动
// ==========================================

// Community activity storage
function getActs() { return JSON.parse(localStorage.getItem("com_acts") || "[]"); }
function addAct(type, data) {
  const acts = getActs();
  acts.unshift({ id: Date.now(), type, data, time: Date.now() });
  if (acts.length > 200) acts.length = 200;
  localStorage.setItem("com_acts", JSON.stringify(acts));
}

// Track journal likes
function toggleLike(jid) {
  const likes = JSON.parse(localStorage.getItem("com_likes") || "{}");
  if (likes[jid]) { delete likes[jid]; } else { likes[jid] = true; }
  localStorage.setItem("com_likes", JSON.stringify(likes));
  updateLikeBtn(jid);
  return !!likes[jid];
}
function isLiked(jid) { const likes = JSON.parse(localStorage.getItem("com_likes") || "{}"); return !!likes[jid]; }
function likeCount(jid) { return isLiked(jid) ? 1 : 0; }
function updateLikeBtn(jid) {
  const btn = document.querySelector('.like-btn[data-id="' + jid + '"]');
  if (btn) {
    const liked = isLiked(jid);
    btn.textContent = (liked ? "❤️" : "🤍") + " " + (liked ? 1 : 0);
    btn.style.color = liked ? "var(--rd)" : "var(--mt)";
  }
}

// Community feed
function buildComFeed() {
  const container = document.querySelector(".container");
  if (!container) return;
  
  // Tab
  const tabs = document.querySelector(".tabs");
  const btn = document.createElement("div");
  btn.className = "tab"; btn.dataset.tab = "7"; btn.textContent = "🌐 社区";
  tabs.appendChild(btn);
  
  // Content
  const content = document.createElement("div");
  content.className = "tab-c"; content.dataset.tc = "7";
  content.innerHTML = '<h3 style="color:var(--gd);font-size:1rem;margin-bottom:6px">🌐 社区动态</h3><p style="font-size:.75rem;color:var(--mt);margin-bottom:10px">骑行者的故事和足迹</p><div id="comFeed"></div>';
  container.appendChild(content);
  
  // Tab handler
  document.querySelectorAll(".tab").forEach(t => {
    t.addEventListener("click", function() {
      document.querySelectorAll(".tab").forEach(x => x.classList.remove("active"));
      this.classList.add("active");
      document.querySelectorAll(".tab-c").forEach(x => x.classList.remove("active"));
      const tc = document.querySelector('[data-tc="' + this.dataset.tab + '"]');
      if (tc) { tc.classList.add("active"); if (this.dataset.tab === "7") renderComFeed(); }
    });
  });
  
  renderComFeed();
}

function renderComFeed() {
  const feed = document.getElementById("comFeed");
  if (!feed) return;
  
  const entries = JSON.parse(localStorage.getItem("jt_entries") || "[]");
  const progress = parseInt(localStorage.getItem("prog") || "0");
  const days = ["成都→雅安","雅安→泸定","泸定→新都桥","新都桥→理塘","理塘→巴塘","巴塘→芒康","芒康→左贡","左贡→八宿","八宿→波密","波密→八一镇","八一镇→松多","松多→拉萨"];
  
  let html = '';
  
  // Community stats
  const totalReviews = Object.keys(JSON.parse(localStorage.getItem("my_rvs") || "{}")).length;
  const totalLikes = Object.keys(JSON.parse(localStorage.getItem("com_likes") || "{}")).length;
  
  html += '<div class="com-stats" style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px">';
  html += '<div class="com-stat" style="flex:1;min-width:80px;background:var(--cd);border:1px solid rgba(255,255,255,0.04);border-radius:8px;padding:10px;text-align:center"><div style="font-size:1.1rem;font-weight:700;color:var(--gd)">' + entries.length + '</div><div style="font-size:.68rem;color:var(--mt)">游记</div></div>';
  html += '<div class="com-stat" style="flex:1;min-width:80px;background:var(--cd);border:1px solid rgba(255,255,255,0.04);border-radius:8px;padding:10px;text-align:center"><div style="font-size:1.1rem;font-weight:700;color:var(--gd)">' + progress + '/12</div><div style="font-size:.68rem;color:var(--mt)">已完成</div></div>';
  html += '<div class="com-stat" style="flex:1;min-width:80px;background:var(--cd);border:1px solid rgba(255,255,255,0.04);border-radius:8px;padding:10px;text-align:center"><div style="font-size:1.1rem;font-weight:700;color:var(--gd)">' + totalLikes + '</div><div style="font-size:.68rem;color:var(--mt)">点赞</div></div>';
  html += '<div class="com-stat" style="flex:1;min-width:80px;background:var(--cd);border:1px solid rgba(255,255,255,0.04);border-radius:8px;padding:10px;text-align:center"><div style="font-size:1.1rem;font-weight:700;color:var(--gd)">1</div><div style="font-size:.68rem;color:var(--mt)">骑行勇士</div></div>';
  html += '</div>';
  
  // Activity feed
  html += '<div class="com-act" style="margin-bottom:8px"><strong style="color:var(--bl);font-size:.82rem">📌 最新动态</strong></div>';
  
  if (entries.length === 0 && progress === 0) {
    html += '<div style="text-align:center;padding:30px;color:var(--mt);font-size:.85rem">还没有动态<br><span style="font-size:.75rem">开始你的骑行打卡，写下游记，这里就会热闹起来</span></div>';
    feed.innerHTML = html;
    return;
  }
  
  // Recent progress (show last completed day)
  if (progress > 0) {
    const lastDay = Math.min(progress, 12);
    const route = days[lastDay - 1] || "";
    html += '<div class="act-item" style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:var(--cd);border:1px solid rgba(255,255,255,0.04);border-radius:8px;margin-bottom:6px;font-size:.8rem">';
    html += '<span style="font-size:1.2rem">✅</span>';
    html += '<div style="flex:1"><strong style="color:var(--gd)">完成第' + lastDay + '天打卡</strong><br><span style="font-size:.7rem;color:var(--mt)">' + route + '</span></div>';
    html += '<span style="font-size:.65rem;color:var(--mt)">刚刚</span></div>';
  }
  
  // Recent journals
  entries.slice(0, 10).forEach(e => {
    const route = days[e.day - 1] || "";
    const et = e.title.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
    const ec = e.content.substring(0, 80).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;") + "..." || "";
    const liked = isLiked(e.id);
    
    html += '<div class="act-item" style="padding:10px 12px;background:var(--cd);border:1px solid rgba(255,255,255,0.04);border-radius:8px;margin-bottom:6px">';
    html += '<div style="display:flex;align-items:flex-start;gap:8px">';
    html += '<span style="font-size:1.3rem">' + e.mood + '</span>';
    html += '<div style="flex:1"><strong style="color:var(--gd);font-size:.82rem">' + et + '</strong>';
    html += '<div style="font-size:.7rem;color:var(--mt)">D' + e.day + ' · ' + route + ' · ' + e.date + '</div>';
    html += '<div style="font-size:.75rem;color:var(--tx);margin-top:4px">' + ec + '</div></div></div>';
    html += '<div style="display:flex;gap:12px;margin-top:6px;padding-left:28px">';
    html += '<button class="like-btn" data-id="' + e.id + '" onclick="likeJournal(' + e.id + ')" style="background:none;border:none;cursor:pointer;font-size:.75rem;color:' + (liked ? "var(--rd)" : "var(--mt)") + '">' + (liked ? "❤️" : "🤍") + ' ' + (liked ? 1 : 0) + '</button>';
    html += '<button onclick="readJournal(' + e.id + ')" style="background:none;border:none;cursor:pointer;font-size:.75rem;color:var(--bl)">📖 阅读</button>';
    html += '<button onclick="shareEntry(' + e.id + ')" style="background:none;border:none;cursor:pointer;font-size:.75rem;color:var(--mt);margin-left:auto">📤 分享</button>';
    html += '</div></div>';
  });
  
  if (progress === 0 && entries.length > 0) {
    html += '<div style="text-align:center;padding:20px;color:var(--mt);font-size:.75rem">—— 没有更多动态了 ——</div>';
  }
  
  feed.innerHTML = html;
}

function likeJournal(jid) {
  toggleLike(jid);
  renderComFeed();
  // Also update individual like buttons on journal entries
}

function readJournal(jid) {
  expandEntry(jid);
}

// Override pubJournal to also add to activity
const origPub = window.pubJournal;
window.pubJournal = function(dn) {
  const form = document.querySelector(".journal-form");
  if (!form) return;
  const title = form.querySelector(".jt")?.value?.trim();
  const content = form.querySelector(".jc")?.value?.trim();
  const mood = form.querySelector(".jm")?.textContent || "😊";
  if (!title) { alert("请给游记起个标题"); return; }
  if (!content || content.length < 10) { alert("游记内容至少10个字"); return; }
  
  const entries = JSON.parse(localStorage.getItem("jt_entries") || "[]");
  const entry = { id: Date.now(), day: dn, title, content, mood,
    date: new Date().toISOString().slice(0,10),
    time: new Date().toLocaleTimeString("zh-CN", {hour:"2-digit",minute:"2-digit"})
  };
  entries.unshift(entry);
  localStorage.setItem("jt_entries", JSON.stringify(entries));
  
  form.querySelector(".jt").value = "";
  form.querySelector(".jc").value = "";
  localStorage.removeItem("jt_draft_" + dn);
  
  alert("🎉 游记发布成功！已同步到社区动态");
  if (document.getElementById("journalFeed")) renderJournalFeed();
  if (document.getElementById("comFeed")) renderComFeed();
};

// Override checkAllCompleted to add activity
if (window.ca) {
  const origCa = window.ca;
  window.ca = function(n) {
    origCa(n);
    if (document.getElementById("comFeed")) renderComFeed();
  };
}

// Init
setTimeout(function() { buildComFeed(); }, 1000);// ==========================================
// v3.5: 视觉焕新 — 交互与设计升级
// ==========================================

(function() {

// 1. 注入增强样式
const style = document.createElement("style");
style.textContent = `
/* === 视觉升级 v3.5 === */

/* 滚动动画 */
.ani-fade { opacity: 0; transform: translateY(24px); transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1); }
.ani-fade.show { opacity: 1; transform: translateY(0); }

/* Hero 增强 */
.hero { position: relative; }
.hero::after { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; 
  background: repeating-linear-gradient(45deg, transparent, transparent 100px, rgba(212,168,67,0.015) 100px, rgba(212,168,67,0.015) 200px);
  pointer-events: none; }
.tagline { position: relative; display: inline-block; }
.tagline::before, .tagline::after { content: '——'; color: rgba(212,168,67,0.3); margin: 0 8px; }

/* 玻璃卡片 */
.stat-card { transition: transform 0.3s ease, box-shadow 0.3s ease; position: relative; overflow: hidden; }
.stat-card::before { content: ''; position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; 
  background: radial-gradient(circle at 30% 30%, rgba(212,168,67,0.03) 0%, transparent 50%); pointer-events: none; }
.stat-card:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 8px 30px rgba(212,168,67,0.1); }

/* 标签页增强 */
.tab { position: relative; overflow: hidden; }
.tab::after { content: ''; position: absolute; bottom: 0; left: 50%; width: 0; height: 2px; 
  background: var(--gd); transition: all 0.3s ease; transform: translateX(-50%); }
.tab.active::after { width: 60%; }
.tab:hover:not(.active) { background: rgba(255,255,255,0.06); }

/* 行程卡片增强 */
.dc { transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1); position: relative; overflow: hidden; }
.dc::before { content: ''; position: absolute; top: 0; left: -100%; width: 100%; height: 100%; 
  background: linear-gradient(90deg, transparent, rgba(212,168,67,0.03), transparent); 
  transition: left 0.8s ease; pointer-events: none; }
.dc:hover::before { left: 100%; }
.dc:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.15); }

/* 难度标记闪亮效果 */
.dd { position: relative; }
.dd::after { content: ''; position: absolute; width: 6px; height: 6px; border-radius: 50%; 
  background: currentColor; bottom: -2px; left: 50%; transform: translateX(-50%); opacity: 0.5; }

/* 进度条动画 */
.pf { position: relative; overflow: hidden; }
.pf::after { content: ''; position: absolute; top: 0; left: -20%; width: 40%; height: 100%; 
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent); 
  animation: shimmer 2s infinite; }
@keyframes shimmer { 0% { left: -20%; } 100% { left: 120%; } }

/* 分享按钮悬停 */
.share-btn { transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1) !important; }
.share-btn:hover { transform: translateY(-3px) scale(1.04) !important; box-shadow: 0 6px 20px rgba(0,0,0,0.2); }

/* 地图悬停增强 */
.map-s { transition: box-shadow 0.3s ease; }
.map-s:hover { box-shadow: 0 6px 30px rgba(212,168,67,0.08); }

/* 数量统计脉冲 */
.stat-card .num { display: inline-block; }
.stat-card:hover .num { animation: pulse 0.6s ease; }
@keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }

/* 底部渐变分隔 */
.ft { position: relative; }
.ft::before { content: ''; position: absolute; top: -2px; left: 20%; right: 20%; height: 1px; 
  background: linear-gradient(90deg, transparent, var(--gd), transparent); opacity: 0.15; }

/* 装备列表美化 */
.gi { transition: all 0.2s ease; }
.gi:hover { border-color: rgba(212,168,67,0.15) !important; }
.gi input:checked + span { text-decoration: line-through; opacity: 0.6; }

/* 游记卡片美化 */
.je { transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1) !important; }
.je:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.1); }

/* 成就徽章悬停 */
.ach { transition: all 0.3s ease; }
.ach:hover { transform: translateY(-4px); box-shadow: 0 6px 20px rgba(212,168,67,0.15); }
.ach.unlocked { animation: badgeGlow 2s ease infinite; }
@keyframes badgeGlow { 0%, 100% { box-shadow: 0 0 10px rgba(212,168,67,0.1); } 50% { box-shadow: 0 0 20px rgba(212,168,67,0.2); } }

/* 实战信息卡片 */
.info-card { transition: all 0.3s ease; }
.info-card:hover { border-color: rgba(212,168,67,0.1) !important; }

/* 信息导航按钮 */
.info-day-btn { transition: all 0.25s ease; }
.info-day-btn:hover:not(.active) { border-color: rgba(212,168,67,0.25); color: var(--tx); }

/* 社区动态项 */
.act-item { transition: all 0.25s ease; }
.act-item:hover { border-color: rgba(212,168,67,0.08) !important; }

/* 点赞按钮 */
.like-btn { transition: all 0.2s ease !important; }
.like-btn:hover { transform: scale(1.15); }

/* 完成打卡美化 */
.chk input { transition: all 0.2s ease; }
.chk input:checked { transform: scale(1.1); }

/* 灯箱导航按钮 */
.lb .bn button { transition: all 0.25s ease; }
.lb .bn button:hover { background: rgba(255,255,255,0.18) !important; transform: translateY(-1px); }

/* 移动端优化 */
@media (max-width: 700px) {
  .dc { margin-bottom: 8px; }
  .stat-card { padding: 8px 12px; }
  .tab { padding: 6px 8px; font-size: 0.7rem; white-space: nowrap; }
  .tabs { gap: 2px; padding: 3px; }
  .hero h1 { font-size: 1.3rem; }
  .dh { padding: 8px 10px; }
  .di { padding: 0 10px 10px; }
  .like-btn { font-size: 0.7rem !important; }
}

/* 打印证书样式 */
@media print {
  body { background: #fff !important; }
  .hero, .tabs, .share-bar, .ft { display: none !important; }
}
`;
document.head.appendChild(style);

// 2. 滚动动画
function initScrollAnim() {
  const items = document.querySelectorAll(".dc, .stat-card, .je, .act-item, .info-card, .tipc, .er, .ach");
  items.forEach(el => {
    el.classList.add("ani-fade");
    // Check if already visible
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add("show");
  });
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05, rootMargin: "0px 0px -40px 0px" });
  
  document.querySelectorAll(".ani-fade").forEach(el => observer.observe(el));
}

// 3. 交互式路线图增强
function enhanceMap() {
  const map = document.querySelector(".map-s svg");
  if (!map) return;
  
  // Add data-tooltip to route circles
  const circles = map.querySelectorAll("circle");
  circles.forEach(c => {
    c.style.cursor = "pointer";
    c.style.transition = "r 0.2s ease, fill-opacity 0.2s ease";
    
    c.addEventListener("mouseenter", function() {
      this.setAttribute("r", "8");
    });
    c.addEventListener("mouseleave", function() {
      this.setAttribute("r", "6");
    });
  });
  
  // Make route path more visible
  const paths = map.querySelectorAll("path");
  paths.forEach(p => {
    if (!p.getAttribute("stroke-dasharray")) return;
    p.style.transition = "stroke-opacity 0.3s ease";
    p.addEventListener("mouseenter", function() {
      this.setAttribute("stroke-opacity", "0.6");
    });
    p.addEventListener("mouseleave", function() {
      this.setAttribute("stroke-opacity", "0.3");
    });
  });
}

// 4. 动态数字滚动
function animateNums() {
  document.querySelectorAll(".stat-card .num").forEach(el => {
    const text = el.textContent;
    const num = parseFloat(text.replace(/,/g, ""));
    if (isNaN(num)) return;
    const isKm = text.includes("2,120");
    const duration = 1500;
    const start = performance.now();
    
    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * num * 10) / 10;
      
      if (isKm) {
        el.textContent = Math.round(current).toLocaleString();
      } else {
        el.textContent = Math.round(current).toLocaleString();
      }
      
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = text;
    }
    requestAnimationFrame(update);
  });
}

// 5. 页面加载完成后的初始化
function initVisualEnhance() {
  setTimeout(() => {
    initScrollAnim();
    enhanceMap();
    animateNums();
  }, 100);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initVisualEnhance);
} else {
  initVisualEnhance();
}

// Re-run animations when tabs change
document.addEventListener("click", function(e) {
  const tab = e.target.closest(".tab");
  if (tab) {
    setTimeout(initScrollAnim, 400);
  }
});

console.log("✨ 视觉焕新 v3.5 已加载");
})();// ==========================================
// v3.6: 数据导出导入系统
// ==========================================

const DATA_KEYS = ["jt_entries","prog","gear","my_rvs","com_likes","com_acts"];
const DATA_PREFIXES = ["log_","rate_","jt_draft_"];

function collectData() {
  const data = { version: "3.6", exported: new Date().toISOString(), app: "川藏线G318骑行社区" };
  DATA_KEYS.forEach(k => {
    const v = localStorage.getItem(k);
    if (v) data[k] = JSON.parse(v);
  });
  // Collect prefixed keys
  data.prefixed = {};
  DATA_PREFIXES.forEach(prefix => {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) {
        if (!data.prefixed[prefix]) data.prefixed[prefix] = {};
        data.prefixed[prefix][key] = localStorage.getItem(key);
      }
    }
  });
  return data;
}

function showDataSummary(data) {
  const entries = data.jt_entries ? data.jt_entries.length : 0;
  const progress = data.prog || 0;
  const reviews = data.my_rvs ? Object.keys(data.my_rvs).length : 0;
  const logs = data.prefixed && data.prefixed["log_"] ? Object.keys(data.prefixed["log_"]).length : 0;
  const likes = data.com_likes ? Object.keys(data.com_likes).length : 0;
  const gear = data.gear ? Object.keys(data.gear).length : 0;
  return { entries, progress, reviews, logs, likes, gear, total: entries + progress + reviews + logs + likes + gear };
}

function exportData() {
  const data = collectData();
  const summary = showDataSummary(data);
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "川藏线骑行数据_" + new Date().toISOString().slice(0,10) + ".json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  
  updateDataStats();
  alert("✅ 数据已导出！\n\n包含：游记 " + summary.entries + " 篇 · 打卡 " + summary.progress + "/12 · 点评 " + summary.reviews + " 条\n       日志 " + summary.logs + " 篇 · 点赞 " + summary.likes + " 个\n\n文件名：" + a.download);
}

function importData() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".json";
  input.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      try {
        const data = JSON.parse(ev.target.result);
        if (!data.version) { alert("❌ 无效的数据文件"); return; }
        
        // Confirm
        const summary = showDataSummary(data);
        if (!confirm("即将导入以下数据：\n\n游记 " + summary.entries + " 篇\n打卡进度 " + summary.progress + "/12\n点评 " + summary.reviews + " 条\n日志 " + summary.logs + " 篇\n点赞 " + summary.likes + " 个\n\n⚠️ 将覆盖当前设备上的同类型数据，是否继续？")) return;
        
        // Import
        DATA_KEYS.forEach(k => {
          if (data[k] !== undefined) {
            localStorage.setItem(k, JSON.stringify(data[k]));
          }
        });
        if (data.prefixed) {
          Object.entries(data.prefixed).forEach(([prefix, items]) => {
            Object.entries(items).forEach(([key, val]) => {
              localStorage.setItem(key, val);
            });
          });
        }
        
        updateDataStats();
        alert("🎉 数据导入成功！\n\n已导入 " + summary.total + " 项数据。\n\n刷新页面查看完整效果。");
        location.reload();
      } catch(err) {
        alert("❌ 文件解析失败：" + err.message);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function clearAllData() {
  if (!confirm("⚠️ 确定要清除所有数据？\n\n这将删除所有游记、打卡记录、点评、日志、点赞。\n此操作不可撤销！")) return;
  if (!confirm("⚠️ 再次确认：真的要清除所有数据吗？")) return;
  
  DATA_KEYS.forEach(k => localStorage.removeItem(k));
  DATA_PREFIXES.forEach(prefix => {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(prefix)) keys.push(key);
    }
    keys.forEach(k => localStorage.removeItem(k));
  });
  
  updateDataStats();
  alert("🗑️ 所有数据已清除。刷新页面后生效。");
  location.reload();
}

function updateDataStats() {
  const stat = document.getElementById("dataStat");
  if (!stat) return;
  const data = collectData();
  const s = showDataSummary(data);
  stat.innerHTML = 
    '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:6px;margin-top:8px">' +
    '<div style="background:var(--cd);padding:6px;border-radius:6px;text-align:center"><div style="font-size:1rem;font-weight:700;color:var(--gd)">' + s.entries + '</div><div style="font-size:.65rem;color:var(--mt)">游记</div></div>' +
    '<div style="background:var(--cd);padding:6px;border-radius:6px;text-align:center"><div style="font-size:1rem;font-weight:700;color:var(--gd)">' + s.progress + '/12</div><div style="font-size:.65rem;color:var(--mt)">打卡</div></div>' +
    '<div style="background:var(--cd);padding:6px;border-radius:6px;text-align:center"><div style="font-size:1rem;font-weight:700;color:var(--gd)">' + s.reviews + '</div><div style="font-size:.65rem;color:var(--mt)">点评</div></div>' +
    '<div style="background:var(--cd);padding:6px;border-radius:6px;text-align:center"><div style="font-size:1rem;font-weight:700;color:var(--gd)">' + s.logs + '</div><div style="font-size:.65rem;color:var(--mt)">日志</div></div>' +
    '<div style="background:var(--cd);padding:6px;border-radius:6px;text-align:center"><div style="font-size:1rem;font-weight:700;color:var(--gd)">' + s.likes + '</div><div style="font-size:.65rem;color:var(--mt)">点赞</div></div>' +
    '<div style="background:var(--cd);padding:6px;border-radius:6px;text-align:center"><div style="font-size:1rem;font-weight:700;color:var(--gd)">' + s.gear + '</div><div style="font-size:.65rem;color:var(--mt)">装备</div></div>' +
    '</div>';
}

function buildDataUI() {
  // Add data management section to the 信息 tab
  const infoTab = document.querySelector('[data-tc="2"]');
  if (!infoTab) return;
  
  const section = document.createElement("div");
  section.className = "kb-section";
  section.style.marginTop = "20px";
  section.innerHTML = 
    '<h3 style="color:var(--gd);font-size:1rem;margin-bottom:8px">💾 数据管理</h3>' +
    '<p style="font-size:.75rem;color:var(--mt);margin-bottom:8px">导出数据到文件，换设备时导入即可恢复全部数据</p>' +
    '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:8px">' +
    '<button onclick="exportData()" style="flex:1;padding:8px 14px;background:var(--gd);border:none;border-radius:8px;color:#0a1628;font-size:.8rem;font-weight:600;cursor:pointer;transition:transform .2s">📤 导出数据</button>' +
    '<button onclick="importData()" style="flex:1;padding:8px 14px;background:var(--bl);border:none;border-radius:8px;color:#fff;font-size:.8rem;font-weight:600;cursor:pointer;transition:transform .2s">📥 导入数据</button>' +
    '</div>' +
    '<button onclick="clearAllData()" style="padding:5px 12px;background:transparent;border:1px solid rgba(232,93,93,0.3);border-radius:6px;color:var(--rd);font-size:.72rem;cursor:pointer;transition:all .2s">🗑️ 清除所有数据</button>' +
    '<div id="dataStat" style="margin-top:4px"></div>';
  
  infoTab.appendChild(section);
  updateDataStats();
}

// Init
setTimeout(buildDataUI, 700);// ==========================================
// v3.7: 功能融合 — 打通模块间连接
// ==========================================

(function() {

// 1. 路线图交互 — 点击节点跳转到对应行程
function enableMapClicks() {
  const mapSvg = document.querySelector(".map-s svg");
  if (!mapSvg) return;
  
  const circles = mapSvg.querySelectorAll("circle");
  const DAY_LABELS = ["雅安","泸定","新都桥","理塘","巴塘","芒康","左贡","八宿","波密","八一镇","松多","拉萨"];
  const DAY_KM = [140,135,130,200,190,110,160,200,220,210,230,170];
  
  circles.forEach((c, idx) => {
    if (idx >= 12) return;
    c.style.cursor = "pointer";
    c.title = "D" + (idx+1) + "：" + DAY_LABELS[idx] + "（" + DAY_KM[idx] + "km）";
    
    c.addEventListener("click", function(e) {
      e.stopPropagation();
      jumpToDay(idx + 1);
    });
  });
  
  // Also make route labels clickable
  const texts = mapSvg.querySelectorAll("text");
  texts.forEach(t => {
    const txt = t.textContent.trim();
    DAY_LABELS.forEach((label, idx) => {
      if (txt === label || txt.includes(label)) {
        t.style.cursor = "pointer";
        t.addEventListener("click", function(e) {
          e.stopPropagation();
          jumpToDay(idx + 1);
        });
      }
    });
  });
}

function jumpToDay(day) {
  // Navigate to 行程 tab
  const tabs = document.querySelectorAll(".tab");
  const dayTab = tabs[1]; // 行程 tab
  if (dayTab) dayTab.click();
  
  // Open the specific day card
  setTimeout(() => {
    const cards = document.querySelectorAll(".dc");
    const target = cards[day - 1];
    if (target) {
      // Close other cards
      cards.forEach(c => c.classList.remove("open"));
      // Open target
      target.classList.add("open");
      target.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, 400);
}

// 2. 游记路线标签
function enhanceJournalCards() {
  const days = ["成都→雅安","雅安→泸定","泸定→新都桥","新都桥→理塘","理塘→巴塘","巴塘→芒康","芒康→左贡","左贡→八宿","八宿→波密","波密→八一镇","八一镇→松多","松多→拉萨"];
  
  // Enhance journal feed entries
  const observer = new MutationObserver(() => {
    document.querySelectorAll(".je").forEach(card => {
      if (card.querySelector(".route-chip")) return;
      const text = card.textContent || "";
      let foundDay = 0;
      for (let i = 1; i <= 12; i++) {
        if (text.includes("D" + i)) { foundDay = i; break; }
      }
      if (foundDay) {
        const chip = document.createElement("span");
        chip.className = "route-chip";
        chip.style.cssText = "display:inline-block;padding:2px 8px;border-radius:10px;font-size:.65rem;background:rgba(212,168,67,0.12);color:var(--gd);cursor:pointer;margin-left:6px";
        chip.textContent = "📍 " + days[foundDay - 1];
        chip.title = "点击查看该日行程";
        chip.onclick = function(e) {
          e.stopPropagation();
          jumpToDay(foundDay);
        };
        const titleEl = card.querySelector("strong");
        if (titleEl) titleEl.parentNode.appendChild(chip);
      }
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

// 3. 一键跳转：信息 → 实战信息
function addContextLinks() {
  // Add "查看实战信息" link in day cards
  document.querySelectorAll(".dc").forEach((card, idx) => {
    const day = idx + 1;
    const detailInner = card.querySelector(".detail-inner");
    if (!detailInner) return;
    if (detailInner.querySelector(".quick-link")) return;
    
    const link = document.createElement("div");
    link.className = "quick-link";
    link.style.cssText = "margin:8px 0 0;font-size:.75rem";
    link.innerHTML = '<span style="color:var(--mt)">🔗 </span>' +
      '<a href="javascript:void(0)" onclick="gotoInfo(' + day + ')" style="color:var(--bl);text-decoration:none">查看D' + day + '实战信息 →</a>' +
      ' <span style="color:var(--mt)">|</span> ' +
      '<a href="javascript:void(0)" onclick="gotoJournal(' + day + ')" style="color:var(--gd);text-decoration:none">写游记 →</a>';
    
    detailInner.appendChild(link);
  });
}

function gotoInfo(day) {
  const tabs = document.querySelectorAll(".tab");
  const infoTab = tabs[5]; // 实战信息 tab
  if (infoTab) infoTab.click();
  setTimeout(() => {
    const btns = document.querySelectorAll(".info-day-btn");
    const target = btns[day - 1];
    if (target) target.click();
  }, 300);
}

function gotoJournal(day) {
  const tabs = document.querySelectorAll(".tab");
  const journalTab = tabs[6]; // 游记 tab
  if (journalTab) journalTab.click();
}

// 4. 快捷导航：相邻日行程
function addDayNav() {
  document.querySelectorAll(".dc").forEach((card, idx) => {
    const day = idx + 1;
    const header = card.querySelector(".dh");
    if (!header || header.querySelector(".day-nav")) return;
    
    const nav = document.createElement("div");
    nav.className = "day-nav";
    nav.style.cssText = "display:flex;gap:6px;margin-left:auto;font-size:.65rem";
    
    if (day > 1) {
      nav.innerHTML += '<span onclick="event.stopPropagation();jumpToDay(' + (day-1) + ')" style="color:var(--mt);cursor:pointer;opacity:.6;transition:opacity .2s" title="前一天">◀</span>';
    }
    nav.innerHTML += '<span style="color:var(--mt);opacity:.4">|</span>';
    if (day < 12) {
      nav.innerHTML += '<span onclick="event.stopPropagation();jumpToDay(' + (day+1) + ')" style="color:var(--mt);cursor:pointer;opacity:.6;transition:opacity .2s" title="后一天">▶</span>';
    }
    
    header.appendChild(nav);
    
    // Hover effect
    nav.querySelectorAll("span").forEach(s => {
      if (s.textContent !== "|") {
        s.addEventListener("mouseenter", function() { this.style.opacity = "1"; });
        s.addEventListener("mouseleave", function() { this.style.opacity = ".6"; });
      }
    });
  });
}

// 5. 社区动态里补充骑行路线参考
function enhanceCommunity() {
  // Already done in renderComFeed
}

// 6. 初始化
function initIntegration() {
  setTimeout(() => {
    enableMapClicks();
    enhanceJournalCards();
    addContextLinks();
    addDayNav();
  }, 1000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initIntegration);
} else {
  initIntegration();
}

// Re-init when tabs change
document.addEventListener("click", function(e) {
  const tab = e.target.closest(".tab");
  if (tab) {
    setTimeout(() => {
      addContextLinks();
      addDayNav();
      enhanceJournalCards();
    }, 500);
  }
});

console.log("🔗 功能融合 v3.7 已加载 — 路线图可点击·跨模块跳转·智能导航");
})();// ==========================================
// v3.9: 多路线系统
// ==========================================

const ROUTES = [
  {
    id: "g318", name: "川藏南线", code: "G318",
    start: "成都", end: "拉萨",
    km: 2120, days: 12, maxAlt: 5013, passes: 14,
    color: "#d4a843", emoji: "🏔️",
    summary: "最经典、最成熟的进藏骑行路线。翻越14座4000m+高山，横跨横断山脉，途经雪山、草原、森林、峡谷，是骑行者的精神图腾。",
    highlights: "折多山4298m · 卡子拉山4718m · 姊妹湖 · 怒江72拐 · 然乌湖 · 鲁朗林海 · 南迦巴瓦峰 · 米拉山5013m",
    stage: ["成都平原","川西高原","藏东峡谷","拉萨河谷"],
    bestSeason: "5-10月（7-8月雨季需注意塌方）",
    difficulty: "★★★★★（极限挑战）",
    tips: [
      "折多山是第一道难关，建议4:30前出发",
      "东达山5008m关注高反，提前7天吃红景天",
      "鲁朗石锅鸡必吃，然乌湖必停拍照",
      "沿途住宿成熟，手机信号大部分路段覆盖"
    ]
  },
  {
    id: "g109", name: "青藏线", code: "G109",
    start: "西宁/格尔木", end: "拉萨",
    km: 1950, days: 15, maxAlt: 5231, passes: 5,
    color: "#4a9cd4", emoji: "⛰️",
    summary: "海拔最高、最艰苦的进藏路线。全程平均海拔4500m+，翻越昆仑山、唐古拉山，穿越可可西里无人区。路面好但补给点稀疏，最适合有高原骑行经验者。",
    highlights: "青海湖 · 昆仑山口4767m · 可可西里 · 唐古拉山口5231m · 羌塘草原 · 纳木错 · 羊八井",
    stage: ["青海湖盆地","柴达木戈壁","可可西里","藏北草原"],
    bestSeason: "6-9月（冬季极寒，不宜骑行）",
    difficulty: "★★★★★（高原极限）",
    tips: [
      "格尔木到唐古拉山约800km海拔4500m+，注意持续高反",
      "沿途住宿点少，建议带帐篷备用",
      "可可西里路段注意避让野生动物",
      "西宁到格尔木段约800km，可分5-6天完成"
    ]
  },
  {
    id: "g214", name: "滇藏线", code: "G214",
    start: "昆明/大理", end: "拉萨",
    km: 2300, days: 22, maxAlt: 5008,
    color: "#6abf6a", emoji: "🌸",
    summary: "风景最美、文化最多元的进藏路线。从云南的四季如春到西藏的雪域高原，途经大理、丽江、香格里拉，在芒康与G318汇合。",
    highlights: "洱海 · 丽江古城 · 玉龙雪山 · 梅里雪山 · 盐井古盐田 · 红拉山 · 然乌湖· 林芝桃花",
    stage: ["云南高原","横断山脉","藏东峡谷","拉萨河谷"],
    bestSeason: "5-6月、9-10月（避开雨季和冬季）",
    difficulty: "★★★★☆（挑战较大）",
    tips: [
      "昆明到大理段路况好，可作为热身",
      "香格里拉到德钦段有白马雪山，注意高原适应",
      "盐井的加加面值得一尝",
      "在芒康与G318汇合后参考川藏线攻略"
    ]
  },
  {
    id: "g219", name: "新藏线", code: "G219",
    start: "叶城", end: "拉萨",
    km: 2600, days: 28, maxAlt: 5378,
    color: "#e85d5d", emoji: "🏜️",
    summary: "最艰难、最人迹罕至的进藏路线。穿越塔克拉玛干沙漠边缘、昆仑山、喀喇昆仑山、阿里高原，平均海拔4500m+，数百公里无人区。",
    highlights: "喀喇昆仑山 · 界山达坂5347m · 班公措 · 札达土林 · 冈仁波齐 · 玛旁雍措 · 珠穆朗玛峰",
    stage: ["塔里木盆地","昆仑山区","阿里高原","后藏地区"],
    bestSeason: "7-8月（其他季节极寒且多风雪）",
    difficulty: "★★★★★★（炼狱级）",
    tips: [
      "叶城到狮泉河约1100km无人区，需自带帐篷和炊具",
      "界山达坂海拔5347m，务必关注高反",
      "阿里地区补给点极少，需提前规划物资",
      "建议组队骑行，单人风险极高",
      "边防证必须提前办理（注明阿里地区）"
    ]
  }
];

let activeRoute = localStorage.getItem("activeRoute") || "g318";

function switchRoute(id) {
  if (id === activeRoute) return;
  activeRoute = id;
  localStorage.setItem("activeRoute", id);
  
  // Update route selector
  document.querySelectorAll(".rs-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.route === id);
  });
  
  // Update route display
  showRouteInfo(id);
  
  // Update hero stats
  updateHeroStats(id);
}

function updateHeroStats(id) {
  const r = ROUTES.find(x => x.id === id);
  if (!r) return;
  const stats = document.querySelectorAll(".stat-card .num");
  if (stats.length >= 5) {
    stats[0].textContent = r.km.toLocaleString();
    stats[1].textContent = r.days;
    stats[2].textContent = r.maxAlt.toLocaleString();
    stats[3].textContent = "~" + (r.km * 8).toLocaleString();
    stats[4].textContent = r.passes || "多座";
  }
  
  // Update subtitle
  const sub = document.querySelector(".hero .sub");
  if (sub) {
    sub.textContent = r.start + " → " + r.end + " · " + r.days + "天 · 约" + r.km.toLocaleString() + "km";
  }
  const h1 = document.querySelector(".hero h1");
  if (h1) {
    h1.textContent = r.emoji + " " + r.code + " " + r.name + " · 骑行社区";
  }
}

function showRouteInfo(id) {
  const display = document.getElementById("routeInfo");
  if (!display) return;
  const r = ROUTES.find(x => x.id === id);
  if (!r) return;
  
  display.innerHTML = 
    '<div style="margin-bottom:14px"><strong style="font-size:1.1rem;color:' + r.color + '">' + r.emoji + ' ' + r.code + ' ' + r.name + '</strong></div>' +
    '<div style="margin-bottom:10px;font-size:.82rem;color:var(--mt);line-height:1.7">' + r.summary + '</div>' +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-bottom:10px;font-size:.78rem">' +
    '<div style="background:var(--cd);padding:8px;border-radius:6px"><span style="color:var(--mt)">起止点</span><br><strong style="color:var(--tx)">' + r.start + ' → ' + r.end + '</strong></div>' +
    '<div style="background:var(--cd);padding:8px;border-radius:6px"><span style="color:var(--mt)">适宜季节</span><br><strong style="color:var(--tx)">' + r.bestSeason + '</strong></div>' +
    '<div style="background:var(--cd);padding:8px;border-radius:6px"><span style="color:var(--mt)">难度评价</span><br><strong style="color:' + r.color + '">' + r.difficulty + '</strong></div>' +
    '<div style="background:var(--cd);padding:8px;border-radius:6px"><span style="color:var(--mt)">途经地貌</span><br><strong style="color:var(--tx)">' + r.stage.join(" → ") + '</strong></div>' +
    '</div>' +
    '<div style="margin-bottom:8px"><strong style="color:var(--gd);font-size:.85rem">✨ 沿途亮点</strong></div>' +
    '<div style="font-size:.78rem;color:var(--tx);margin-bottom:10px;line-height:1.6">' + r.highlights + '</div>' +
    '<div style="margin-bottom:6px"><strong style="color:var(--gd);font-size:.85rem">💡 实战建议</strong></div>' +
    r.tips.map(t => '<div style="font-size:.75rem;color:var(--mt);padding:4px 0;border-bottom:1px solid rgba(255,255,255,0.03)">• ' + t + '</div>').join("") +
    '<div style="margin-top:12px;font-size:.75rem;color:var(--mt);padding:8px 12px;background:rgba(212,168,67,0.08);border-radius:6px">' +
    (id === "g318" ? '✅ 川藏南线已上线完整12天行程详情、实战信息库、海拔剖面图。点击其他标签页查看。' + (activeRoute !== "g318" ? '<br><br><a href="javascript:void(0)" onclick="switchRoute('g318')" style="color:var(--gd)">👉 切换到川藏南线查看完整数据</a>' : '') : 
     id === "g109" ? '📝 青藏线基础数据已加载，详细行程规划、实战信息逐步完善中。' :
     id === "g214" ? '📝 滇藏线基础数据已加载，详细行程规划、实战信息逐步完善中。' :
     '📝 新藏线基础数据已加载，详细行程规划、实战信息逐步完善中。') +
    '</div>';
}

function buildRouteSelector() {
  const container = document.querySelector(".container");
  if (!container) return;
  
  // Insert route selector before tabs
  const selector = document.createElement("div");
  selector.className = "route-selector";
  selector.style.cssText = "display:flex;gap:6px;margin-bottom:12px;overflow-x:auto;padding:4px 0";
  
  ROUTES.forEach(r => {
    const btn = document.createElement("button");
    btn.className = "rs-btn" + (r.id === activeRoute ? " active" : "");
    btn.dataset.route = r.id;
    btn.style.cssText = "flex-shrink:0;padding:8px 16px;border-radius:8px;border:2px solid " + (r.id === activeRoute ? r.color : "rgba(255,255,255,0.08)") + ";background:" + (r.id === activeRoute ? r.color + "20" : "transparent") + ";color:" + (r.id === activeRoute ? r.color : "var(--mt)") + ";cursor:pointer;font-size:.8rem;font-weight:" + (r.id === activeRoute ? "600" : "400") + ";transition:all .3s;white-space:nowrap";
    btn.innerHTML = r.emoji + " " + r.code;
    btn.onclick = () => switchRoute(r.id);
    selector.appendChild(btn);
  });
  
  // Info display area
  const info = document.createElement("div");
  info.id = "routeInfo";
  info.style.cssText = "background:var(--srf);border-radius:10px;padding:16px;margin-bottom:14px";
  
  container.insertBefore(selector, container.firstChild);
  container.insertBefore(info, selector.nextSibling);
  
  // Show current route
  showRouteInfo(activeRoute);
  
  // Style
  const s = document.createElement("style");
  s.textContent = ".rs-btn:hover{border-color:" + ROUTES.find(r => r.id === activeRoute)?.color + "40 !important}.rs-btn.active{transform:translateY(-1px);box-shadow:0 4px 12px rgba(0,0,0,0.2)}";
  document.head.appendChild(s);
}

function initRoutes() {
  setTimeout(() => {
    buildRouteSelector();
    updateHeroStats(activeRoute);
  }, 600);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initRoutes);
} else {
  setTimeout(initRoutes, 600);
}

console.log("🗺️ 多路线系统 v3.9 已加载 — 支持川藏·青藏·滇藏·新藏");// ==========================================
// v3.10: 路线图放大查看 + 交互增强
// ==========================================

let zoomLevel = 1;
let isDragging = false;
let dragStart = {x:0, y:0};
let scrollPos = {x:0, y:0};

function buildMapModal() {
  // Create modal
  const modal = document.createElement("div");
  modal.id = "mapModal";
  modal.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.92);z-index:1000;display:none;flex-direction:column;align-items:center;justify-content:center;backdrop-filter:blur(8px)";
  
  modal.innerHTML = 
    '<div style="position:absolute;top:16px;right:20px;display:flex;gap:10px;z-index:10">' +
    '<button onclick="zoomMap(0.2)" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);color:#fff;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:1.2rem;display:flex;align-items:center;justify-content:center">+</button>' +
    '<span id="zoomLevel" style="color:var(--mt);font-size:.8rem;display:flex;align-items:center;min-width:40px;justify-content:center">100%</span>' +
    '<button onclick="zoomMap(-0.2)" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);color:#fff;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:1.2rem;display:flex;align-items:center;justify-content:center">&minus;</button>' +
    '<button onclick="resetMap()" style="background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);color:#fff;padding:6px 12px;border-radius:6px;cursor:pointer;font-size:.8rem">重置</button>' +
    '<button onclick="closeMap()" style="background:rgba(255,255,255,0.1);border:none;color:#fff;width:36px;height:36px;border-radius:50%;cursor:pointer;font-size:1.3rem;display:flex;align-items:center;justify-content:center">&times;</button>' +
    '</div>' +
    '<div id="mapContainer" style="flex:1;display:flex;align-items:center;justify-content:center;overflow:hidden;width:100%;padding:40px;cursor:grab">' +
    '<div id="mapZoomTarget" style="transform-origin:center center;transition:transform 0.2s ease"></div>' +
    '</div>' +
    '<div style="position:absolute;bottom:20px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,0.4);font-size:.7rem;text-align:center">🖱️ 拖拽移动 · 滚轮缩放</div>';
  
  document.body.appendChild(modal);
  
  // Drag to pan
  const container = document.getElementById("mapContainer");
  const target = document.getElementById("mapZoomTarget");
  
  container.addEventListener("mousedown", startDrag);
  container.addEventListener("mousemove", drag);
  container.addEventListener("mouseup", endDrag);
  container.addEventListener("mouseleave", endDrag);
  
  // Touch events for mobile
  container.addEventListener("touchstart", function(e) {
    const t = e.touches[0];
    startDrag({clientX: t.clientX, clientY: t.clientY});
  });
  container.addEventListener("touchmove", function(e) {
    const t = e.touches[0];
    drag({clientX: t.clientX, clientY: t.clientY});
    e.preventDefault();
  });
  container.addEventListener("touchend", endDrag);
  
  // Wheel zoom
  container.addEventListener("wheel", function(e) {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    zoomMap(delta);
  }, {passive: false});
  
  // Preload SVG into target
  const mapSvg = document.querySelector(".map-s svg");
  if (mapSvg) {
    // Clone the SVG
    const clone = mapSvg.cloneNode(true);
    clone.style.width = "100%";
    clone.style.height = "auto";
    clone.style.maxWidth = "1100px";
    // Increase text sizes in clone
    clone.querySelectorAll("text").forEach(t => {
      const size = parseFloat(t.getAttribute("font-size") || "8");
      if (size < 10) t.setAttribute("font-size", "" + (size * 1.5));
    });
    // Increase circle sizes
    clone.querySelectorAll("circle").forEach(c => {
      const r = parseFloat(c.getAttribute("r") || "4");
      if (r < 8) c.setAttribute("r", "" + (r * 1.5));
    });
    target.appendChild(clone);
  }
}

function startDrag(e) {
  isDragging = true;
  const cx = e.clientX || 0;
  const cy = e.clientY || 0;
  dragStart = {x: cx - scrollPos.x, y: cy - scrollPos.y};
  document.getElementById("mapContainer").style.cursor = "grabbing";
}

function drag(e) {
  if (!isDragging) return;
  const cx = e.clientX || 0;
  const cy = e.clientY || 0;
  scrollPos = {x: cx - dragStart.x, y: cy - dragStart.y};
  const target = document.getElementById("mapZoomTarget");
  if (target) target.style.transform = "translate(" + scrollPos.x + "px, " + scrollPos.y + "px) scale(" + zoomLevel + ")";
}

function endDrag() {
  isDragging = false;
  const container = document.getElementById("mapContainer");
  if (container) container.style.cursor = "grab";
}

function zoomMap(delta) {
  zoomLevel = Math.max(0.3, Math.min(5, zoomLevel + delta));
  const target = document.getElementById("mapZoomTarget");
  const label = document.getElementById("zoomLevel");
  if (target) target.style.transform = "translate(" + scrollPos.x + "px, " + scrollPos.y + "px) scale(" + zoomLevel + ")";
  if (label) label.textContent = Math.round(zoomLevel * 100) + "%";
}

function resetMap() {
  zoomLevel = 1;
  scrollPos = {x: 0, y: 0};
  const target = document.getElementById("mapZoomTarget");
  const label = document.getElementById("zoomLevel");
  if (target) target.style.transform = "scale(1)";
  if (label) label.textContent = "100%";
}

function closeMap() {
  document.getElementById("mapModal").style.display = "none";
  resetMap();
}

// Make map section clickable
function initMapZoom() {
  const mapSection = document.querySelector(".map-s");
  if (!mapSection) return;
  
  // Add hint
  const hint = document.createElement("div");
  hint.style.cssText = "text-align:center;margin-top:4px;font-size:.68rem;color:var(--mt);opacity:.5;cursor:pointer";
  hint.textContent = "🖱️ 点击路线图放大查看";
  hint.onclick = function(e) { e.stopPropagation(); openMapModal(); };
  mapSection.style.cursor = "pointer";
  mapSection.title = "点击放大查看";
  
  // Make the whole map section clickable
  mapSection.addEventListener("click", function(e) {
    // Don't open if clicking on a circle (those have their own handlers)
    if (e.target.tagName === "circle" || e.target.tagName === "CIRCLE") return;
    openMapModal();
  });
  
  mapSection.appendChild(hint);
  
  // Build modal
  buildMapModal();
}

function openMapModal() {
  const modal = document.getElementById("mapModal");
  if (!modal) return;
  modal.style.display = "flex";
  resetMap();
  // Close on background click
  modal.addEventListener("click", function(e) {
    if (e.target === modal) closeMap();
  });
}

// Keyboard shortcut: Escape to close
document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") {
    const modal = document.getElementById("mapModal");
    if (modal && modal.style.display === "flex") closeMap();
  }
});

// Initialize
setTimeout(initMapZoom, 800);

// Also fix SVG display issues
function fixMapDisplay() {
  const mapSvg = document.querySelector(".map-s svg");
  if (!mapSvg) return;
  // Make sure SVG takes full width
  mapSvg.style.width = "100%";
  mapSvg.style.height = "auto";
  // Ensure viewBox is preserved
  const vb = mapSvg.getAttribute("viewBox");
  if (!vb) mapSvg.setAttribute("viewBox", "0 0 1100 500");
}

setTimeout(fixMapDisplay, 200);

console.log("🗺️ 路线图放大查看 v3.10 已加载");// ==========================================
// v3.11: 分享修复 + 每日打卡 + 实时天气
// ==========================================

// 1. 修复分享功能 - 真正复制内容到剪贴板
if (window.share) {
  const origShare = window.share;
  window.share = function(t) {
    const u = location.href;
    const activeRoute = localStorage.getItem("activeRoute") || "g318";
    const routes = {"g318":"川藏南线G318","g109":"青藏线G109","g214":"滇藏线G214","g219":"新藏线G219"};
    const routeName = routes[activeRoute] || "川藏南线G318";
    const prog = parseInt(localStorage.getItem("prog") || "0");
    const txt = "🚴 挑战" + routeName + "！成都→拉萨，约2120km，翻越14座4000m+高山！\n\n已完成 " + prog + "/12 天\n\n" + u;
    
    if (t === 0) {  // 微信 - 复制文案
      navigator.clipboard.writeText(txt).then(() => {
        alert("✅ 骑行文案已复制到剪贴板\n\n请打开微信粘贴发送给好友或朋友圈 🚴");
      }).catch(() => {
        // Fallback for older browsers
        const ta = document.createElement("textarea");
        ta.value = txt; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta);
        alert("✅ 已复制，请到微信粘贴分享");
      });
    } else if (t === 1) {  // 微博
      window.open("https://service.weibo.com/share/share.php?title=" + encodeURIComponent(txt) + "&url=" + encodeURIComponent(u));
    } else if (t === 2) {  // 复制链接
      navigator.clipboard.writeText(u).then(() => {
        alert("✅ 链接已复制到剪贴板: " + u);
      }).catch(() => {
        const ta = document.createElement("textarea");
        ta.value = u; ta.style.position = "fixed"; ta.style.opacity = "0";
        document.body.appendChild(ta); ta.select();
        document.execCommand("copy"); document.body.removeChild(ta);
        alert("✅ 链接已复制");
      });
    }
  };
}

// 2. 每日打卡 - 记录抵达时间和日期
function upgradeCheckins() {
  document.querySelectorAll(".dc").forEach((card, idx) => {
    const day = idx + 1;
    const chk = card.querySelector('.chk input[type="checkbox"]');
    if (!chk) return;
    
    // Check if we already enhanced this
    if (card.querySelector(".checkin-time")) return;
    
    // Add timestamp display
    const timeDiv = document.createElement("div");
    timeDiv.className = "checkin-time";
    timeDiv.style.cssText = "margin:4px 0 0;font-size:.72rem";
    
    // Load saved checkin
    const saved = localStorage.getItem("checkin_" + day);
    if (saved) {
      const data = JSON.parse(saved);
      timeDiv.innerHTML = '<span style="color:var(--gr)">✅ ' + data.date + ' ' + data.time + ' 抵达' + getDayEnd(day) + '</span>';
      chk.checked = true;
    }
    
    // Override onchange
    chk.addEventListener("change", function() {
      if (this.checked) {
        const now = new Date();
        const dateStr = now.toLocaleDateString("zh-CN", {month:"2-digit",day:"2-digit"});
        const timeStr = now.toLocaleTimeString("zh-CN", {hour:"2-digit",minute:"2-digit"});
        const data = {date: dateStr, time: timeStr, day: day, arrived: true};
        localStorage.setItem("checkin_" + day, JSON.stringify(data));
        
        timeDiv.innerHTML = '<span style="color:var(--gr)">✅ ' + dateStr + ' ' + timeStr + ' 抵达' + getDayEnd(day) + '</span>';
        
        // Show notification
        showCheckinNotif(day, dateStr, timeStr);
        
        // Update progress
        if (window.upPr) upPr();
      } else {
        localStorage.removeItem("checkin_" + day);
        timeDiv.innerHTML = "";
        if (window.upPr) upPr();
      }
    });
    
    // Insert after the checkbox area
    const si = card.querySelector(".si.chk");
    if (si && si.parentNode) si.parentNode.insertBefore(timeDiv, si.nextSibling);
  });
}

function getDayEnd(day) {
  const ends = ["雅安","泸定","新都桥","理塘","巴塘","芒康","左贡","八宿","波密","八一镇","松多","拉萨"];
  return ends[day - 1] || "";
}

function showCheckinNotif(day, date, time) {
  // Remove old notification
  const old = document.getElementById("checkinNotif");
  if (old) old.remove();
  
  const notif = document.createElement("div");
  notif.id = "checkinNotif";
  notif.style.cssText = "position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:9999;background:rgba(10,22,40,0.95);border:1px solid rgba(212,168,67,0.3);border-radius:12px;padding:16px 24px;box-shadow:0 8px 40px rgba(0,0,0,0.5);text-align:center;animation:slideDown .3s ease;max-width:90%";
  notif.innerHTML = 
    '<div style="font-size:2rem;margin-bottom:6px">🚴</div>' +
    '<div style="color:var(--gd);font-weight:600;font-size:1rem">D' + day + ' ' + getDayEnd(day) + ' ✅</div>' +
    '<div style="color:var(--mt);font-size:.8rem;margin:4px 0">抵达时间：' + date + ' ' + time + '</div>' +
    '<div style="color:var(--mt);font-size:.75rem">第' + (day+1) + '天路线已准备就绪</div>' +
    '<button onclick="this.parentElement.remove()" style="margin-top:8px;padding:4px 16px;background:var(--gd);border:none;border-radius:6px;color:#0a1628;font-size:.75rem;cursor:pointer">知道了</button>';
  
  document.body.appendChild(notif);
  setTimeout(() => { const n = document.getElementById("checkinNotif"); if (n) n.remove(); }, 5000);
}

// Add notification animation
const animStyle = document.createElement("style");
animStyle.textContent = '@keyframes slideDown{from{opacity:0;transform:translateX(-50%) translateY(-20px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}';
document.head.appendChild(animStyle);

// 3. 实时天气链接 - 替代静态表格
function upgradeWeather() {
  const weatherSection = document.querySelector(".kb-section");
  // Find the weather table
  const tables = document.querySelectorAll(".wt");
  let weatherTable = null;
  tables.forEach(t => {
    const prev = t.previousElementSibling;
    if (prev && prev.tagName === "H3" && prev.textContent.includes("天气")) weatherTable = t;
  });
  
  if (!weatherTable) return;
  
  // Add live weather card above the table
  const card = document.createElement("div");
  card.style.cssText = "background:rgba(74,156,212,0.08);border:1px solid rgba(74,156,212,0.15);border-radius:8px;padding:12px 14px;margin-bottom:10px";
  
  // Get current segment based on progress
  const prog = parseInt(localStorage.getItem("prog") || "0");
  const today = Math.min(prog + 1, 12);
  const weatherLinks = [
    {city:"成都",url:"https://www.weather.com.cn/weather/101270101.shtml"},
    {city:"雅安",url:"https://www.weather.com.cn/weather/101271701.shtml"},
    {city:"泸定",url:"https://www.weather.com.cn/weather/101271704.shtml"},
    {city:"康定",url:"https://www.weather.com.cn/weather/101271301.shtml"},
    {city:"理塘",url:"https://www.weather.com.cn/weather/101271401.shtml"},
    {city:"巴塘",url:"https://www.weather.com.cn/weather/101271402.shtml"},
    {city:"芒康",url:"https://www.weather.com.cn/weather/101271403.shtml"},
    {city:"左贡",url:"https://www.weather.com.cn/weather/101271404.shtml"},
    {city:"八宿",url:"https://www.weather.com.cn/weather/101271405.shtml"},
    {city:"波密",url:"https://www.weather.com.cn/weather/101271406.shtml"},
    {city:"林芝",url:"https://www.weather.com.cn/weather/101270201.shtml"},
    {city:"拉萨",url:"https://www.weather.com.cn/weather/101270101.shtml"},
  ];
  
  const days = ["成都→雅安","雅安→泸定","泸定→新都桥","新都桥→理塘","理塘→巴塘","巴塘→芒康","芒康→左贡","左贡→八宿","八宿→波密","波密→八一镇","八一镇→松多","松多→拉萨"];
  const cities = ["成都","雅安","泸定","康定","理塘","巴塘","芒康","左贡","八宿","波密","林芝","拉萨"];
  
  card.innerHTML = 
    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">' +
    '<span style="font-size:1.2rem">🌤️</span>' +
    '<strong style="color:var(--bl);font-size:.9rem">实时天气查询</strong>' +
    '<span style="font-size:.68rem;color:var(--mt);margin-left:auto">数据来源：中国天气网</span></div>' +
    '<div style="font-size:.75rem;color:var(--mt);margin-bottom:8px">点击下方城市名查看未来7天详细天气预报（气温·紫外线·风向·湿度）</div>' +
    '<div style="display:flex;flex-wrap:wrap;gap:6px">' +
    cities.map((city, i) => {
      const link = weatherLinks.find(w => w.city === city)?.url || "#";
      const isTodayOrFuture = i >= prog;
      return '<a href="' + link + '" target="_blank" rel="noopener" style="display:inline-flex;align-items:center;gap:4px;padding:5px 10px;border-radius:6px;background:' + (i === prog ? 'rgba(212,168,67,0.15)' : 'rgba(255,255,255,0.04)') + ';border:1px solid ' + (i === prog ? 'rgba(212,168,67,0.25)' : 'rgba(255,255,255,0.06)') + ';color:' + (isTodayOrFuture ? 'var(--tx)' : 'var(--mt)') + ';text-decoration:none;font-size:.75rem;transition:all .2s">' +
      (i < prog ? '✅ ' : (i === prog ? '📍 ' : '')) + city + '</a>';
    }).join("") +
    '</div>' +
    (prog > 0 && prog <= 12 ? '<div style="margin-top:6px;font-size:.7rem;color:var(--gr)">✅ 已到达 ' + days[prog-1] + ' · 查看明日天气：' + cities[prog] + '</div>' : '') +
    (prog === 0 ? '<div style="margin-top:6px;font-size:.7rem;color:var(--mt)">📍 当前在成都 · 查看明日雅安的天气准备出发</div>' : '');
  
  weatherTable.parentNode.insertBefore(card, weatherTable);
}

// 4. 修复"生成骑行证书"按钮 - 改为"打卡记录"
function fixCertBtn() {
  const shareBar = document.querySelector(".share-bar");
  if (!shareBar) return;
  
  const btns = shareBar.querySelectorAll(".share-btn");
  btns.forEach(btn => {
    if (btn.textContent.includes("行程卡") || btn.textContent.includes("证书")) {
      // Replace with checkin summary button
      btn.textContent = "📋 打卡记录";
      btn.onclick = function() { showCheckinSummary(); };
    }
  });
}

function showCheckinSummary() {
  let html = '<div style="padding:10px"><h3 style="color:var(--gd);font-size:1rem;margin-bottom:10px">📋 每日打卡记录</h3>';
  const days = ["成都→雅安","雅安→泸定","泸定→新都桥","新都桥→理塘","理塘→巴塘","巴塘→芒康","芒康→左贡","左贡→八宿","八宿→波密","波密→八一镇","八一镇→松多","松多→拉萨"];
  let checked = 0;
  
  for (let i = 1; i <= 12; i++) {
    const saved = localStorage.getItem("checkin_" + i);
    const route = days[i - 1];
    if (saved) {
      const data = JSON.parse(saved);
      html += '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04)">' +
        '<span style="color:var(--gr)">✅</span>' +
        '<span style="flex:1;font-size:.82rem">D' + i + ' ' + route + '</span>' +
        '<span style="font-size:.72rem;color:var(--mt)">' + data.date + ' ' + data.time + '</span></div>';
      checked++;
    } else {
      html += '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);opacity:.4">' +
        '<span>⬜</span>' +
        '<span style="flex:1;font-size:.82rem">D' + i + ' ' + route + '</span>' +
        '<span style="font-size:.72rem;color:var(--mt)">未到达</span></div>';
    }
  }
  
  html += '<div style="margin-top:10px;padding:8px;background:rgba(212,168,67,0.08);border-radius:6px;text-align:center;font-size:.82rem">' +
    '已打卡 <strong style="color:var(--gd)">' + checked + '</strong> / 12 天</div></div>';
  
  // Show in lightbox
  const lb = document.getElementById("lbi");
  const lc = document.getElementById("lbc");
  if (lb && lc) {
    const w = 600, h = 700;
    let svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '" viewBox="0 0 ' + w + ' ' + h + '">';
    svg += '<rect width="' + w + '" height="' + h + '" fill="#0a1628" rx="12"/>';
    svg += '<text x="40" y="60" fill="#d4a843" font-size="24" font-weight="bold" font-family="sans-serif">📋 每日打卡记录</text>';
    svg += '<line x1="40" y1="80" x2="560" y2="80" stroke="rgba(255,255,255,0.06)"/>';
    
    for (let i = 1; i <= 12; i++) {
      const saved = localStorage.getItem("checkin_" + i);
      const route = days[i - 1];
      const y = 110 + (i - 1) * 38;
      const status = saved ? "✅" : "⬜";
      const detail = saved ? JSON.parse(saved).date + " " + JSON.parse(saved).time : "未到达";
      svg += '<text x="40" y="' + y + '" fill="' + (saved ? '#6abf6a' : '#607888') + '" font-size="14" font-family="sans-serif">' + status + ' D' + i + ' ' + route + '</text>';
      svg += '<text x="400" y="' + y + '" fill="#90aec8" font-size="12" font-family="sans-serif">' + detail + '</text>';
    }
    
    svg += '<text x="300" y="610" text-anchor="middle" fill="#d4a843" font-size="16" font-weight="bold" font-family="sans-serif">已打卡 ' + checked + ' / 12 天</text>';
    svg += '</svg>';
    
    lb.src = "data:image/svg+xml," + encodeURIComponent(svg);
    document.getElementById("lb").classList.add("show");
    lc.textContent = "📋 打卡记录 (" + checked + "/12)";
  }
}

// 5. Fix the share button text
(function() {
  // Fix button labels
  document.addEventListener("click", function() {
    setTimeout(fixCertBtn, 200);
  });
  
  setTimeout(function() {
    upgradeCheckins();
    upgradeWeather();
    fixCertBtn();
  }, 1000);
})();

console.log("🔧 v3.11 已加载 — 分享修复·每日打卡·实时天气");// ==========================================
// v3.11: 分享修复 + 每日打卡 + 实时天气 (fixed)
// ==========================================

// 1. 分享 — 文件协议下也用textarea回退方案
if (typeof share === 'function') {
  const oldShare = share;
  share = function(t) {
    const u = location.href;
    const prog = parseInt(localStorage.getItem("prog") || "0");
    const txt = "🚴 挑战川藏线！成都→拉萨，约2120km，翻越14座4000m+高山！\n\n已完成 " + prog + "/12 天\n\n" + u;
    
    function doCopy(text, msg) {
      // Try clipboard API first (works on localhost/HTTPS)
      try {
        navigator.clipboard.writeText(text).then(function() {
          alert(msg);
        }).catch(function() {
          // Fallback: textarea + execCommand
          fallbackCopy(text, msg);
        });
      } catch(e) {
        fallbackCopy(text, msg);
      }
    }
    
    function fallbackCopy(text, msg) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;top:0;left:0;width:100%;height:100px;font-size:16px;padding:10px;z-index:99999;background:#1a2a3a;color:#fff;border:1px solid #d4a843";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try {
        document.execCommand("copy");
        alert(msg + "\n\n(已复制到剪贴板)");
      } catch(e) {
        alert("请手动复制下方内容：\n\n" + text);
      }
      document.body.removeChild(ta);
    }
    
    if (t === 0) {
      doCopy(txt, "✅ 骑行文案已复制\n\n请打开微信粘贴发送给好友或朋友圈");
    } else if (t === 1) {
      window.open("https://service.weibo.com/share/share.php?title=" + encodeURIComponent(txt) + "&url=" + encodeURIComponent(u));
    } else {
      doCopy(u, "✅ 网址已复制到剪贴板");
    }
  };
}

// 2. 每日打卡 — 抵达时间记录
function doCheckins() {
  // Remove old checkin-time elements and re-add fresh
  document.querySelectorAll(".checkin-time").forEach(function(el) { el.remove(); });
  
  document.querySelectorAll(".dc").forEach(function(card, idx) {
    var day = idx + 1;
    var chk = card.querySelector('.chk input');
    if (!chk) return;
    
    var timeDiv = document.createElement("div");
    timeDiv.className = "checkin-time";
    timeDiv.style.cssText = "margin:4px 0 0;font-size:.72rem";
    
    // Load saved checkin
    var saved = localStorage.getItem("checkin_" + day);
    if (saved) {
      try {
        var data = JSON.parse(saved);
        timeDiv.innerHTML = '<span style="color:var(--gr)">✅ ' + data.date + ' ' + data.time + ' 抵达' + getDayEnd2(day) + '</span>';
        chk.checked = true;
      } catch(e) {}
    }
    
    // Replace existing change listeners by cloning
    var newChk = chk.cloneNode(true);
    chk.parentNode.replaceChild(newChk, chk);
    
    newChk.addEventListener("change", function() {
      if (this.checked) {
        var now = new Date();
        var dateStr = now.toLocaleDateString("zh-CN", {month:"2-digit",day:"2-digit"});
        var timeStr = now.toLocaleTimeString("zh-CN", {hour:"2-digit",minute:"2-digit"});
        localStorage.setItem("checkin_" + day, JSON.stringify({date:dateStr, time:timeStr, day:day}));
        timeDiv.innerHTML = '<span style="color:var(--gr)">✅ ' + dateStr + ' ' + timeStr + ' 抵达' + getDayEnd2(day) + '</span>';
        showNotif(day, dateStr, timeStr);
        if (window.upPr) window.upPr();
      } else {
        localStorage.removeItem("checkin_" + day);
        timeDiv.innerHTML = "";
        if (window.upPr) window.upPr();
      }
    });
    
    // Insert after the .si.chk element
    var si = card.querySelector('.si.chk');
    if (si && si.parentNode) si.parentNode.insertBefore(timeDiv, si.nextSibling);
  });
}

function getDayEnd2(d) {
  var ends = ["雅安","泸定","新都桥","理塘","巴塘","芒康","左贡","八宿","波密","八一镇","松多","拉萨"];
  return ends[d - 1] || "";
}

function showNotif(day, date, time) {
  var old = document.getElementById("checkinNotif");
  if (old) old.remove();
  
  var n = document.createElement("div");
  n.id = "checkinNotif";
  n.style.cssText = "position:fixed;top:20px;left:50%;transform:translateX(-50%);z-index:9999;background:rgba(10,22,40,0.97);border:1px solid rgba(212,168,67,0.3);border-radius:12px;padding:16px 24px;box-shadow:0 8px 40px rgba(0,0,0,0.5);text-align:center;max-width:360px";
  n.innerHTML = '<div style="font-size:2rem;margin-bottom:6px">🚴</div><div style="color:var(--gd);font-weight:600;font-size:1rem">D' + day + ' ' + getDayEnd2(day) + ' ✅</div><div style="color:var(--mt);font-size:.8rem;margin:4px 0">抵达时间：' + date + ' ' + time + '</div><button onclick="this.parentElement.remove()" style="margin-top:8px;padding:5px 20px;background:var(--gd);border:none;border-radius:6px;color:#0a1628;font-size:.78rem;cursor:pointer">知道了</button>';
  document.body.appendChild(n);
  setTimeout(function() { var x = document.getElementById("checkinNotif"); if (x) x.remove(); }, 6000);
}

// 3. 天气 — 改用class选择器，不依赖:has()
function doWeather() {
  // Find the weather table heading
  var headings = document.querySelectorAll("h3");
  var weatherH3 = null;
  for (var i = 0; i < headings.length; i++) {
    if (headings[i].textContent.indexOf("天气") !== -1) {
      weatherH3 = headings[i];
      break;
    }
  }
  if (!weatherH3) return;
  
  var prog = parseInt(localStorage.getItem("prog") || "0");
  var cities = ["成都","雅安","泸定","康定","理塘","巴塘","芒康","左贡","八宿","波密","林芝","拉萨"];
  var weatherUrls = [
    "https://www.weather.com.cn/weather/101270101.shtml",
    "https://www.weather.com.cn/weather/101271701.shtml",
    "https://www.weather.com.cn/weather/101271704.shtml",
    "https://www.weather.com.cn/weather/101271301.shtml",
    "https://www.weather.com.cn/weather/101271401.shtml",
    "https://www.weather.com.cn/weather/101271402.shtml",
    "https://www.weather.com.cn/weather/101271403.shtml",
    "https://www.weather.com.cn/weather/101271404.shtml",
    "https://www.weather.com.cn/weather/101271405.shtml",
    "https://www.weather.com.cn/weather/101271406.shtml",
    "https://www.weather.com.cn/weather/101270201.shtml",
    "https://www.weather.com.cn/weather/101270101.shtml"
  ];
  
  var card = document.createElement("div");
  card.style.cssText = "background:rgba(74,156,212,0.08);border:1px solid rgba(74,156,212,0.15);border-radius:8px;padding:12px 14px;margin-bottom:10px";
  card.innerHTML = '<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px"><span style="font-size:1.2rem">🌤️</span><strong style="color:var(--bl);font-size:.9rem">实时天气查询</strong><span style="font-size:.68rem;color:var(--mt);margin-left:auto">中国天气网</span></div>' +
    '<div style="font-size:.73rem;color:var(--mt);margin-bottom:8px">点击城市名查看未来7天详细预报</div>' +
    '<div style="display:flex;flex-wrap:wrap;gap:5px">';
  
  for (var j = 0; j < cities.length; j++) {
    var isDone = j < prog;
    var isToday = j === prog;
    card.innerHTML += '<a href="' + weatherUrls[j] + '" target="_blank" style="display:inline-flex;align-items:center;gap:3px;padding:4px 10px;border-radius:6px;background:' + (isToday ? 'rgba(212,168,67,0.15)' : 'rgba(255,255,255,0.04)') + ';border:1px solid ' + (isToday ? 'rgba(212,168,67,0.25)' : 'rgba(255,255,255,0.06)') + ';color:' + (isDone || isToday ? 'var(--tx)' : 'var(--mt)') + ';text-decoration:none;font-size:.73rem">' + (isDone ? '✅ ' : (isToday ? '📍 ' : '')) + cities[j] + '</a>';
  }
  
  card.innerHTML += '</div>';
  
  if (prog > 0 && prog < 12) {
    card.innerHTML += '<div style="margin-top:6px;font-size:.7rem;color:var(--gr)">✅ 已到' + cities[prog-1] + ' · 查看明日' + cities[prog] + '天气</div>';
  } else if (prog === 0) {
    card.innerHTML += '<div style="margin-top:6px;font-size:.7rem;color:var(--mt)">📍 当前成都 · 查看雅安天气准备出发</div>';
  }
  
  weatherH3.parentNode.insertBefore(card, weatherH3.nextSibling);
}

// 4. 打卡记录 — 替换按钮
function fixCertBtns() {
  var bar = document.querySelector(".share-bar");
  if (!bar) return;
  var btns = bar.querySelectorAll("button");
  for (var i = 0; i < btns.length; i++) {
    var txt = btns[i].textContent;
    if (txt.indexOf("证书") !== -1 || txt.indexOf("行程卡") !== -1) {
      btns[i].textContent = "📋 打卡记录";
      btns[i].onclick = showCheckinSummary2;
    }
  }
}

function showCheckinSummary2() {
  var days2 = ["成都→雅安","雅安→泸定","泸定→新都桥","新都桥→理塘","理塘→巴塘","巴塘→芒康","芒康→左贡","左贡→八宿","八宿→波密","波密→八一镇","八一镇→松多","松多→拉萨"];
  var html = '<div style="padding:10px"><h3 style="color:var(--gd);font-size:1rem;margin-bottom:10px">📋 每日打卡记录</h3>';
  var done = 0;
  for (var i = 1; i <= 12; i++) {
    var s = localStorage.getItem("checkin_" + i);
    var r = days2[i-1];
    if (s) {
      try {
        var d = JSON.parse(s);
        html += '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04)"><span style="color:var(--gr)">✅</span><span style="flex:1;font-size:.82rem">D' + i + ' ' + r + '</span><span style="font-size:.72rem;color:var(--mt)">' + d.date + ' ' + d.time + '</span></div>';
        done++;
      } catch(e) { html += '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);opacity:.4"><span>⬜</span><span style="flex:1;font-size:.82rem">D' + i + ' ' + r + '</span></div>'; }
    } else {
      html += '<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.04);opacity:.4"><span>⬜</span><span style="flex:1;font-size:.82rem">D' + i + ' ' + r + '</span></div>';
    }
  }
  html += '<div style="margin-top:10px;padding:8px;background:rgba(212,168,67,0.08);border-radius:6px;text-align:center;font-size:.82rem">已打卡 <strong style="color:var(--gd)">' + done + '</strong> / 12 天</div></div>';
  
  // Show in lightbox
  var img = document.getElementById("lbi");
  var lc = document.getElementById("lbc");
  if (img && lc) {
    var w = 540, h = 700;
    var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + w + '" height="' + h + '"><rect width="' + w + '" height="' + h + '" fill="#0a1628" rx="12"/>';
    svg += '<text x="30" y="50" fill="#d4a843" font-size="22" font-weight="bold" font-family="sans-serif">📋 每日打卡记录</text>';
    svg += '<line x1="30" y1="65" x2="510" y2="65" stroke="rgba(255,255,255,0.06)"/>';
    for (var i2 = 1; i2 <= 12; i2++) {
      var s2 = localStorage.getItem("checkin_" + i2);
      var r2 = days2[i2-1];
      var ypos = 95 + (i2 - 1) * 38;
      var status2 = "⬜";
      var detail2 = "未到达";
      if (s2) { try { var d2 = JSON.parse(s2); status2 = "✅"; detail2 = d2.date + " " + d2.time; } catch(e) {} }
      svg += '<text x="30" y="' + ypos + '" fill="' + (status2 === "✅" ? '#6abf6a' : '#607888') + '" font-size="13" font-family="sans-serif">' + status2 + ' D' + i2 + ' ' + r2 + '</text>';
      svg += '<text x="380" y="' + ypos + '" fill="#90aec8" font-size="11" font-family="sans-serif">' + detail2 + '</text>';
    }
    svg += '<text x="270" y="590" text-anchor="middle" fill="#d4a843" font-size="15" font-weight="bold" font-family="sans-serif">已打卡 ' + done + ' / 12 天</text></svg>';
    img.src = "data:image/svg+xml," + encodeURIComponent(svg);
    document.getElementById("lb").classList.add("show");
    lc.textContent = "📋 " + done + "/12 天";
  }
}

// Init
setTimeout(function() {
  doCheckins();
  doWeather();
  fixCertBtns();
}, 800);

// Re-run when tab changes
document.addEventListener("click", function() {
  setTimeout(fixCertBtns, 300);
});

console.log("🔧 v3.11 (fixed) — 分享·打卡·天气");
// FIX: share - event delegation
document.addEventListener("click",function(e){
var b=e.target.closest(".share-btn");if(!b)return;
var p=parseInt(localStorage.getItem("prog")||"0");
var m="🚴 挑战川藏线！成都→拉萨，约2120km，翻越14座4000m+高山！\n已完成 "+p+"/12 天\n"+location.href;
function cp(t){var x=document.createElement("textarea");x.value=t;x.style.cssText="position:fixed;top:0;left:0;z-index:99999";document.body.appendChild(x);x.select();document.execCommand("copy");document.body.removeChild(x);alert("✅ 已复制，请打开微信粘贴");}
if(b.textContent.indexOf("微信")!==-1){e.preventDefault();try{cp(m);}catch(e2){prompt("复制:",m);}}
if(b.textContent.indexOf("复制")!==-1){e.preventDefault();try{cp(location.href);}catch(e2){prompt("复制:",location.href);}}
if(b.textContent.indexOf("微博")!==-1){e.preventDefault();window.open("https://service.weibo.com/share/share.php?title="+encodeURIComponent(m)+"&url="+encodeURIComponent(location.href));}
});

// FIX: check-in - event delegation
document.addEventListener("change",function(e){
if(!e.target.classList.contains("cp"))return;
var d=parseInt(e.target.dataset.day);if(!d)return;
var c=e.target.closest(".dc");if(!c)return;
var t=c.querySelector(".checkin-time");
if(!t){t=document.createElement("div");t.className="checkin-time";t.style.cssText="margin:4px 0 0;font-size:.72rem";var s=c.querySelector(".si.chk");if(s&&s.parentNode)s.parentNode.insertBefore(t,s.nextSibling);}
if(e.target.checked){
var n=new Date();var ds=n.toLocaleDateString("zh-CN",{month:"2-digit",day:"2-digit"});var ts=n.toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit"});
var ends="雅安,泸定,新都桥,理塘,巴塘,芒康,左贡,八宿,波密,八一镇,松多,拉萨".split(",");
localStorage.setItem("checkin_"+d,JSON.stringify({date:ds,time:ts,day:d}));
t.innerHTML='<span style="color:var(--gr)">✅ '+ds+' '+ts+' 抵达'+ends[d-1]+'</span>';
}else{localStorage.removeItem("checkin_"+d);t.innerHTML="";}
});

// FIX: weather card
setTimeout(function(){
var h=document.querySelectorAll("h3");var wx=null;
for(var i=0;i<h.length;i++){if(h[i].textContent.indexOf("天气")!==-1){wx=h[i];break;}}
if(!wx||wx.parentNode.querySelector(".wx-card"))return;
var p=parseInt(localStorage.getItem("prog")||"0");
var cities="成都,雅安,泸定,康定,理塘,巴塘,芒康,左贡,八宿,波密,林芝,拉萨".split(",");
var urls=["https://www.weather.com.cn/weather/101270101.shtml","https://www.weather.com.cn/weather/101271701.shtml","https://www.weather.com.cn/weather/101271704.shtml","https://www.weather.com.cn/weather/101271301.shtml","https://www.weather.com.cn/weather/101271401.shtml","https://www.weather.com.cn/weather/101271402.shtml","https://www.weather.com.cn/weather/101271403.shtml","https://www.weather.com.cn/weather/101271404.shtml","https://www.weather.com.cn/weather/101271405.shtml","https://www.weather.com.cn/weather/101271406.shtml","https://www.weather.com.cn/weather/101270201.shtml","https://www.weather.com.cn/weather/101270101.shtml"];
var card=document.createElement("div");card.className="wx-card";card.style.cssText="background:rgba(74,156,212,0.08);border:1px solid rgba(74,156,212,0.15);border-radius:8px;padding:12px 14px;margin-bottom:10px";
var htm='<div style="display:flex;align-items:center;gap:6px;margin-bottom:8px"><span style="font-size:1.2rem">🌤️</span><strong style="color:var(--bl);font-size:.9rem">实时天气查询</strong><span style="font-size:.68rem;color:var(--mt);margin-left:auto">中国天气网</span></div>';
htm+='<div style="font-size:.73rem;color:var(--mt);margin-bottom:8px">点击城市名查看未来7天详细预报</div><div style="display:flex;flex-wrap:wrap;gap:5px">';
for(var j=0;j<cities.length;j++){var dn=j<p;var nw=j===p;
htm+='<a href="'+urls[j]+'" target="_blank" style="display:inline-flex;align-items:center;gap:3px;padding:4px 10px;border-radius:6px;background:'+(nw?"rgba(212,168,67,0.15)":"rgba(255,255,255,0.04)")+';border:1px solid '+(nw?"rgba(212,168,67,0.25)":"rgba(255,255,255,0.06)")+';color:'+((dn||nw)?"var(--tx)":"var(--mt)")+';text-decoration:none;font-size:.73rem">'+(dn?"✅ ":(nw?"📍 ":""))+cities[j]+'</a>';}
htm+='</div>';
if(p>0&&p<12)htm+='<div style="margin-top:6px;font-size:.7rem;color:var(--gr)">✅ 已到'+cities[p-1]+' · 查看明日'+cities[p]+'天气</div>';
else if(p===0)htm+='<div style="margin-top:6px;font-size:.7rem;color:var(--mt)">📍 当前成都 · 查看雅安天气</div>';
card.innerHTML=htm;wx.parentNode.insertBefore(card,wx.nextSibling);
},1200);

console.log("FIX: share | checkin | weather");
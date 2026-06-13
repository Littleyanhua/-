(function(){
 try{
// CSS
var S=document.createElement("style");
S.textContent=".album-grid,.gal{grid-template-columns:repeat(4,1fr)!important}"+
".album-item{position:relative;overflow:hidden}"+
".photo-actions{position:absolute;bottom:4px;left:0;right:0;display:flex;justify-content:center;gap:16px;opacity:0;transition:opacity .25s;pointer-events:none;z-index:2}"+
".album-item:hover .photo-actions,.gali:hover .photo-actions{opacity:1;pointer-events:auto}"+
".photo-actions button{background:transparent;border:none;color:rgba(255,255,255,0.85);font-size:.7rem;cursor:pointer;padding:2px 8px;text-shadow:0 1px 4px rgba(0,0,0,0.6)}"+
".modal-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.85);z-index:9999;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(6px)}"+
".modal-card{background:#0f2340;border:1px solid rgba(212,168,67,0.3);border-radius:14px;padding:28px 26px;max-width:400px;width:90%;text-align:center;box-shadow:0 12px 60px rgba(0,0,0,0.4)}"+
".modal-quote{font-size:1rem;color:#eef2f6;line-height:1.7;margin:16px 0;font-style:italic}"+
".modal-close{padding:7px 24px;background:#d4a843;border:none;border-radius:8px;color:#0a1628;font-size:.8rem;font-weight:600;cursor:pointer}"+
".perm-overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.7);z-index:9998;display:flex;align-items:center;justify-content:center}"+
".perm-card{background:#0f2340;border:1px solid rgba(255,255,255,0.1);border-radius:14px;padding:24px;max-width:320px;width:85%;text-align:center}"+
".perm-agree{padding:8px 28px;background:#4a9cd4;border:none;border-radius:8px;color:#fff;font-size:.82rem;font-weight:600;cursor:pointer;margin-right:10px}"+
".perm-disagree{padding:8px 28px;background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:8px;color:#90aec8;font-size:.82rem;cursor:pointer}"+
".log-pub-btn{padding:4px 14px;background:#d4a843;border:none;border-radius:6px;color:#0a1628;font-size:.72rem;font-weight:600;cursor:pointer}"+
".log-del-btn{background:none;border:none;color:#e85d5d;cursor:pointer;font-size:.68rem;padding:2px 6px}"+
".log-entry{padding:6px 10px;margin:4px 0;background:rgba(255,255,255,0.04);border-radius:6px;font-size:.78rem;line-height:1.5}";
document.head.appendChild(S);

// Hide Weibo and save-btns via JS
setTimeout(function(){
document.querySelectorAll(".share-btn").forEach(function(b){
var t=b.textContent;
if(t.indexOf("微博")>-1||t.indexOf("行程")>-1||t.indexOf("打卡")>-1)b.style.display="none";
});
},1000);

// Remove inline onclick from album items
setTimeout(function(){
document.querySelectorAll(".album-item").forEach(function(el){el.removeAttribute("onclick");});
},500);

// Quotes for share dialog
var Q=["路在轮下，心在天上。","318不是一条路，是一种信仰。","每一个弯道后面，都是你从未见过的自己。","骑完川藏线的人，都带着故事回来。","不是因为有意义才出发，而是出发了才有意义。","川藏线会给你答案，在你最疲惫的时候。","海拔5000米的空气很稀薄，但梦想很浓厚。","14座大山，14次重生。","成都到拉萨，2160公里，每一米都算数。","翻过折多山，人生没有过不去的坎。","骑行不是为了征服大山，而是为了遇见自己。","当你觉得最艰难的时候，正是离拉萨最近的时候。","川藏线上没有捷径，就像人生一样。","每一个垭口都是一个新的起点。","风在耳边，路在脚下，心在远方。","川藏线最美的不是风景，是坚持到底的自己。","骑行是一种修行，川藏线是最长的转经筒。","在4000米的海拔上，连呼吸都需要勇气。","下坡有多爽，上坡就有多虐——这才是川藏线。","当你看到布达拉宫的那一刻，所有的汗水都变成了眼泪。","川藏线会拿走你的体力，但会还给你一个更强大的自己。","骑过一次川藏线，这辈子就不一样了。","不是每个人都能骑到拉萨，但你值得试试。"];

function shareDlg(){
var q=Q[Math.floor(Math.random()*Q.length)];var u=location.href;var t=q+"\n\n"+u;
var o=document.createElement("div");o.className="modal-overlay";
o.innerHTML='<div class="modal-card"><div style="font-size:2rem;margin-bottom:8px">🚴</div><div class="modal-quote">"'+q+'"</div><div class="modal-url">'+u+'</div><button class="modal-close" id="c1">我知道了</button><div class="modal-copied" id="c2" style="display:none">✅ 已复制</div></div>';
document.body.appendChild(o);
try{navigator.clipboard.writeText(t).then(function(){document.getElementById("c2").style.display="block"}).catch(function(){})}catch(e){}
document.getElementById("c1").onclick=function(){o.remove()};o.onclick=function(e){if(e.target===o)o.remove()};
}

// Share click
document.addEventListener("click",function(e){
var b=e.target.closest(".share-btn");if(!b)return;
var t=b.textContent;
if(t.indexOf("微信")>-1){e.stopPropagation();e.preventDefault();shareDlg();}
},true);

// Album click - handle upload/view AND change/delete
document.addEventListener("click",function(e){
var it=e.target.closest(".album-item,.gali");if(!it)return;
e.stopPropagation();e.preventDefault();
// Compute key
var day=it.dataset.day||"";var p=it.parentNode;var idx=p?Array.from(p.children).indexOf(it):0;
var pfx=it.classList.contains("gali")?"ph_g_":"ph_a_";var key=pfx+(day||"0")+"_"+idx;it.dataset.pk=key;
// Check if clicking action button
var ab=e.target.closest("[data-act]");
if(ab){
var k=it.dataset.pk;
if(ab.dataset.act==="chg"){var inp=document.createElement("input");inp.type="file";inp.accept="image/*";
inp.onchange=function(ev){var f=ev.target.files[0];if(!f||f.size>1048576){alert("图片过大，请选择1MB以内");return;}
var rd=new FileReader();rd.onload=function(ev2){var d=ev2.target.result;try{localStorage.setItem(k,d);}catch(er){alert("存储空间不足");return;}
it.innerHTML='<img src="'+d+'" style="width:100%;height:100%;object-fit:cover;border-radius:4px;display:block"><div class="photo-actions"><button data-act="chg">更换</button><button data-act="del">删除</button></div>';it.classList.add("photo-uploaded");};rd.readAsDataURL(f);};inp.click();}
else if(ab.dataset.act==="del"){localStorage.removeItem(k);
it.innerHTML='<div style="display:flex;align-items:center;justify-content:center;height:100%"><span style="font-size:2rem;opacity:.3">📸</span></div>';it.classList.remove("photo-uploaded");}
return;
}
// Normal click - upload or view
var sv=localStorage.getItem(key);
if(sv&&sv.length>100){
var lb=document.getElementById("lbi");if(lb){lb.src=sv;document.getElementById("lb").classList.add("show");var lc=document.getElementById("lbc");if(lc)lc.textContent="📷 照片";}
}else{
var ov=document.createElement("div");ov.className="perm-overlay";
ov.innerHTML='<div class="perm-card"><div style="font-size:2rem">📸</div><p>访问相册以选择要上传的美景照片</p><button class="perm-agree" id="pa">同意</button><button class="perm-disagree" id="pd">不同意</button></div>';
document.body.appendChild(ov);
document.getElementById("pa").onclick=function(){ov.remove();var inp=document.createElement("input");inp.type="file";inp.accept="image/*";
inp.onchange=function(ev){var f=ev.target.files[0];if(!f||f.size>1048576){alert("图片过大，请选1MB以内");return;}
var rd=new FileReader();rd.onload=function(ev2){var d=ev2.target.result;try{localStorage.setItem(key,d);}catch(er){alert("存储空间不足");return;}
it.innerHTML='<img src="'+d+'" style="width:100%;height:100%;object-fit:cover;border-radius:4px;display:block"><div class="photo-actions"><button data-act="chg">更换</button><button data-act="del">删除</button></div>';it.classList.add("photo-uploaded");};rd.readAsDataURL(f);};inp.click();};
document.getElementById("pd").onclick=function(){ov.remove();};
ov.onclick=function(ev){if(ev.target===ov)ov.remove();};}
},true);

// Trip log
setTimeout(function initLogs(){
document.querySelectorAll(".log-input").forEach(function(ta){
if(ta.parentNode.querySelector(".log-pub-btn"))return;
var d=parseInt(ta.dataset.day)||0;
var b=document.createElement("button");b.className="log-pub-btn";b.textContent="📝 发表";
b.onclick=function(){var v=ta.value.trim();if(!v){alert("请填写日志内容");return;}
var ls=JSON.parse(localStorage.getItem("tl")||"[]");ls.unshift({id:Date.now(),day:d,text:v,time:new Date().toLocaleString("zh-CN",{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"})});localStorage.setItem("tl",JSON.stringify(ls));ta.value="";rLogs(d,ta.parentNode.querySelector(".lf"));};
ta.parentNode.insertBefore(b,ta.nextSibling);
var f=document.createElement("div");f.className="lf";ta.parentNode.insertBefore(f,b.nextSibling);rLogs(d,f);
});
function rLogs(d,f){if(!f)return;
var a=JSON.parse(localStorage.getItem("tl")||"[]").filter(function(l){return l.day===d});
f.innerHTML=a.length?a.map(function(l){
return '<div class="log-entry"><div>'+l.text.replace(/</g,"&lt;")+'</div><div style="display:flex;justify-content:space-between;margin-top:4px"><span style="font-size:.65rem;color:#607888">'+l.time+'</span><button class="log-del-btn" data-id="'+l.id+'">删除</button></div></div>';
}).join(""):"";
f.querySelectorAll(".log-del-btn").forEach(function(b2){b2.onclick=function(e){e.stopPropagation();var id=parseInt(this.dataset.id);var a2=JSON.parse(localStorage.getItem("tl")||"[]").filter(function(l){return l.id!==id});localStorage.setItem("tl",JSON.stringify(a2));document.querySelectorAll(".lf").forEach(function(f2){var pd2=0;var pv2=f2.previousElementSibling;if(pv2&&pv2.previousElementSibling)pd2=parseInt(pv2.previousElementSibling.dataset.day)||0;rLogs(pd2,f2);});};});
}
},1500);

// Check-in
document.addEventListener("change",function(e){
if(!e.target.classList.contains("cp"))return;
var d=parseInt(e.target.dataset.day);if(!d)return;
var c=e.target.closest(".dc");if(!c)return;
e.stopPropagation();
var t=c.querySelector(".checkin-time");
if(!t){t=document.createElement("div");t.className="checkin-time";t.style.cssText="margin:4px 0 0;font-size:.72rem";var s=c.querySelector(".si.chk");if(s&&s.parentNode)s.parentNode.insertBefore(t,s.nextSibling);}
if(e.target.checked){
try{var n=new Date();var ds=n.toLocaleDateString("zh-CN",{month:"2-digit",day:"2-digit"});var ts=n.toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit"});
localStorage.setItem("ci_"+d,JSON.stringify({date:ds,time:ts,day:d}));
t.innerHTML="✅ "+ds+" "+ts+" 抵达"+["雅安","泸定","新都桥","理塘","巴塘","芒康","左贡","八宿","波密","八一镇","松多","拉萨"][d-1];
}catch(ex){}
if(window.upPr){try{window.upPr()}catch(ex){}}
}else{try{localStorage.removeItem("ci_"+d);t.innerHTML="";}catch(ex){}}
},true);

// Weather
setTimeout(function(){
try{var h=document.querySelectorAll("h3");var w=null;
for(var i=0;i<h.length;i++){if(h[i].textContent.indexOf("天气")>-1){w=h[i];break;}}
if(!w||w.parentNode.querySelector(".wx-card"))return;
var p=parseInt(localStorage.getItem("prog")||"0");
var ct="成都,雅安,泸定,康定,理塘,巴塘,芒康,左贡,八宿,波密,林芝,拉萨".split(",");
var u="101270101,101271701,101271704,101271301,101271401,101271402,101271403,101271404,101271405,101271406,101270201,101140101".split(",");
var cd=document.createElement("div");cd.className="wx-card";cd.style.cssText="background:rgba(74,156,212,0.08);border:1px solid rgba(74,156,212,0.15);border-radius:8px;padding:12px 14px;margin-bottom:10px";
var hh="<div style=\"display:flex;align-items:center;gap:6px;margin-bottom:8px\"><span style=\"font-size:1.2rem\">🌤️</span><strong style=\"color:#4a9cd4;font-size:.9rem\">实时天气查询</strong><span style=\"color:#90aec8;font-size:.68rem;margin-left:auto\">中国天气网</span></div>";
hh+="<div style=\"display:flex;flex-wrap:wrap;gap:5px\">";
for(var j=0;j<ct.length;j++){var dn=j<p;var nw=j===p;
hh+="<a href=\"https://www.weather.com.cn/weather/"+u[j]+".shtml\" target=\"_blank\" style=\"display:inline-flex;align-items:center;gap:3px;padding:5px 10px;border-radius:6px;background:"+(nw?"rgba(212,168,67,0.15)":"rgba(255,255,255,0.04)")+";border:1px solid "+(nw?"rgba(212,168,67,0.25)":"rgba(255,255,255,0.06)")+";color:"+((dn||nw)?"#eef2f6":"#90aec8")+";text-decoration:none;font-size:.73rem\">"+(dn?"✅ ":(nw?"📍 ":""))+ct[j]+"</a>";}
hh+="</div>";
if(p>0&&p<12)hh+="<div style=\"margin-top:6px;font-size:.7rem;color:#6abf6a\">✅ 已到"+ct[p-1]+" · 查看明日"+ct[p]+"天气</div>";
else if(p===0)hh+="<div style=\"margin-top:6px;font-size:.7rem;color:#90aec8\">📍 当前成都 · 查看明日雅安天气</div>";
cd.innerHTML=hh;w.parentNode.insertBefore(cd,w.nextSibling);
}catch(ex){}
},3000);

console.log("fix v3.15 OK");
}catch(e){console.error("fix err",e)}
})();
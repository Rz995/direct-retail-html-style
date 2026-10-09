/* Demonstration only. Replace this data adapter for real business content. */
(function(){
'use strict';
var DATA={dates:['2026-01-31','2026-02-28','2026-03-31','2026-04-30','2026-05-31','2026-06-30'],metrics:[
{key:'customers',group:'客户',name:'服务客户',unit:'万户',values:[108.2,109.6,112.8,114.1,115.5,120.6],shares:[23.5,23.7,23.8,24.1,24.0,24.4]},
{key:'aum',group:'资金',name:'年日均AUM',unit:'亿元',values:[510.2,513.4,515.3,518.9,522.1,524.6],shares:[30.5,30.6,30.9,31.1,31.0,31.2]},
{key:'deposit',group:'资金',name:'时点存款',unit:'亿元',values:[380.2,384.1,381.2,390.4,393.2,390.5],shares:[25.1,25.7,25.2,26.1,26.5,26.2]},
{key:'sales',group:'产销',name:'综合产销',unit:'亿元',values:[12.5,26.8,40.6,55.3,69.4,81.6],shares:[38.4,38.9,39.5,39.2,39.8,40.3]}
]};
function el(id){return document.getElementById(id)}
function valid(v){return typeof v==='number'&&isFinite(v)}
function esc(v){return String(v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]})}
function number(v){return valid(v)?v.toFixed(2):'—'}
function delta(v){return valid(v)?'<span class="'+(v>0?'up':v<0?'down':'flat')+'">'+(v>0?'+':'')+number(v)+'</span>':'—'}
var current=5,compare=4,opened=null,trigger=null;
DATA.dates.forEach(function(d,i){el('currentDate').add(new Option(d,String(i)));el('compareDate').add(new Option(d,String(i)))});
el('currentDate').value=String(current);el('compareDate').value=String(compare);
function points(values,dates){return values.map(function(v,i){return {value:v,date:dates[i]}}).filter(function(p){return valid(p.value)})}
function chart(values,dates,label){
 var p=points(values,dates);if(!p.length)return '<span class="muted">暂无数据</span>';
 var nums=p.map(function(x){return x.value}),lo=Math.min.apply(null,nums),hi=Math.max.apply(null,nums),pad=hi===lo?Math.max(Math.abs(hi)*.01,.01):(hi-lo)*.08,min=lo-pad,max=hi+pad;
 var xy=p.map(function(pt,i){return {x:p.length===1?150:5+i*290/(p.length-1),y:62-(pt.value-min)/(max-min)*56,value:pt.value,date:pt.date}});
 var line=xy.map(function(p,i){return (i?'L':'M')+p.x.toFixed(2)+' '+p.y.toFixed(2)}).join(' '),area=line+' L '+xy[xy.length-1].x+' 66 L '+xy[0].x+' 66 Z';
 return '<svg class="spark" viewBox="0 0 300 72" preserveAspectRatio="none" role="img" aria-label="'+esc(label+'，有效值'+number(lo)+'至'+number(hi))+'"><title>'+esc(label+'；每图独立纵轴')+'</title><path class="area" d="'+area+'"/><path class="line" d="'+line+'"/>'+xy.map(function(p){return '<circle cx="'+p.x+'" cy="'+p.y+'" r="'+(xy.length===1?3:2)+'"><title>'+esc(p.date+'：'+number(p.value))+'</title></circle>'}).join('')+'</svg>';
}
function render(){
 var dates=DATA.dates.slice(0,current+1);el('dateStamp').textContent='演示数据截至 '+DATA.dates[current]+' · 对比日期 '+DATA.dates[compare];
 el('summary').textContent='演示总览：服务客户 '+number(DATA.metrics[0].values[current])+' 万户，年日均AUM '+number(DATA.metrics[1].values[current])+' 亿元。将业务结论放在数字前面，详细说明按需展开。';
 el('metrics').innerHTML=DATA.metrics.map(function(m){return '<button class="card metric" data-metric="'+m.key+'" aria-expanded="false" aria-controls="overlay"><span class="metric-name"><span>'+esc(m.name)+'</span><span aria-hidden="true">↗</span></span><span class="value num">'+number(m.values[current])+'<small>'+esc(m.unit)+'</small></span><span class="delta">较对比期 '+delta(m.values[current]-m.values[compare])+' '+esc(m.unit)+'</span>'+chart(m.values.slice(0,current+1),dates,m.name)+'<span class="mini-date">'+dates[0]+' — '+dates[dates.length-1]+' · 最新</span></button>'}).join('');
 el('metricRows').innerHTML=DATA.metrics.map(function(m){return '<tr><td>'+esc(m.group)+'</td><td><button class="text-button" data-metric="'+m.key+'" aria-controls="overlay">'+esc(m.name)+'</button><small>'+esc(m.unit)+'</small></td><td>'+number(m.values[current])+'</td><td>'+delta(m.values[current]-m.values[compare])+'</td><td>'+number(m.shares[current])+'%</td><td><span class="table-spark">'+chart(m.shares.slice(0,current+1),dates,m.name+'全省占比，%')+'</span></td></tr>'}).join('');
 Array.prototype.forEach.call(el('compareDate').options,function(o){o.disabled=Number(o.value)>current});
}
function renderLarge(){
 var m=opened,start=Number(el('range').value),dates=DATA.dates.slice(start,current+1),values=m.values.slice(start,current+1),ps=points(values,dates);
 el('largeChart').innerHTML=chart(values,dates,m.name+'，'+m.unit);el('rangeDate').textContent=dates[0];
 el('chartRange').textContent=ps.length?'有效范围 '+number(Math.min.apply(null,ps.map(function(p){return p.value})))+' — '+number(Math.max.apply(null,ps.map(function(p){return p.value})))+' '+m.unit+' · 最新 '+dates[dates.length-1]:'暂无数据';
 el('chartRows').innerHTML=dates.map(function(d,i){return '<tr><td>'+d+'</td><td>'+number(values[i])+' '+esc(m.unit)+'</td></tr>'}).join('');
}
function close(){el('overlay').hidden=true;el('page').removeAttribute('aria-hidden');document.body.style.overflow='';if(trigger){trigger.setAttribute('aria-expanded','false');trigger.focus()}opened=null}
function open(key,t){opened=DATA.metrics.filter(function(m){return m.key===key})[0];if(!opened)return;trigger=t;trigger.setAttribute('aria-expanded','true');el('dialogTitle').textContent=opened.name+' · 趋势';el('chartNote').textContent='演示数据 · '+opened.unit+' · 纵轴按有效值范围缩放';el('range').max=String(current);el('range').value='0';renderLarge();el('overlay').hidden=false;el('page').setAttribute('aria-hidden','true');document.body.style.overflow='hidden';el('close').focus()}
el('page').addEventListener('click',function(e){var t=e.target.closest('[data-metric]');if(t)open(t.getAttribute('data-metric'),t)});
el('currentDate').addEventListener('change',function(){current=Number(this.value);if(compare>current){compare=Math.max(0,current-1);el('compareDate').value=String(compare)}render()});
el('compareDate').addEventListener('change',function(){compare=Number(this.value);render()});
el('range').addEventListener('input',renderLarge);el('close').addEventListener('click',close);el('overlay').addEventListener('click',function(e){if(e.target===this)close()});
document.addEventListener('keydown',function(e){if(el('overlay').hidden)return;if(e.key==='Escape'){close();return}if(e.key==='Tab'){var items=el('overlay').querySelectorAll('button,input,[tabindex="0"]'),first=items[0],last=items[items.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}});
function dark(){return document.documentElement.getAttribute('data-theme')==='dark'||(!document.documentElement.getAttribute('data-theme')&&window.matchMedia('(prefers-color-scheme:dark)').matches)}
function themeLabel(){el('theme').setAttribute('aria-label',dark()?'切换为浅色':'切换为深色');el('theme').title=el('theme').getAttribute('aria-label')}
try{var saved=localStorage.getItem('direct-retail-style-theme');if(saved==='dark'||saved==='light')document.documentElement.setAttribute('data-theme',saved)}catch(e){}
el('theme').addEventListener('click',function(){var value=dark()?'light':'dark';document.documentElement.setAttribute('data-theme',value);try{localStorage.setItem('direct-retail-style-theme',value)}catch(e){}themeLabel()});
el('refresh').addEventListener('click',function(){render();el('status').textContent='演示数据已重新绘制；未连接业务接口。'});
el('specLink').addEventListener('click',function(){el('规范').open=true});themeLabel();render();
})();

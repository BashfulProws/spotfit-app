import {products,stores,sizeOptions,areas,demoProfiles,radii} from './data.js';
export const money=n=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(n);
export const initialState=()=>({version:1,location:{...areas.Panjim},category:'topwear',query:'',sizes:{topwear:null,bottomwear:null,footwear:null},activeProfileId:null,profiles:structuredClone(demoProfiles),filters:{radius:2,fabric:'Any',brand:'All brands',colour:'Any',fit:'Any',availability:'Any status',showUnavailable:false},selectedProductId:'max-white',selectedStoreId:'max-panjim',holdHours:1,reservations:[],requests:[],activeRequestId:null,activeReservationId:null,overrides:{},signedIn:false,signedInAs:null,onboarded:false});
export function distanceKm(a,b){const r=x=>x*Math.PI/180;const dlat=r(b.lat-a.lat),dlng=r(b.lng-a.lng);const h=Math.sin(dlat/2)**2+Math.cos(r(a.lat))*Math.cos(r(b.lat))*Math.sin(dlng/2)**2;return 6371*2*Math.atan2(Math.sqrt(h),Math.sqrt(1-h));}
export function selectedSize(s){return s.sizes[s.category]||null;}
export function availableCount(p,size,s,now=Date.now()){
 const base=s.overrides[p.id+':'+size]??p.stock[size]??0;
 const held=s.reservations.filter(r=>r.productId===p.id&&r.size===size&&r.status==='confirmed'&&r.expiresAt>now).length;
 return Math.max(0,base-held);
}
export function stockStatus(p,size,s,now=Date.now()){
 if(!size)return 'Choose size';if(p.verified===false)return 'Check with store';const n=availableCount(p,size,s,now);return n===0?'Check with store':n<=2?'Running fast':'Available';
}
// Plural-tolerant word match: 'shirts' finds 'shirt', 'jeans' finds 'jean', 't-shirt' and 'tshirt' both work.
export function termMatches(hay,w){w=w.replace(/[-’']/g,' ').trim();if(!w)return true;const flat=hay.replace(/ /g,'');if(hay.includes(w)||flat.includes(w.replace(/ /g,'')))return true;const stem=w.length>3&&w.endsWith('es')&&!w.endsWith('ses')?w.slice(0,-2):w.length>3&&w.endsWith('s')&&!w.endsWith('ss')?w.slice(0,-1):null;return !!stem&&(hay.includes(stem)||flat.includes(stem));}
export function searchProducts(s,now=Date.now(),{ignoreRadius=false,includeUnavailable=false}={}){
 const size=selectedSize(s);const words=s.query.toLowerCase().trim().split(/\s+/).filter(Boolean);const f=s.filters;
 return products.filter(p=>{
  const st=stores.find(x=>x.id===p.storeId);
  if(p.category!==s.category||(!ignoreRadius&&distanceKm(s.location,st)>f.radius))return false;
  const hay=(p.name+' '+(p.fabric||'')+' '+st.brand+' '+p.category+' '+(p.tags||'')).toLowerCase().replace(/[-’']/g,' ');if(!words.every(w=>termMatches(hay,w)))return false;
  if(f.brand!=='All brands'&&st.brand!==f.brand)return false;
  if(f.colour!=='Any'&&p.colour!==f.colour)return false;
  if(p.category!=='footwear'&&f.fabric!=='Any'&&p.fabric!==f.fabric)return false;
  if(f.fit!=='Any'&&p.fit!==f.fit)return false;
  const status=stockStatus(p,size,s,now);
  if(!f.showUnavailable&&!includeUnavailable&&size&&status==='Check with store')return false;
  if(f.availability==='Available only'&&status!=='Available')return false;
  if(f.availability==='Running fast'&&status!=='Running fast')return false;
  if(f.availability==='Check with store'&&status!=='Check with store')return false;
  return true;
 }).sort((a,b)=>relevance(b,words)-relevance(a,words)||distanceKm(s.location,stores.find(x=>x.id===a.storeId))-distanceKm(s.location,stores.find(x=>x.id===b.storeId)));
}
// Whole-word matches in the product name rank first ('shirts' lists shirts before t-shirts), then nearest first.
function relevance(p,words){const n=p.name.toLowerCase();return words.filter(w=>{const e=w.replace(/[^a-z0-9 ]/g,'').replace(/(es|s)$/,'');return !!e&&new RegExp('(?<![a-z0-9-])'+e+'(es|s)?(?![a-z0-9-])').test(n);}).length;}
export function nearbyStores(s){return stores.map(st=>({...st,distance:distanceKm(s.location,st)})).filter(st=>st.distance<=s.filters.radius).sort((a,b)=>a.distance-b.distance);}
export function changeCategory(s,category){if(!sizeOptions[category])throw Error('Unknown category');s.category=category;s.query='';s.filters={...s.filters,fabric:'Any',fit:'Any',colour:'Any',brand:'All brands',availability:'Any status',showUnavailable:false};return s;}
export function applyProfile(s,id){const p=s.profiles.find(p=>p.id===id);if(!p)throw Error('Profile not found');s.activeProfileId=id;s.sizes={...p.sizes};return s;}
export function saveProfile(s,p){const name=String(p.name||'').trim();if(!name||name.length>50)throw Error('Enter a name of 1 to 50 characters.');for(const [k,v] of Object.entries(p.sizes||{}))if(v&&!sizeOptions[k]?.includes(v))throw Error('Select a valid '+k+' size.');for(const v of Object.values(p.measurements||{}))if(v!==null&&(!Number.isFinite(v)||v<=0||v>500))throw Error('Enter a measurement above 0 and no more than 500 cm.');const clean={id:p.id||crypto.randomUUID(),name,sizes:{topwear:null,bottomwear:null,footwear:null,...p.sizes},measurements:{...p.measurements}};const i=s.profiles.findIndex(x=>x.id===clean.id);if(i<0)s.profiles.push(clean);else s.profiles[i]=clean;if(s.activeProfileId===clean.id)s.sizes={...clean.sizes};return clean;}
export function deleteProfile(s,id){s.profiles=s.profiles.filter(p=>p.id!==id);if(s.activeProfileId===id){s.activeProfileId=null;s.sizes={topwear:null,bottomwear:null,footwear:null};}}
export function toCm(value,unit){if(value===''||value===null)return null;const n=Number(value);if(!Number.isFinite(n)||n<=0)throw Error('Enter a positive measurement.');return unit==='in'?n*2.54:n;}
export function fromCm(value,unit){if(value===undefined||value===null)return '';return String(Math.round((unit==='in'?value/2.54:value)*100)/100);}
export function requestReservation(s,productId,size,hours,{online=true,now=Date.now()}={}){
 const p=products.find(p=>p.id===productId);if(!online)throw Error('Reconnect before requesting a hold.');if(!p||!size||!sizeOptions[p.category].includes(size))throw Error('Choose a product and size.');
 const st=stores.find(x=>x.id===p.storeId);if(!st.holdHours.includes(hours))throw Error('Choose a hold window offered by this store.');
 if(stockStatus(p,size,s,now)==='Check with store')throw Error('This size is not verified available. Ask the store first.');
 const duplicate=s.reservations.find(r=>r.productId===productId&&r.size===size&&(r.status==='pending'||r.status==='confirmed'&&r.expiresAt>now));if(duplicate)return duplicate;
 const r={id:crypto.randomUUID(),code:'SF '+String(Math.floor(1000+Math.random()*9000)),productId,storeId:p.storeId,size,hours,status:'pending',requestedAt:now,expiresAt:null};s.reservations.unshift(r);s.activeReservationId=r.id;return r;
}
export function confirmReservation(s,id,{online=true,now=Date.now()}={}){
 const r=s.reservations.find(x=>x.id===id);if(!r)throw Error('Reservation not found.');if(!online)throw Error('Reconnect to check confirmation.');if(r.status!=='pending')return r;
 const p=products.find(x=>x.id===r.productId);if(availableCount(p,r.size,s,now)<1||p.verified===false){r.status='failed';return r;}
 r.status='confirmed';r.confirmedAt=now;r.expiresAt=now+r.hours*3600000;return r;
}
export function cancelReservation(s,id){const r=s.reservations.find(x=>x.id===id);if(!r)throw Error('Reservation not found.');if(r.status==='pending'||r.status==='confirmed')r.status='cancelled';return r;}
export function expireReservations(s,now=Date.now()){for(const r of s.reservations)if(r.status==='confirmed'&&r.expiresAt<=now)r.status='expired';}
export function createRequest(s,{productId,size,message,name,phone,kind='size'}){
 const p=products.find(x=>x.id===productId);if(!p||!size)throw Error('Select an item and size first.');if(kind==='size'&&stockStatus(p,size,s)!=='Check with store')throw Error('This size is already available. You can reserve it.');
 if(!String(message).trim()||message.length>1000)throw Error('Write a message of 1 to 1,000 characters.');if(!String(name).trim()||name.length>50)throw Error('Enter your contact name.');if(!/^\+?[\d\s-]{10,16}$/.test(phone))throw Error('Enter a valid contact number.');
 const r={id:crypto.randomUUID(),kind,productId,size,storeId:p.storeId,name:name.trim(),phone:phone.trim(),createdAt:Date.now(),status:'sent',messages:[{side:'you',text:message.trim(),at:Date.now()}]};s.requests.unshift(r);s.activeRequestId=r.id;return r;
}
export function demoReply(s,id,scenario){const r=s.requests.find(x=>x.id===id);if(!r)throw Error('Request not found.');const replies={arrange:`We can arrange ${r.size} in about 2 hours. We will confirm when it is ready.`,branch:`We cannot arrange ${r.size} here. Our Mapusa branch may have it. Contact them to check.`,unable:`Sorry, we cannot arrange ${r.size}. Please check a different store.`,ready:`Your requested size ${r.size} is now available in this demo. Request a hold before leaving.`};if(!replies[scenario])throw Error('Unknown demo response.');r.status=scenario;r.messages.push({side:'store',text:replies[scenario],at:Date.now()});if(scenario==='ready')s.overrides[r.productId+':'+r.size]=3;return r;}

/* Map helpers. The map is schematic: it projects sample coordinates into a fixed-size box. */
export const nextRadius=r=>radii.find(x=>x>r)??null;
export const prevRadius=r=>[...radii].reverse().find(x=>x<r)??null;
export function projectToMap(centre,zoomKm,point,halfBoxPx=125){const kx=111.32*Math.cos(centre.lat*Math.PI/180),ppk=halfBoxPx/zoomKm;return {x:(point.lng-centre.lng)*kx*ppk,y:-(point.lat-centre.lat)*110.57*ppk};}
export function visibleMapStores(s,centre,zoomKm,box={halfW:150,halfH:105}){return stores.map(st=>({...st,distance:distanceKm(s.location,st),...projectToMap(centre,zoomKm,st)})).filter(st=>Math.abs(st.x)<=box.halfW&&Math.abs(st.y)<=box.halfH).sort((a,b)=>a.distance-b.distance);}
export function clusterPins(items,minGap=40){const groups=[];for(const it of items){const g=groups.find(g=>Math.hypot(g.x-it.x,g.y-it.y)<minGap);if(g){g.items.push(it);g.x=g.items.reduce((a,b)=>a+b.x,0)/g.items.length;g.y=g.items.reduce((a,b)=>a+b.y,0)/g.items.length;}else groups.push({x:it.x,y:it.y,items:[it]});}return groups;}
export function fitZoom(s,st){const c=s.location,d=Math.max(Math.abs(st.lng-c.lng)*111.32*Math.cos(c.lat*Math.PI/180),Math.abs(st.lat-c.lat)*110.57);return radii.find(z=>d<=z*0.85)??radii.at(-1);}

import {brandLogos} from './brand-logos.js';
// Real street map (Leaflet + OpenStreetMap tiles). One map instance is kept alive between
// screen renders, so zoom and radius changes animate smoothly instead of redrawing.
// If Leaflet or the network is missing, app.js falls back to the schematic panel.
const brandStyle={'Max':['#FFC20E','#222'],'Westside':['#222','#fff'],'Levi’s':['#C41230','#fff'],'Go Colours':['#E4572E','#fff'],'H&M':['#E50010','#fff'],'Zara':['#111','#fff'],'Zudio':['#0B4F9E','#fff'],'Pantaloons':['#D4145A','#fff'],'Lifestyle':['#F58220','#fff'],'Allen Solly':['#0E6E8C','#fff'],'Van Heusen':['#7A1F3D','#fff'],'Puma':['#111','#fff'],'Bata':['#D71920','#fff'],'Decathlon':['#0082C3','#fff'],'Nike':['#111','#fff'],'Adidas':['#111','#fff'],'Peter England':['#1D3F72','#fff'],'Wrangler':['#B22234','#fff'],'Pepe Jeans':['#1F4E9C','#fff'],'Raymond':['#2B2B6B','#fff']};
const brandMark=b=>({'Levi’s':'L','H&M':'H&M','Go Colours':'GC','Allen Solly':'AS','Van Heusen':'VH','Peter England':'PE','Pepe Jeans':'PJ','Pantaloons':'P','Decathlon':'D'}[b]||b.slice(0,1).toUpperCase());
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const TILES='https://tile.openstreetmap.org/{z}/{x}/{y}.png';
let map=null,host=null,layer=null,applied=null,seq=0,used=false;

export const liveMapAvailable=()=>typeof window!=='undefined'&&!!window.L;

// Leaflet zoom level at which `km` kilometres span 125 px (the same scale the store list uses).
export const zoomForKm=(km,lat)=>Math.round(Math.log2(156543.03*Math.cos(lat*Math.PI/180)/(8*km))*10)/10;

function ensure(){
  if(map)return true;
  if(!liveMapAvailable())return false;
  try{
    host=document.createElement('div');host.className='livemap';
    map=L.map(host,{zoomControl:false,zoomSnap:0.1,zoomDelta:1,zoomAnimationThreshold:12,scrollWheelZoom:false,doubleClickZoom:false,touchZoom:false,boxZoom:false,keyboard:false,inertia:true,fadeAnimation:true,markerZoomAnimation:true,attributionControl:true});
    map.attributionControl.setPrefix(false);
    L.tileLayer(TILES,{maxZoom:19,attribution:'© <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors',updateWhenZooming:false,keepBuffer:3}).addTo(map);
    layer=L.layerGroup().addTo(map);
    return true;
  }catch(e){map=null;host=null;return false;}
}

function pinIcon(brand,label,cluster){
  if(cluster)return L.divIcon({className:'lm-icon',iconSize:[44,44],iconAnchor:[22,22],html:'<button type="button" class="map-marker cluster" tabindex="-1" aria-label="'+esc(label)+'">'+esc(cluster)+'</button>'});
  const lg=brandLogos[brand];
  if(lg){const w=lg.aspect<=1.2?44:Math.min(104,Math.round(Math.max(60,lg.aspect*22+16)));
    return L.divIcon({className:'lm-icon',iconSize:[w,44],iconAnchor:[w/2,22],html:'<button type="button" class="map-marker brand-pin logo-pin" style="background:'+lg.bg+';width:'+w+'px" tabindex="-1" aria-label="'+esc(label)+'"><img src="./assets/brand-logos/'+lg.file+'" alt="" draggable="false"></button>'});}
  const [bg,fg]=brandStyle[brand]||['#2548F4','#fff'],m=brandMark(brand);
  return L.divIcon({className:'lm-icon',iconSize:[44,44],iconAnchor:[22,22],html:'<button type="button" class="map-marker brand-pin" style="background:'+bg+';color:'+fg+'" tabindex="-1" aria-label="'+esc(label)+'"><span class="'+(m.length>2?'bp-t':m.length>1?'bp-s':'')+'">'+esc(m)+'</span></button>'});
}

/** Build a `.map` panel that holds the shared Leaflet map.
 *  opts: {kind:'main'|'selected'|'compact', centre, zoomKm, radiusKm, user, pins:[{id,brand,label,lat,lng}],
 *         clusters:[{lat,lng,count,label}], draggable, onPin(id), onCluster(c), onMove({lat,lng})} */
export function livePanel(opts){
  if(!ensure())return null;
  used=true;
  const panel=document.createElement('div');panel.className='map live'+(opts.kind==='compact'?' compact':'');
  panel.append(host);
  const my=++seq,{centre,zoomKm}=opts,z=zoomForKm(zoomKm,centre.lat);
  // Draw pins right away; the view is set after the panel is in the page so sizes are known.
  layer.clearLayers();
  L.circle([opts.user.lat,opts.user.lng],{radius:opts.radiusKm*1000,color:'#2548F4',weight:1.5,opacity:.8,dashArray:'6 6',fillColor:'#2548F4',fillOpacity:.07,interactive:false}).addTo(layer);
  L.marker([opts.user.lat,opts.user.lng],{interactive:false,keyboard:false,icon:L.divIcon({className:'lm-icon',iconSize:[18,18],iconAnchor:[9,9],html:'<span class="lm-you" title="Search centre"></span>'})}).addTo(layer);
  for(const p of opts.pins){const mk=L.marker([p.lat,p.lng],{icon:pinIcon(p.brand,p.label),keyboard:false,riseOnHover:true,title:p.label}).addTo(layer);mk.on('click',()=>opts.onPin(p.id));}
  for(const c of opts.clusters||[]){const mk=L.marker([c.lat,c.lng],{icon:pinIcon('',c.label,c.count),keyboard:false,title:c.label}).addTo(layer);mk.on('click',()=>opts.onCluster(c));}
  const place=()=>{
    if(my!==seq||!map)return;
    map.invalidateSize({animate:false,pan:false});
    const animate=!!(applied&&applied.kind===opts.kind&&applied.attached)&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
    const same=applied&&Math.abs(applied.z-z)<0.05&&Math.abs(applied.lat-centre.lat)<1e-6&&Math.abs(applied.lng-centre.lng)<1e-6;
    if(!same)map.setView([centre.lat,centre.lng],z,animate?{animate:true,duration:0.65,easeLinearity:0.2}:{animate:false});
    applied={kind:opts.kind,z,lat:centre.lat,lng:centre.lng,attached:true};
    if(opts.draggable)map.dragging.enable();else map.dragging.disable();
    map.off('dragend');
    if(opts.draggable)map.on('dragend',()=>{const c=map.getCenter();applied.lat=c.lat;applied.lng=c.lng;opts.onMove({lat:c.lat,lng:c.lng});});
  };
  requestAnimationFrame(()=>requestAnimationFrame(place));
  return panel;
}

/** Call at the start and end of every screen render: a screen without a map clears the remembered view,
 *  so the next map screen starts in place instead of animating from a stale position. */
export const liveMapBegin=()=>{used=false;};
export const liveMapEnd=()=>{if(!used&&applied)applied.attached=false;};

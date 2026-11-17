// Expanded demo catalogue. Everything here is generated, illustrative sample data (stores, prices, stock).
// It is deterministic: the same seed always gives the same catalogue, so tests and demos are repeatable.
// Photos come from photo-pool.js (credited in docs/ASSETS.md); items without a matching photo use the illustrations.
import {photoPool} from './photo-pool.js';

function rng(seed){let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296;};}
const pick=(r,arr)=>arr[Math.floor(r()*arr.length)];

// type -> display name, category, fabrics, fits, name descriptors, price range, search tags
export const types={
 shirt:{name:'shirt',category:'topwear',fabrics:['Cotton','Linen','Blend'],fits:['Regular','Slim','Relaxed'],desc:['Oxford','Formal','Casual','Poplin','Classic'],price:[899,2799],tags:'shirt formal casual'},
 tshirt:{name:'t-shirt',category:'topwear',fabrics:['Cotton','Blend'],fits:['Regular','Relaxed','Slim'],desc:['Crew-neck','Plain','Oversized','Classic','Everyday'],price:[399,1499],tags:'tshirt tee top'},
 polo:{name:'polo t-shirt',category:'topwear',fabrics:['Cotton','Blend'],fits:['Regular','Slim'],desc:['Classic','Pique','Everyday'],price:[599,1799],tags:'polo tshirt tee collar'},
 hoodie:{name:'hoodie',category:'topwear',fabrics:['Cotton','Blend'],fits:['Regular','Relaxed'],desc:['Classic','Everyday','Oversized','Relaxed'],price:[999,2999],tags:'hoodie winter'},
 jacket:{name:'jacket',category:'topwear',fabrics:['Blend','Denim','Cotton'],fits:['Regular','Slim','Relaxed'],desc:['Classic','Everyday','Casual','Light'],price:[1799,4999],tags:'jacket outerwear'},
 jeans:{name:'jeans',category:'bottomwear',fabrics:['Denim'],fits:['Slim','Straight','Relaxed','Regular'],desc:['Classic','Everyday','Mid-rise','Casual'],price:[1299,3499],tags:'jeans denim pants'},
 trousers:{name:'trousers',category:'bottomwear',fabrics:['Cotton','Blend'],fits:['Regular','Slim','Straight'],desc:['Formal','Smart','Classic','Everyday'],price:[999,2999],tags:'trousers pants formal'},
 chinos:{name:'chinos',category:'bottomwear',fabrics:['Cotton'],fits:['Slim','Regular','Straight'],desc:['Classic','Everyday','Casual'],price:[999,2499],tags:'chinos trousers pants'},
 shorts:{name:'shorts',category:'bottomwear',fabrics:['Cotton','Denim','Blend'],fits:['Regular','Relaxed'],desc:['Casual','Everyday','Classic'],price:[499,1799],tags:'shorts'},
 joggers:{name:'joggers',category:'bottomwear',fabrics:['Cotton','Blend'],fits:['Regular','Slim','Relaxed'],desc:['Classic','Everyday','Casual'],price:[699,1999],tags:'joggers track pants'},
 leggings:{name:'leggings',gender:'women',category:'bottomwear',fabrics:['Cotton','Blend'],fits:['Slim'],desc:['Ankle-length','Daily wear','Classic'],price:[499,1299],tags:'leggings pants'},
 skirt:{name:'skirt',gender:'women',category:'bottomwear',fabrics:['Cotton','Denim','Blend'],fits:['Regular','Relaxed'],desc:['Casual','Classic','Everyday'],price:[699,1999],tags:'skirt'},
 sneakers:{name:'sneakers',category:'footwear',fabrics:[undefined],fits:['Regular'],desc:['Everyday','Classic','Casual'],price:[1299,5999],tags:'sneakers trainers shoes'},
 formalshoes:{name:'formal shoes',category:'footwear',fabrics:[undefined],fits:['Regular'],desc:['Classic','Formal'],price:[1799,4999],tags:'formal shoes derby oxford'},
 sandals:{name:'sandals',category:'footwear',fabrics:[undefined],fits:['Regular'],desc:['Classic','Everyday','Comfort'],price:[699,2299],tags:'sandals'},
 flipflops:{name:'flip-flops',category:'footwear',fabrics:[undefined],fits:['Regular'],desc:['Comfort','Everyday','Classic'],price:[299,999],tags:'flip flops slippers sliders'},
 wshirt:{name:'shirt',gender:'women',category:'topwear',fabrics:['Cotton','Linen','Blend'],fits:['Regular','Relaxed','Slim'],desc:['Poplin','Classic','Casual','Relaxed','Everyday'],price:[899,2799],tags:'shirt blouse top formal casual'},
 wtshirt:{name:'t-shirt',gender:'women',category:'topwear',fabrics:['Cotton','Blend'],fits:['Regular','Relaxed','Slim'],desc:['Crew-neck','Boxy','Classic','Everyday'],price:[399,1499],tags:'tshirt tee top'},
 wjacket:{name:'jacket',gender:'women',category:'topwear',fabrics:['Blend','Cotton'],fits:['Regular','Relaxed'],desc:['Classic','Cropped','Casual','Light'],price:[1799,4999],tags:'jacket outerwear'},
 wjeans:{name:'jeans',gender:'women',category:'bottomwear',fabrics:['Denim'],fits:['Straight','Relaxed','Regular'],desc:['High-rise','Wide-leg','Classic','Everyday'],price:[1299,3499],tags:'jeans denim pants'},
 wtrousers:{name:'trousers',gender:'women',category:'bottomwear',fabrics:['Cotton','Blend'],fits:['Regular','Relaxed','Straight'],desc:['Wide-leg','Smart','Classic','Everyday'],price:[999,2999],tags:'trousers pants formal'},
 wshorts:{name:'shorts',gender:'women',category:'bottomwear',fabrics:['Cotton','Denim','Blend'],fits:['Regular','Relaxed'],desc:['Casual','Everyday','Classic'],price:[499,1799],tags:'shorts'}
};
const ALL=Object.keys(types);
const sizesOf={topwear:['S','M','L','XL','XXL'],bottomwear:['28','30','32','34','36','38'],footwear:['UK 5','UK 6','UK 7','UK 8','UK 9','UK 10']};

// brand -> product types sold, and a price tier multiplier
const brands={
 'Max':{menu:['shirt','tshirt','polo','hoodie','jacket','jeans','trousers','chinos','shorts','joggers','sneakers','sandals','flipflops','wshirt','wtshirt','wjeans','wtrousers','wshorts'],tier:0.85},
 'Westside':{menu:ALL,tier:1},
 'Levi’s':{menu:['shirt','tshirt','jacket','jeans','shorts','hoodie','wshirt','wtshirt','wjeans','wjacket','wshorts'],tier:1.3},
 'Go Colours':{menu:['leggings','skirt','wtrousers','wtshirt','wshorts','wjeans'],tier:0.8},
 'Zudio':{menu:['tshirt','shirt','jeans','trousers','shorts','joggers','hoodie','jacket','skirt','sneakers','leggings','chinos','wshirt','wtshirt','wjeans','wtrousers','wshorts','wjacket'],tier:0.55},
 'H&M':{menu:['tshirt','hoodie','shirt','jeans','chinos','shorts','jacket','sneakers','joggers','wshirt','wtshirt','wjeans','wtrousers','wjacket'],tier:1},
 'Zara':{menu:['shirt','jacket','trousers','chinos','jeans','sneakers','formalshoes','hoodie','tshirt','wshirt','wjacket','wtrousers','wjeans','wtshirt'],tier:1.6},
 'Pantaloons':{menu:ALL,tier:0.9},
 'Lifestyle':{menu:ALL,tier:1.1},
 'Allen Solly':{menu:['shirt','tshirt','polo','trousers','chinos','jacket','wshirt','wtrousers','wjacket'],tier:1.25},
 'Van Heusen':{menu:['shirt','trousers','formalshoes','jacket','polo','wshirt','wtrousers'],tier:1.3},
 'Puma':{menu:['tshirt','hoodie','joggers','shorts','sneakers','flipflops','jacket','polo','wtshirt','wshorts'],tier:1.35},
 'Bata':{menu:['sneakers','formalshoes','sandals','flipflops'],tier:0.9},
 'Decathlon':{menu:['tshirt','shorts','joggers','jacket','sneakers','hoodie','wtshirt','wshorts'],tier:0.75},
 'Wrangler':{menu:['jeans','shirt','tshirt','jacket','shorts','wjeans','wshirt'],tier:1.2},
 'Pepe Jeans':{menu:['jeans','shirt','tshirt','shorts','jacket','wjeans','wtshirt'],tier:1.2},
 'Raymond':{menu:['shirt','trousers','jacket','formalshoes','polo'],tier:1.6},
 'Peter England':{menu:['shirt','trousers','tshirt','polo','chinos'],tier:0.95},
 'Adidas':{menu:['tshirt','joggers','sneakers','hoodie','shorts','flipflops','wtshirt','wshorts'],tier:1.4},
 'Nike':{menu:['tshirt','joggers','sneakers','shorts','hoodie','flipflops','wtshirt','wshorts'],tier:1.5}
};

// Extra stores. Existing stores (in data.js) are kept; these add depth, mostly near Panjim so the default 2 km search finds plenty.
const A={Panjim:[15.4909,73.8278],Mapusa:[15.5915,73.8089],Porvorim:[15.5262,73.8176],Calangute:[15.5440,73.7550],Margao:[15.2736,73.9581],Vasco:[15.3960,73.8110],Ponda:[15.4025,74.0150]};
const extra=[
 ['Levi’s','Panjim',0.008,-0.005],['Max','Panjim',-0.006,0.007],['Zudio','Panjim',0.005,0.004],['Zudio','Panjim',-0.008,-0.006],['Westside','Panjim',0.01,0.006],['Go Colours','Panjim',-0.009,0.005],['Zudio','Mapusa',0.002,-0.005],['Zudio','Porvorim',-0.002,0.005],['Zudio','Calangute',0.001,-0.003],['Zudio','Margao',-0.001,0.006],['Levi’s','Calangute',-0.001,0.006],
 ['Pantaloons','Panjim',0.004,-0.006],['Lifestyle','Panjim',-0.007,0.004],['Allen Solly','Panjim',0.009,0.003],['Van Heusen','Panjim',-0.004,-0.009],
 ['Puma','Panjim',0.002,0.01],['Bata','Panjim',-0.01,-0.003],['Decathlon','Panjim',0.011,-0.008],['Nike','Panjim',-0.002,0.006],['Adidas','Panjim',0.006,0.007],
 ['Pantaloons','Mapusa',0.003,0.004],['Allen Solly','Mapusa',-0.004,-0.003],['Puma','Mapusa',0.006,-0.004],['Bata','Mapusa',-0.002,0.007],
 ['Lifestyle','Porvorim',0.004,0.003],['Pantaloons','Porvorim',-0.003,-0.004],['Peter England','Porvorim',0.002,-0.006],['Wrangler','Porvorim',-0.005,0.002],
 ['Pantaloons','Calangute',0.003,0.003],['Pepe Jeans','Calangute',-0.003,0.002],['Puma','Calangute',0.004,-0.004],['Bata','Calangute',-0.002,-0.003],
 ['Lifestyle','Margao',0.004,0.002],['Pantaloons','Margao',-0.003,-0.003],['Raymond','Margao',0.002,-0.005],['Nike','Margao',-0.005,0.004],['Bata','Margao',0.006,0.003],
 ['Pantaloons','Vasco',0.003,0.003],['Allen Solly','Vasco',-0.003,-0.002],['Decathlon','Vasco',0.002,-0.004],
 ['Lifestyle','Ponda',0.003,0.002],['Pantaloons','Ponda',-0.004,-0.003],['Puma','Ponda',0.002,-0.005]
];
const slug=s=>s.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const hours=['10 AM–9 PM','10 AM–9 PM','10 AM–10 PM','10 AM–8 PM'];

export function buildCatalog({existingStores}){
 const r=rng(20261119);
 const taken=new Set(existingStores.map(s=>s.id));
 const stores=extra.map(([brand,area,dlat,dlng],i)=>{let id=slug(brand)+'-'+slug(area);if(taken.has(id))id+='-2';while(taken.has(id))id+='x';taken.add(id);
  return {id,brand,area,lat:+(A[area][0]+dlat).toFixed(4),lng:+(A[area][1]+dlng).toFixed(4),hours:hours[i%hours.length],holdHours:i%3===0?[1]:[1,2],response:(i%5===4)?'unable':'arrange'};});
 const colourName=c=>c[0].toUpperCase()+c.slice(1);
 // 1. One catalogue per BRAND. Every branch of that brand carries all of it (only the per-size stock differs).
 const brandItems={};
 for(const [brand,b] of Object.entries(brands)){
  const items=[];const rb=rng(hash(brand));
  for(const t of b.menu){const T=types[t];const pool=photoPool[t];if(!pool)continue;
   const options=[];for(const [c,files] of Object.entries(pool))for(const f of files)options.push([c,f]);
   shuffle(rb,options);
   const count=Math.min(options.length,/^(sneakers|w?shirt|w?tshirt|w?jeans)$/.test(t)?4:3);
   const usedCol={};
   for(let k=0;k<count;k++){const [colour,file]=options[k];const nth=usedCol[colour]=(usedCol[colour]||0)+1;
    const desc=T.desc[(k+Math.floor(rb()*T.desc.length))%T.desc.length];
    const fabric=pick(rb,T.fabrics),fit=pick(rb,T.fits);
    const base=T.price[0]+rb()*(T.price[1]-T.price[0]);
    const price=Math.max(299,Math.round(base*b.tier/100)*100-1);
    const was=rb()<0.25?Math.round(price*(1.15+rb()*0.3)/100)*100-1:undefined;
    const wp=T.gender==='women'&&!/^(leggings|skirt)$/.test(T.name)?'Women’s ':'',cn=wp?colour:colourName(colour);let nm=wp+cn+' '+(/^(Oxford|Derby)$/.test(desc)?desc:desc.toLowerCase())+' '+T.name;if(items.some(q=>q.name===nm))nm=wp+cn+' '+fit.toLowerCase()+'-fit '+desc.toLowerCase()+' '+T.name;
    items.push({key:t+'-'+colour+'-'+nth+'-'+k,t,T,colour,file,name:nm,fabric,fit,price,was});
   }
  }
  brandItems[brand]=items;
 }
 // 2. Stock the catalogue in every store of the brand.
 const products=[],photos={};
 for(const st of [...existingStores,...stores]){
  for(const it of (brandItems[st.brand]||[])){
   const id=st.id+'-'+it.key;
   const stock=Object.fromEntries(sizesOf[it.T.category].map(sz=>{const x=r();const q=x<0.08?0:x<0.3?1+Math.floor(r()*2):2+Math.floor(r()*5);return [sz,q];}));
   const p={id,storeId:st.id,category:it.T.category,name:it.name,colour:colourName(it.colour),fit:it.fit,price:it.price,stock,tags:it.T.tags,generated:true};if(it.T.gender)p.gender=it.T.gender;
   if(it.fabric)p.fabric=it.fabric;if(it.was&&it.was>it.price)p.was=it.was;
   products.push(p);photos[id]=it.file;
  }
 }
 return {stores,products,photos,brandItems};
}
function hash(s){let h=2166136261;for(const ch of s)h=Math.imul(h^ch.charCodeAt(0),16777619);return h>>>0;}
function shuffle(r,a){for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}

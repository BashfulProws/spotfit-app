import {buildCatalog} from './catalog.js?v=mwl62t0z';
import {photoPool} from './photo-pool.js?v=mwl62t0z';
// All catalogue records and coordinates below are illustrative demo data, not retailer feeds.
export const radii=[2,5,10,25,50];
export const areas = {
  Panjim: {name:'Panjim, Goa', lat:15.4909, lng:73.8278},
  Mapusa: {name:'Mapusa, Goa', lat:15.5915, lng:73.8089},
  Calangute: {name:'Calangute, Goa', lat:15.5440, lng:73.7550},
  Margao: {name:'Margao, Goa', lat:15.2736, lng:73.9581},
  Porvorim: {name:'Porvorim, Goa', lat:15.5262, lng:73.8176},
  Vasco: {name:'Vasco da Gama, Goa', lat:15.3960, lng:73.8110},
  Ponda: {name:'Ponda, Goa', lat:15.4025, lng:74.0150}
};
const baseStores = [
 {id:'max-panjim',brand:'Max',area:'Panjim',lat:15.5006,lng:73.8323,hours:'10 AM–9 PM',holdHours:[1,2],response:'arrange'},
 {id:'westside-panjim',brand:'Westside',area:'Panjim',lat:15.4802,lng:73.8395,hours:'10 AM–9 PM',holdHours:[1,2],response:'unable'},
 {id:'levis-panjim',brand:'Levi’s',area:'Panjim',lat:15.4961,lng:73.8369,hours:'10 AM–9 PM',holdHours:[1,2],response:'branch'},
 {id:'go-colors-panjim',brand:'Go Colours',area:'Panjim',lat:15.504,lng:73.829,hours:'10 AM–8 PM',holdHours:[1],response:'arrange'},
 {id:'hm-panjim',brand:'H&M',area:'Panjim',lat:15.5155,lng:73.838,hours:'10 AM–9 PM',holdHours:[1,2],response:'unable'},
 {id:'zara-panjim',brand:'Zara',area:'Panjim',lat:15.5301,lng:73.842,hours:'10 AM–9 PM',holdHours:[1],response:'arrange'},
 {id:'levis-mapusa',brand:'Levi’s',area:'Mapusa',lat:15.598,lng:73.812,hours:'10 AM–9 PM',holdHours:[1,2],response:'arrange'},
 {id:'max-porvorim',brand:'Max',area:'Porvorim',lat:15.5273,lng:73.8186,hours:'10 AM–9 PM',holdHours:[1,2],response:'arrange'},
 {id:'levis-porvorim',brand:'Levi’s',area:'Porvorim',lat:15.5251,lng:73.8165,hours:'10 AM–9 PM',holdHours:[1,2],response:'branch'},
 {id:'westside-mapusa',brand:'Westside',area:'Mapusa',lat:15.5921,lng:73.8118,hours:'10 AM–9 PM',holdHours:[1,2],response:'arrange'},
 {id:'max-mapusa',brand:'Max',area:'Mapusa',lat:15.5897,lng:73.8068,hours:'10 AM–9 PM',holdHours:[1],response:'unable'},
 {id:'hm-calangute',brand:'H&M',area:'Calangute',lat:15.5435,lng:73.7628,hours:'10 AM–10 PM',holdHours:[1,2],response:'arrange'},
 {id:'go-colors-calangute',brand:'Go Colours',area:'Calangute',lat:15.5444,lng:73.765,hours:'10 AM–9 PM',holdHours:[1],response:'arrange'},
 {id:'max-vasco',brand:'Max',area:'Vasco',lat:15.3946,lng:73.8119,hours:'10 AM–9 PM',holdHours:[1,2],response:'arrange'},
 {id:'westside-ponda',brand:'Westside',area:'Ponda',lat:15.4036,lng:74.0158,hours:'10 AM–9 PM',holdHours:[1,2],response:'arrange'},
 {id:'max-ponda',brand:'Max',area:'Ponda',lat:15.4012,lng:74.0141,hours:'10 AM–9 PM',holdHours:[1],response:'arrange'},
 {id:'zara-margao',brand:'Zara',area:'Margao',lat:15.2747,lng:73.9582,hours:'10 AM–9 PM',holdHours:[1],response:'arrange'},
 {id:'max-margao',brand:'Max',area:'Margao',lat:15.272,lng:73.9591,hours:'10 AM–9 PM',holdHours:[1,2],response:'arrange'},
 {id:'westside-margao',brand:'Westside',area:'Margao',lat:15.2762,lng:73.961,hours:'10 AM–9 PM',holdHours:[1,2],response:'unable'},
 {id:'levis-margao',brand:'Levi’s',area:'Margao',lat:15.2738,lng:73.9555,hours:'10 AM–9 PM',holdHours:[1,2],response:'branch'}
];

export const sizeOptions={topwear:['S','M','L','XL','XXL'],bottomwear:['28','30','32','34','36','38'],footwear:['UK 5','UK 6','UK 7','UK 8','UK 9','UK 10']};
export const categoryNames={topwear:'Topwear',bottomwear:'Bottomwear',footwear:'Footwear'};
const stock=(pairs)=>Object.fromEntries(pairs.map(([s,n])=>[s,n]));
const baseProducts=[
 {id:'max-white',storeId:'max-panjim',category:'topwear',name:'White cotton shirt',fabric:'Cotton',colour:'White',fit:'Regular',price:1299,stock:stock([['S',3],['M',5],['L',4],['XL',4],['XXL',2]])},
 {id:'west-white',storeId:'westside-panjim',category:'topwear',name:'White cotton shirt',fabric:'Cotton',colour:'White',fit:'Regular',price:1200,was:1500,stock:stock([['S',3],['M',3],['L',3],['XL',1],['XXL',0]])},
 {id:'levis-white',storeId:'levis-panjim',category:'topwear',name:'White cotton shirt',fabric:'Cotton',colour:'White',fit:'Regular',price:1499,stock:stock([['S',2],['M',3],['L',2],['XL',0],['XXL',2]])},
 {id:'max-linen',storeId:'max-panjim',category:'topwear',name:'White linen shirt',fabric:'Linen',colour:'White',fit:'Relaxed',price:999,stock:stock([['M',4],['L',2],['XL',0]])},
 {id:'hm-blue',storeId:'hm-panjim',category:'topwear',name:'Blue cotton shirt',fabric:'Cotton',colour:'Blue',fit:'Slim',price:1499,stock:stock([['M',3],['L',2],['XL',2]])},
 {id:'zara-white',storeId:'zara-panjim',category:'topwear',name:'White cotton shirt',fabric:'Cotton',colour:'White',fit:'Regular',price:2299,stock:stock([['M',3],['L',4],['XL',2]])},
 {id:'mapusa-white',storeId:'levis-mapusa',category:'topwear',name:'White cotton shirt',fabric:'Cotton',colour:'White',fit:'Regular',price:1499,stock:stock([['M',2],['L',2],['XL',0]])},
 {id:'max-trousers',storeId:'max-panjim',category:'bottomwear',name:'Cotton trousers',fabric:'Cotton',colour:'Black',fit:'Regular',price:1499,stock:stock([['28',3],['30',3],['32',3],['34',4],['36',1],['38',0]])},
 {id:'levis-jeans',storeId:'levis-panjim',category:'bottomwear',name:'Straight-fit jeans',fabric:'Denim',colour:'Blue',fit:'Straight',price:2499,stock:stock([['28',0],['30',2],['32',2],['34',1],['36',2]])},
 {id:'go-leggings',storeId:'go-colors-panjim',category:'bottomwear',name:'Daily wear leggings',fabric:'Cotton',colour:'Black',fit:'Slim',price:999,stock:stock([['28',2],['30',3],['32',4],['34',3],['36',1]])},
 {id:'west-shoes',storeId:'westside-panjim',category:'footwear',name:'Everyday trainers',colour:'White',fit:'Regular',price:1999,stock:stock([['UK 5',2],['UK 6',2],['UK 7',3],['UK 8',3],['UK 9',3],['UK 10',0]])},
 {id:'max-shoes',storeId:'max-panjim',category:'footwear',name:'Casual shoes',colour:'Black',fit:'Regular',price:899,stock:stock([['UK 5',2],['UK 6',2],['UK 7',3],['UK 8',3],['UK 9',3],['UK 10',1]])},
 // Extra sample stock so that zooming the map out reaches stores with products. All of it is illustrative.
 {id:'por-max-white',storeId:'max-porvorim',category:'topwear',name:'White cotton shirt',fabric:'Cotton',colour:'White',fit:'Regular',price:1299,stock:stock([['S',2],['M',4],['L',4],['XL',3],['XXL',1]])},
 {id:'por-levis-white',storeId:'levis-porvorim',category:'topwear',name:'White cotton shirt',fabric:'Cotton',colour:'White',fit:'Regular',price:1499,stock:stock([['M',2],['L',2],['XL',0]])},
 {id:'por-levis-jeans',storeId:'levis-porvorim',category:'bottomwear',name:'Straight-fit jeans',fabric:'Denim',colour:'Blue',fit:'Straight',price:2499,stock:stock([['30',2],['32',3],['34',2],['36',1]])},
 {id:'mapusa-west-white',storeId:'westside-mapusa',category:'topwear',name:'White cotton shirt',fabric:'Cotton',colour:'White',fit:'Regular',price:1200,was:1500,stock:stock([['M',3],['L',3],['XL',2]])},
 {id:'mapusa-max-linen',storeId:'max-mapusa',category:'topwear',name:'White linen shirt',fabric:'Linen',colour:'White',fit:'Relaxed',price:999,stock:stock([['M',3],['L',2],['XL',1]])},
 {id:'cal-hm-blue',storeId:'hm-calangute',category:'topwear',name:'Blue cotton shirt',fabric:'Cotton',colour:'Blue',fit:'Slim',price:1499,stock:stock([['M',2],['L',3],['XL',2]])},
 {id:'cal-hm-trousers',storeId:'hm-calangute',category:'bottomwear',name:'Cotton trousers',fabric:'Cotton',colour:'Black',fit:'Regular',price:1799,stock:stock([['30',2],['32',3],['34',2]])},
 {id:'cal-go-leggings',storeId:'go-colors-calangute',category:'bottomwear',name:'Daily wear leggings',fabric:'Cotton',colour:'Black',fit:'Slim',price:999,stock:stock([['28',2],['30',3],['32',2],['34',1]])},
 {id:'vasco-max-white',storeId:'max-vasco',category:'topwear',name:'White cotton shirt',fabric:'Cotton',colour:'White',fit:'Regular',price:1299,stock:stock([['M',3],['L',3],['XL',2]])},
 {id:'vasco-max-shoes',storeId:'max-vasco',category:'footwear',name:'Casual shoes',colour:'Black',fit:'Regular',price:899,stock:stock([['UK 7',2],['UK 8',3],['UK 9',2]])},
 {id:'ponda-west-white',storeId:'westside-ponda',category:'topwear',name:'White cotton shirt',fabric:'Cotton',colour:'White',fit:'Regular',price:1200,was:1500,stock:stock([['M',3],['L',3],['XL',1]])},
 {id:'ponda-max-trousers',storeId:'max-ponda',category:'bottomwear',name:'Cotton trousers',fabric:'Cotton',colour:'Black',fit:'Regular',price:1499,stock:stock([['30',3],['32',3],['34',3]])},
 {id:'margao-zara-white',storeId:'zara-margao',category:'topwear',name:'White cotton shirt',fabric:'Cotton',colour:'White',fit:'Regular',price:2299,stock:stock([['M',3],['L',3],['XL',2]])},
 {id:'margao-max-white',storeId:'max-margao',category:'topwear',name:'White cotton shirt',fabric:'Cotton',colour:'White',fit:'Regular',price:1299,stock:stock([['M',4],['L',4],['XL',4],['XXL',2]])},
 {id:'margao-max-shoes',storeId:'max-margao',category:'footwear',name:'Casual shoes',colour:'Black',fit:'Regular',price:899,stock:stock([['UK 6',2],['UK 7',3],['UK 8',3],['UK 9',3]])},
 {id:'margao-west-shoes',storeId:'westside-margao',category:'footwear',name:'Everyday trainers',colour:'White',fit:'Regular',price:1999,stock:stock([['UK 7',2],['UK 8',3],['UK 9',3]])},
 {id:'margao-levis-jeans',storeId:'levis-margao',category:'bottomwear',name:'Straight-fit jeans',fabric:'Denim',colour:'Blue',fit:'Straight',price:2499,stock:stock([['30',2],['32',2],['34',2]])}
];
const built=buildCatalog({existingStores:baseStores});
export const stores=[...baseStores,...built.stores];
export const products=[...baseProducts,...built.products];
// Who an item is cut for: 'men', 'women' or 'unisex'. Used to recommend items to the active profile.
for(const p of products)p.gender??=/legging|skirt|dress/i.test(p.name)?'women':p.category==='footwear'?'unisex':'men';
export const demoProfiles=[
 {id:'ashutosh',name:'Ashutosh',gender:'male',sizes:{topwear:'XL',bottomwear:'34',footwear:'UK 9'},measurements:{}},
 {id:'mum',name:'Mum',gender:'female',sizes:{topwear:'M',bottomwear:'30',footwear:'UK 5'},measurements:{}},
 {id:'riya',name:'Riya',gender:'female',sizes:{topwear:'M',bottomwear:'30',footwear:'UK 5'},measurements:{chest:91.44,waist:76.2,insideLeg:71.12,foot:24}}
];
export const figures={topwear:'W07-imgFrame.svg',bottomwear:'W48-imgFrame.svg',footwear:'W49-imgFrame.svg'};

// Optional real photos: add a file to app/assets/product-images/ and map the product id to its file name, e.g. {'max-white':'max-white.jpg'}.
// Products without an entry use the illustrations in the same folder.
// Photos: images taken from the brands' own websites (Max, Levi's India, Go Colours, Westside), used for a class demonstration only. See docs/ASSETS.md.
// Original hand-written products get a verified photo of the same item type and colour; generated products carry their own (catalog.js).
// Photos come from retailer websites and are used for a class demonstration only. See docs/ASSETS.md.
const baseType=p=>/linen shirt|cotton shirt/i.test(p.name)?'shirt':/trousers/i.test(p.name)?'trousers':/jeans/i.test(p.name)?'jeans':/leggings/i.test(p.name)?'leggings':/trainers|casual shoes/i.test(p.name)?'sneakers':null;
const baseFallback={};
for(const p of baseProducts){const t=baseType(p);const files=t&&photoPool[t]&&photoPool[t][p.colour.toLowerCase()];if(files)baseFallback[p.id]='pool/'+files[Math.abs(hashId(p.id))%files.length];}
function hashId(s){let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))|0;return h;}
export const productPhotos={
 ...baseFallback,
 ...Object.fromEntries(Object.entries(built.photos).map(([id,f])=>[id,'pool/'+f]))
};

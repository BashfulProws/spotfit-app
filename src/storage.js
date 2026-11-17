import {initialState,expireReservations} from './domain.js';
import {demoProfiles} from './data.js';
const KEY='spotfit.shopper.v1';
export function loadState(storage=localStorage){
 const fallback=initialState();
 try{const value=JSON.parse(storage.getItem(KEY));if(!value||value.version!==1)return fallback;
 if(!Array.isArray(value.profiles)||!Array.isArray(value.requests)||!Array.isArray(value.reservations)||!value.location||!Number.isFinite(value.location.lat)||!Number.isFinite(value.location.lng))return fallback;
 const result={...fallback,...value,filters:{...fallback.filters,...value.filters},sizes:{...fallback.sizes,...value.sizes}};result.profiles=result.profiles.map(p=>p.gender===undefined?{...p,gender:demoProfiles.find(d=>d.id===p.id)?.gender??null}:p);expireReservations(result);return result;
 }catch{return fallback;}
}
export function saveState(state,storage=localStorage){try{storage.setItem(KEY,JSON.stringify(state));return true;}catch{return false;}}
export function clearState(storage=localStorage){storage.removeItem(KEY);return initialState();}

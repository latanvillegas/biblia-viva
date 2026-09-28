import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Favorite, Note, StudyState, emptyStudyState } from '../domain/study';

const KEY='biblia-viva.study.v1';
type Ref={bookId:string;chapter:number;verse:number};
type StudyContextValue={state:StudyState;ready:boolean;toggleFavorite:(ref:Ref)=>void;saveNote:(ref:Ref,text:string)=>void};
const StudyContext=createContext<StudyContextValue|null>(null);
const refId=(r:Ref)=>`${r.bookId}.${r.chapter}.${r.verse}`;

export function StudyProvider({children}:PropsWithChildren){
 const [state,setState]=useState<StudyState>(emptyStudyState); const [ready,setReady]=useState(false);
 useEffect(()=>{AsyncStorage.getItem(KEY).then(raw=>{if(raw)setState(JSON.parse(raw));}).finally(()=>setReady(true));},[]);
 useEffect(()=>{if(ready)AsyncStorage.setItem(KEY,JSON.stringify(state));},[state,ready]);
 const toggleFavorite=(ref:Ref)=>setState(current=>{const id=refId(ref);const exists=current.favorites.some(x=>x.id===id);const favorites:Favorite[]=exists?current.favorites.filter(x=>x.id!==id):[...current.favorites,{...ref,id,createdAt:new Date().toISOString()}];return {...current,favorites};});
 const saveNote=(ref:Ref,text:string)=>setState(current=>{const id=refId(ref);const now=new Date().toISOString();const old=current.notes.find(x=>x.id===id);const notes:Note[]=text.trim()?[...current.notes.filter(x=>x.id!==id),{...ref,id,text:text.trim(),createdAt:old?.createdAt??now,updatedAt:now}]:current.notes.filter(x=>x.id!==id);return {...current,notes};});
 return <StudyContext.Provider value={{state,ready,toggleFavorite,saveNote}}>{children}</StudyContext.Provider>;
}
export function useStudy(){const value=useContext(StudyContext);if(!value)throw new Error('useStudy must be used inside StudyProvider');return value;}

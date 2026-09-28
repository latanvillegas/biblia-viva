import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { Favorite, Highlight, HighlightColor, Note, StudyState, emptyStudyState } from '../domain/study';
const KEY='biblia-viva.study.v1';
type Ref={bookId:string;chapter:number;verse:number};
type StudyContextValue={state:StudyState;ready:boolean;toggleFavorite:(ref:Ref)=>void;saveNote:(ref:Ref,text:string)=>void;setHighlight:(ref:Ref,color:HighlightColor|null)=>void};
const StudyContext=createContext<StudyContextValue|null>(null);const refId=(r:Ref)=>`${r.bookId}.${r.chapter}.${r.verse}`;
export function StudyProvider({children}:PropsWithChildren){const [state,setState]=useState<StudyState>(emptyStudyState);const [ready,setReady]=useState(false);
useEffect(()=>{AsyncStorage.getItem(KEY).then(raw=>{if(raw){const parsed=JSON.parse(raw);setState({...emptyStudyState,...parsed});}}).finally(()=>setReady(true));},[]);useEffect(()=>{if(ready)AsyncStorage.setItem(KEY,JSON.stringify(state));},[state,ready]);
const toggleFavorite=(ref:Ref)=>setState(c=>{const id=refId(ref),exists=c.favorites.some(x=>x.id===id);const favorites:Favorite[]=exists?c.favorites.filter(x=>x.id!==id):[...c.favorites,{...ref,id,createdAt:new Date().toISOString()}];return {...c,favorites};});
const saveNote=(ref:Ref,text:string)=>setState(c=>{const id=refId(ref),now=new Date().toISOString(),old=c.notes.find(x=>x.id===id);const notes:Note[]=text.trim()?[...c.notes.filter(x=>x.id!==id),{...ref,id,text:text.trim(),createdAt:old?.createdAt??now,updatedAt:now}]:c.notes.filter(x=>x.id!==id);return {...c,notes};});
const setHighlight=(ref:Ref,color:HighlightColor|null)=>setState(c=>{const id=refId(ref);const highlights:Highlight[]=color?[...c.highlights.filter(x=>x.id!==id),{...ref,id,color,createdAt:new Date().toISOString()}]:c.highlights.filter(x=>x.id!==id);return {...c,highlights};});
return <StudyContext.Provider value={{state,ready,toggleFavorite,saveNote,setHighlight}}>{children}</StudyContext.Provider>}
export function useStudy(){const value=useContext(StudyContext);if(!value)throw new Error('useStudy must be used inside StudyProvider');return value;}

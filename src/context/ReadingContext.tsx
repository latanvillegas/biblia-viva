import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';

const KEY = 'biblia-viva.reading.v1';
export type ReadingPosition = { bookId: string; chapter: number; verse: number; openedAt: string };
type Value = { lastReading: ReadingPosition | null; history: ReadingPosition[]; ready: boolean; recordReading: (position: Omit<ReadingPosition,'openedAt'>) => void };
const C = createContext<Value | null>(null);

export function ReadingProvider({ children }: PropsWithChildren) {
  const [lastReading,setLastReading]=useState<ReadingPosition|null>(null);
  const [history,setHistory]=useState<ReadingPosition[]>([]);
  const [ready,setReady]=useState(false);
  useEffect(()=>{AsyncStorage.getItem(KEY).then(raw=>{if(raw){const saved=JSON.parse(raw);setLastReading(saved.lastReading??null);setHistory(saved.history??[]);}}).finally(()=>setReady(true));},[]);
  useEffect(()=>{if(ready)AsyncStorage.setItem(KEY,JSON.stringify({lastReading,history}));},[ready,lastReading,history]);
  const recordReading=(position:Omit<ReadingPosition,'openedAt'>)=>{const item={...position,openedAt:new Date().toISOString()};setLastReading(item);setHistory(current=>[item,...current.filter(x=>!(x.bookId===item.bookId&&x.chapter===item.chapter))].slice(0,20));};
  return <C.Provider value={{lastReading,history,ready,recordReading}}>{children}</C.Provider>;
}
export function useReading(){const value=useContext(C);if(!value)throw new Error('useReading must be used inside ReadingProvider');return value;}

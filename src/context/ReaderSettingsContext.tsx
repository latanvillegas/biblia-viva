import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{createContext,useContext,useEffect,useMemo,useState} from 'react';

export type ReaderThemeId='paper'|'white'|'amoled'|'sepia'|'night';
export type ReaderTheme={id:ReaderThemeId;name:string;background:string;surface:string;text:string;muted:string;accent:string;border:string;status:'dark'|'light'};
export const READER_THEMES:ReaderTheme[]=[
{id:'paper',name:'Papel',background:'#F7F5EF',surface:'#FFFFFF',text:'#1F261C',muted:'#596056',accent:'#556B2F',border:'#E4E0D5',status:'dark'},
{id:'white',name:'Blanco puro',background:'#FFFFFF',surface:'#F6F6F6',text:'#000000',muted:'#555555',accent:'#334D1F',border:'#E5E5E5',status:'dark'},
{id:'amoled',name:'AMOLED',background:'#000000',surface:'#000000',text:'#FFFFFF',muted:'#B8B8B8',accent:'#B7D88A',border:'#282828',status:'light'},
{id:'sepia',name:'Sepia',background:'#F3E7CF',surface:'#EBDDCA',text:'#3A2D22',muted:'#746454',accent:'#755B32',border:'#D7C5A6',status:'dark'},
{id:'night',name:'Noche',background:'#111418',surface:'#1A1E24',text:'#F1F3F5',muted:'#AEB5BE',accent:'#A8C57C',border:'#303640',status:'light'}];
type Settings={themeId:ReaderThemeId;fontSize:number;lineHeight:number;horizontalPadding:number};
type Value=Settings&{theme:ReaderTheme;setTheme:(id:ReaderThemeId)=>void;setFontSize:(n:number)=>void;setLineHeight:(n:number)=>void;setHorizontalPadding:(n:number)=>void};
const KEY='biblia-viva.reader-settings.v1';const defaults:Settings={themeId:'paper',fontSize:20,lineHeight:31,horizontalPadding:22};
const C=createContext<Value|undefined>(undefined);
export function ReaderSettingsProvider({children}:{children:React.ReactNode}){const [settings,setSettings]=useState(defaults);useEffect(()=>{AsyncStorage.getItem(KEY).then(v=>{if(v)setSettings({...defaults,...JSON.parse(v)})}).catch(()=>{})},[]);const patch=(p:Partial<Settings>)=>setSettings(prev=>{const next={...prev,...p};AsyncStorage.setItem(KEY,JSON.stringify(next)).catch(()=>{});return next});const theme=useMemo(()=>READER_THEMES.find(x=>x.id===settings.themeId)??READER_THEMES[0],[settings.themeId]);return <C.Provider value={{...settings,theme,setTheme:id=>patch({themeId:id}),setFontSize:n=>patch({fontSize:Math.max(14,Math.min(34,n))}),setLineHeight:n=>patch({lineHeight:Math.max(22,Math.min(50,n))}),setHorizontalPadding:n=>patch({horizontalPadding:Math.max(12,Math.min(40,n))})}}>{children}</C.Provider>}
export function useReaderSettings(){const v=useContext(C);if(!v)throw new Error('useReaderSettings must be used inside ReaderSettingsProvider');return v}

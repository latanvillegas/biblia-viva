import { Link } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text } from 'react-native';
import { formatVerseReference, getDailyVerse } from '../src/data/dailyVerse';

export default function HomeScreen(){
  const dailyVerse=getDailyVerse();
  return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.container}>
    <Text style={s.brand}>BIBLIA VIVA</Text><Text style={s.title}>La Palabra contigo.</Text><Text style={s.subtitle}>Lee, estudia y guarda lo que Dios habla a tu vida.</Text>
    {dailyVerse ? <Link href={{pathname:'/biblia/[book]/[chapter]',params:{book:dailyVerse.bookId,chapter:String(dailyVerse.chapter),verse:String(dailyVerse.verse)}}} style={s.verseCard}>
      <Text style={s.eyebrow}>VERSÍCULO DEL DÍA · RV1909</Text><Text style={s.verse}>“{dailyVerse.text}”</Text><Text style={s.reference}>{formatVerseReference(dailyVerse)} · Toca para leer</Text>
    </Link> : <Link href="/biblia" style={s.verseCard}><Text style={s.eyebrow}>VERSÍCULO DEL DÍA</Text><Text style={s.verse}>Abre la Biblia y comienza tu lectura de hoy.</Text></Link>}
    <Text style={s.sectionTitle}>Comienza aquí</Text>
    <Link href="/biblia" style={s.primary}>Leer la Biblia · 66 libros, capítulos y lector</Link>
    <Link href="/buscar" style={s.link}>Buscar · Encuentra libros y pasajes</Link>
    <Link href="/planes" style={s.link}>Planes · Lecturas guiadas para cada día</Link>
    <Link href="/guardados" style={s.link}>Mis guardados · Favoritos, resaltados y notas</Link>
    <Link href="/traducciones" style={s.link}>Traducciones · RV1909 y RVR1960 preparada</Link>
  </ScrollView></SafeAreaView>
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:'#F7F5EF'},container:{padding:24,paddingBottom:48},brand:{fontSize:13,fontWeight:'800',letterSpacing:2.2,color:'#556B2F',marginTop:18},title:{fontSize:38,lineHeight:44,fontWeight:'800',color:'#1F261C',marginTop:12},subtitle:{fontSize:17,lineHeight:25,color:'#596056',marginTop:10,marginBottom:28},verseCard:{backgroundColor:'#25321F',borderRadius:24,padding:24,marginBottom:32,overflow:'hidden'},eyebrow:{color:'#C9D8AE',fontSize:11,fontWeight:'800',letterSpacing:1.4,marginBottom:14},verse:{color:'#FFF',fontSize:22,lineHeight:32,fontWeight:'600'},reference:{color:'#DDE6D0',fontSize:14,fontWeight:'700',marginTop:16},sectionTitle:{fontSize:20,fontWeight:'800',color:'#1F261C',marginBottom:14},primary:{backgroundColor:'#556B2F',color:'#FFF',fontSize:16,fontWeight:'800',padding:20,borderRadius:18,marginBottom:12,overflow:'hidden'},link:{backgroundColor:'#FFF',color:'#25321F',fontSize:16,fontWeight:'800',padding:20,borderRadius:18,marginBottom:12,overflow:'hidden'}});

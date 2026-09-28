import { Link } from 'expo-router';
import { useMemo,useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { bibleBooks } from '../../src/data/books';

export default function BibleScreen() {
  const [query,setQuery]=useState('');
  const filtered=useMemo(()=>{const q=query.trim().toLocaleLowerCase('es');return q?bibleBooks.filter(b=>b.name.toLocaleLowerCase('es').includes(q)):bibleBooks;},[query]);
  const oldTestament = filtered.filter((book) => book.testament === 'Antiguo');
  const newTestament = filtered.filter((book) => book.testament === 'Nuevo');
  return <SafeAreaView style={styles.safeArea}><ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
    <Link href="/" style={styles.back}>‹ Inicio</Link><Text style={styles.title}>Biblia</Text><Text style={styles.subtitle}>66 libros · Reina-Valera 1909</Text>
    <TextInput value={query} onChangeText={setQuery} placeholder="Buscar un libro…" style={styles.input}/>
    {oldTestament.length>0&&<BookSection title="Antiguo Testamento" books={oldTestament}/>} {newTestament.length>0&&<BookSection title="Nuevo Testamento" books={newTestament}/>} {filtered.length===0&&<Text style={styles.empty}>No encontramos ese libro.</Text>}
  </ScrollView></SafeAreaView>;
}
function BookSection({title,books}:{title:string;books:typeof bibleBooks}){return <View style={styles.section}><Text style={styles.sectionTitle}>{title}</Text><View style={styles.bookGrid}>{books.map(book=><Link key={book.id} href={{pathname:'/biblia/[book]',params:{book:book.id}}} style={styles.book}><Text style={styles.bookName}>{book.name}</Text><Text style={styles.chapters}>{book.chapters} cap.</Text></Link>)}</View></View>}
const styles=StyleSheet.create({safeArea:{flex:1,backgroundColor:'#F7F5EF'},container:{padding:24,paddingBottom:48},back:{color:'#556B2F',fontSize:16,fontWeight:'700',marginTop:12,marginBottom:20},title:{fontSize:36,fontWeight:'800',color:'#1F261C'},subtitle:{fontSize:15,color:'#697066',marginTop:7,marginBottom:18},input:{backgroundColor:'#FFF',borderRadius:16,padding:16,fontSize:16,marginBottom:24},section:{marginBottom:26},sectionTitle:{fontSize:18,fontWeight:'800',color:'#25321F',marginBottom:12},bookGrid:{flexDirection:'row',flexWrap:'wrap',gap:9},book:{width:'48%',backgroundColor:'#FFF',padding:15,borderRadius:15,overflow:'hidden'},bookName:{fontSize:15,fontWeight:'800',color:'#25321F'},chapters:{fontSize:12,color:'#71805C',marginTop:4},empty:{color:'#697066',textAlign:'center',padding:30}});

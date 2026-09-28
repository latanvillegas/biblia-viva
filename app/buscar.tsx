import { useMemo, useState } from 'react';
import { Link } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { bibleBooks, getBook } from '../src/data/books';
import { hasFullBibleData, searchBible } from '../src/data/bibleRepository';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const normalized = query.trim().toLocaleLowerCase('es');

  const bookResults = useMemo(() => {
    if (!normalized) return [];
    return bibleBooks.filter((book) => book.name.toLocaleLowerCase('es').includes(normalized));
  }, [normalized]);

  const verseResults = useMemo(() => {
    if (!hasFullBibleData || normalized.length < 3) return [];
    return searchBible(query, 50);
  }, [query, normalized]);

  const noResults = normalized.length > 0 && bookResults.length === 0 && verseResults.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Link href="/" style={styles.back}>‹ Inicio</Link>
        <Text style={styles.title}>Buscar</Text>
        <Text style={styles.subtitle}>Busca libros o palabras dentro de la Reina-Valera 1909.</Text>
        <TextInput value={query} onChangeText={setQuery} placeholder="Ej. amor, fe, Juan, Salmos" style={styles.input} autoCapitalize="none" />

        {bookResults.length > 0 && <Text style={styles.section}>Libros</Text>}
        {bookResults.map((book) => (
          <Link key={book.id} href={{ pathname: '/biblia/[book]', params: { book: book.id } }} style={styles.result}>
            {book.name} · {book.chapters} capítulos
          </Link>
        ))}

        {normalized.length > 0 && normalized.length < 3 && <Text style={styles.hint}>Escribe al menos 3 caracteres para buscar dentro de los versículos.</Text>}
        {verseResults.length > 0 && <Text style={styles.section}>Versículos · RV1909</Text>}
        {verseResults.map((verse) => {
          const book = getBook(verse.bookId);
          return (
            <Link key={`${verse.bookId}.${verse.chapter}.${verse.verse}`} href={{ pathname: '/biblia/[book]/[chapter]', params: { book: verse.bookId, chapter: String(verse.chapter), verse: String(verse.verse) } }} style={styles.verseCard}>
              <Text style={styles.reference}>{book?.name ?? verse.bookId} {verse.chapter}:{verse.verse}</Text>
              <Text style={styles.verseText}>{verse.text}</Text>
            </Link>
          );
        })}

        {noResults && <Text style={styles.empty}>No encontramos coincidencias para “{query.trim()}”.</Text>}
        {!hasFullBibleData && <View style={styles.notice}><Text style={styles.noticeTitle}>Datos bíblicos pendientes</Text><Text style={styles.noticeText}>La búsqueda de versículos se habilitará cuando la importación RV1909 esté disponible en esta compilación.</Text></View>}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:{flex:1,backgroundColor:'#F7F5EF'},container:{padding:24,paddingBottom:48},back:{color:'#556B2F',fontSize:16,fontWeight:'700',marginTop:12,marginBottom:20},title:{fontSize:36,fontWeight:'800',color:'#1F261C'},subtitle:{fontSize:15,lineHeight:22,color:'#697066',marginTop:8,marginBottom:20},input:{backgroundColor:'#FFFFFF',borderRadius:16,padding:17,fontSize:16,marginBottom:18},section:{fontSize:17,fontWeight:'800',color:'#25321F',marginTop:8,marginBottom:10},result:{backgroundColor:'#FFFFFF',color:'#25321F',fontSize:16,fontWeight:'700',padding:17,borderRadius:14,marginBottom:8,overflow:'hidden'},verseCard:{backgroundColor:'#FFFFFF',padding:17,borderRadius:14,marginBottom:9,overflow:'hidden'},reference:{fontSize:13,fontWeight:'800',color:'#556B2F',marginBottom:6},verseText:{fontSize:15,lineHeight:22,color:'#30372D'},hint:{color:'#7A8076',fontSize:13,marginVertical:10},empty:{color:'#697066',marginVertical:12},notice:{backgroundColor:'#E9EDDF',borderRadius:16,padding:18,marginTop:18},noticeTitle:{fontWeight:'800',color:'#25321F'},noticeText:{color:'#596056',lineHeight:21,marginTop:5}
});

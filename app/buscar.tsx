import { useMemo, useState } from 'react';
import { Link } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { bibleBooks } from '../src/data/books';

export default function SearchScreen() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('es');
    if (!normalized) return [];
    return bibleBooks.filter((book) => book.name.toLocaleLowerCase('es').includes(normalized));
  }, [query]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Link href="/" style={styles.back}>‹ Inicio</Link>
        <Text style={styles.title}>Buscar</Text>
        <Text style={styles.subtitle}>Busca un libro. La búsqueda por texto de versículos se activará al integrar una traducción autorizada.</Text>
        <TextInput value={query} onChangeText={setQuery} placeholder="Ej. Juan, Salmos, Romanos" style={styles.input} autoCapitalize="none" />
        {query.length > 0 && results.length === 0 ? <Text style={styles.empty}>No encontramos libros con ese nombre.</Text> : null}
        {results.map((book) => (
          <Link key={book.id} href={{ pathname: '/biblia/[book]', params: { book: book.id } }} style={styles.result}>
            {book.name} · {book.chapters} capítulos
          </Link>
        ))}
        <View style={styles.notice}><Text style={styles.noticeTitle}>Próxima fase</Text><Text style={styles.noticeText}>Aquí aparecerán coincidencias de versículos, referencias y temas cuando conectemos el repositorio de contenido bíblico.</Text></View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea:{flex:1,backgroundColor:'#F7F5EF'},container:{padding:24,paddingBottom:48},back:{color:'#556B2F',fontSize:16,fontWeight:'700',marginTop:12,marginBottom:20},title:{fontSize:36,fontWeight:'800',color:'#1F261C'},subtitle:{fontSize:15,lineHeight:22,color:'#697066',marginTop:8,marginBottom:20},input:{backgroundColor:'#FFFFFF',borderRadius:16,padding:17,fontSize:16,marginBottom:18},result:{backgroundColor:'#FFFFFF',color:'#25321F',fontSize:16,fontWeight:'700',padding:17,borderRadius:14,marginBottom:8,overflow:'hidden'},empty:{color:'#697066',marginVertical:12},notice:{backgroundColor:'#E9EDDF',borderRadius:16,padding:18,marginTop:18},noticeTitle:{fontWeight:'800',color:'#25321F'},noticeText:{color:'#596056',lineHeight:21,marginTop:5}
});

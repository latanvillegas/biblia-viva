import { Link, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getBook } from '../../src/data/books';

export default function ChaptersScreen() {
  const { book: bookId } = useLocalSearchParams<{ book: string }>();
  const book = getBook(bookId);

  if (!book) {
    return <SafeAreaView style={styles.safeArea}><Text style={styles.error}>Libro no encontrado.</Text></SafeAreaView>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Link href="/biblia" style={styles.back}>‹ Libros</Link>
        <Text style={styles.title}>{book.name}</Text>
        <Text style={styles.subtitle}>Selecciona un capítulo.</Text>
        <View style={styles.grid}>
          {Array.from({ length: book.chapters }, (_, index) => index + 1).map((chapter) => (
            <Link
              key={chapter}
              href={{ pathname: '/biblia/[book]/[chapter]', params: { book: book.id, chapter: String(chapter) } }}
              style={styles.chapter}
            >
              {chapter}
            </Link>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F5EF' },
  container: { padding: 24, paddingBottom: 48 },
  back: { color: '#556B2F', fontSize: 16, fontWeight: '700', marginTop: 12, marginBottom: 20 },
  title: { fontSize: 36, fontWeight: '800', color: '#1F261C' },
  subtitle: { fontSize: 16, color: '#697066', marginTop: 8, marginBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  chapter: { width: 54, textAlign: 'center', backgroundColor: '#FFFFFF', color: '#25321F', fontSize: 16, fontWeight: '800', paddingVertical: 16, borderRadius: 14, overflow: 'hidden' },
  error: { padding: 24, fontSize: 18 },
});

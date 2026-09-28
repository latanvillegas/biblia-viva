import { Link } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { bibleBooks } from '../../src/data/books';

export default function BibleScreen() {
  const oldTestament = bibleBooks.filter((book) => book.testament === 'Antiguo');
  const newTestament = bibleBooks.filter((book) => book.testament === 'Nuevo');

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Link href="/" style={styles.back}>‹ Inicio</Link>
        <Text style={styles.title}>Biblia</Text>
        <Text style={styles.subtitle}>Selecciona un libro para comenzar a leer.</Text>
        <BookSection title="Antiguo Testamento" books={oldTestament} />
        <BookSection title="Nuevo Testamento" books={newTestament} />
      </ScrollView>
    </SafeAreaView>
  );
}

function BookSection({ title, books }: { title: string; books: typeof bibleBooks }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {books.map((book) => (
        <Link key={book.id} href={{ pathname: '/biblia/[book]', params: { book: book.id } }} style={styles.book}>
          {book.name} · {book.chapters} capítulos
        </Link>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F5EF' },
  container: { padding: 24, paddingBottom: 48 },
  back: { color: '#556B2F', fontSize: 16, fontWeight: '700', marginTop: 12, marginBottom: 20 },
  title: { fontSize: 36, fontWeight: '800', color: '#1F261C' },
  subtitle: { fontSize: 16, color: '#697066', marginTop: 8, marginBottom: 28 },
  section: { marginBottom: 28 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#25321F', marginBottom: 10 },
  book: { backgroundColor: '#FFFFFF', color: '#25321F', fontSize: 16, fontWeight: '600', padding: 17, borderRadius: 14, marginBottom: 8, overflow: 'hidden' },
});

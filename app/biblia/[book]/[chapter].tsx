import { Link, useLocalSearchParams } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { getBook } from '../../../src/data/books';

const demoVerses = [
  'En el principio creó Dios los cielos y la tierra.',
  'La Palabra de Dios guía nuestro camino y alimenta nuestra fe.',
  'Este lector ya está preparado para recibir una traducción bíblica autorizada.',
];

export default function ReaderScreen() {
  const { book: bookId, chapter } = useLocalSearchParams<{ book: string; chapter: string }>();
  const book = getBook(bookId);

  if (!book) return <SafeAreaView style={styles.safeArea}><Text>Libro no encontrado.</Text></SafeAreaView>;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Link href={{ pathname: '/biblia/[book]', params: { book: book.id } }} style={styles.back}>‹ {book.name}</Link>
        <Text style={styles.title}>{book.name} {chapter}</Text>
        <Text style={styles.translation}>Texto de demostración · fuente bíblica pendiente</Text>
        <View style={styles.reader}>
          {demoVerses.map((verse, index) => (
            <Text key={index} style={styles.verse}>
              <Text style={styles.number}>{index + 1} </Text>{verse}
            </Text>
          ))}
        </View>
        <View style={styles.notice}>
          <Text style={styles.noticeTitle}>Fuente bíblica</Text>
          <Text style={styles.noticeText}>Esta pantalla usa contenido de demostración. La arquitectura permitirá conectar una traducción de dominio público o debidamente licenciada.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F5EF' },
  container: { padding: 24, paddingBottom: 56 },
  back: { color: '#556B2F', fontSize: 16, fontWeight: '700', marginTop: 12, marginBottom: 20 },
  title: { fontSize: 32, fontWeight: '800', color: '#1F261C' },
  translation: { fontSize: 13, color: '#7A8076', marginTop: 7, marginBottom: 28 },
  reader: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 22 },
  verse: { fontSize: 19, lineHeight: 31, color: '#2A3027', marginBottom: 16 },
  number: { fontSize: 12, fontWeight: '800', color: '#71805C' },
  notice: { marginTop: 22, padding: 18, backgroundColor: '#E9EDDF', borderRadius: 16 },
  noticeTitle: { fontWeight: '800', color: '#25321F', marginBottom: 5 },
  noticeText: { color: '#596056', lineHeight: 21 },
});

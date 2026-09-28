import { Link } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

const features = [
  { title: 'Buscar', description: 'Encuentra palabras, temas y pasajes.' },
  { title: 'Planes', description: 'Construye un hábito diario de lectura.' },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.brand}>BIBLIA VIVA</Text>
        <Text style={styles.title}>La Palabra contigo.</Text>
        <Text style={styles.subtitle}>Lee, estudia y guarda lo que Dios habla a tu vida.</Text>

        <View style={styles.verseCard}>
          <Text style={styles.eyebrow}>VERSÍCULO DEL DÍA</Text>
          <Text style={styles.verse}>“Lámpara es a mis pies tu palabra, y lumbrera a mi camino.”</Text>
          <Text style={styles.reference}>Salmos 119:105</Text>
        </View>

        <Text style={styles.sectionTitle}>Comienza aquí</Text>
        <Link href="/biblia" style={styles.primaryCard}>
          Leer la Biblia · Explora libros, capítulos y versículos
        </Link>
        {features.map((feature) => (
          <View key={feature.title} style={styles.card}>
            <Text style={styles.cardTitle}>{feature.title}</Text>
            <Text style={styles.cardDescription}>{feature.description}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F7F5EF' },
  container: { padding: 24, paddingBottom: 48 },
  brand: { fontSize: 13, fontWeight: '800', letterSpacing: 2.2, color: '#556B2F', marginTop: 18 },
  title: { fontSize: 38, lineHeight: 44, fontWeight: '800', color: '#1F261C', marginTop: 12 },
  subtitle: { fontSize: 17, lineHeight: 25, color: '#596056', marginTop: 10, marginBottom: 28 },
  verseCard: { backgroundColor: '#25321F', borderRadius: 24, padding: 24, marginBottom: 32 },
  eyebrow: { color: '#C9D8AE', fontSize: 11, fontWeight: '800', letterSpacing: 1.4, marginBottom: 14 },
  verse: { color: '#FFFFFF', fontSize: 22, lineHeight: 32, fontWeight: '600' },
  reference: { color: '#DDE6D0', fontSize: 14, fontWeight: '700', marginTop: 16 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#1F261C', marginBottom: 14 },
  primaryCard: { backgroundColor: '#556B2F', color: '#FFFFFF', fontSize: 16, fontWeight: '800', padding: 20, borderRadius: 18, marginBottom: 12, overflow: 'hidden' },
  card: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 20, marginBottom: 12 },
  cardTitle: { fontSize: 18, fontWeight: '800', color: '#25321F' },
  cardDescription: { fontSize: 14, lineHeight: 21, color: '#697066', marginTop: 5 },
});

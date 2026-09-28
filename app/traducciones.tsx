import { Link } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { translations } from '../src/data/translations';

export default function TranslationsScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Link href="/" style={styles.back}>‹ Inicio</Link>
        <Text style={styles.title}>Traducciones</Text>
        <Text style={styles.subtitle}>Elige entre las traducciones disponibles para Biblia Viva.</Text>

        {translations.map((translation) => (
          <View key={translation.id} style={styles.card}>
            <View style={styles.header}>
              <View style={styles.info}>
                <Text style={styles.name}>{translation.name}</Text>
                <Text style={styles.abbreviation}>{translation.abbreviation}</Text>
              </View>
              <Text style={[styles.badge, translation.enabled ? styles.available : styles.pending]}>
                {translation.enabled ? 'Disponible' : 'Requiere licencia'}
              </Text>
            </View>
            <Text style={styles.license}>{translation.license}</Text>
            {!translation.enabled && (
              <Text style={styles.notice}>La aplicación está preparada para esta traducción, pero su texto no se distribuirá hasta conectar un proveedor autorizado.</Text>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe:{flex:1,backgroundColor:'#F7F5EF'},container:{padding:24,paddingBottom:48},back:{color:'#556B2F',fontSize:16,fontWeight:'700',marginTop:12,marginBottom:20},title:{fontSize:36,fontWeight:'800',color:'#1F261C'},subtitle:{fontSize:16,lineHeight:23,color:'#697066',marginTop:8,marginBottom:24},card:{backgroundColor:'#FFF',borderRadius:18,padding:20,marginBottom:12},header:{flexDirection:'row',justifyContent:'space-between',gap:12},info:{flex:1},name:{fontSize:19,fontWeight:'800',color:'#25321F'},abbreviation:{fontSize:13,fontWeight:'700',color:'#71805C',marginTop:4},badge:{fontSize:11,fontWeight:'800',paddingHorizontal:10,paddingVertical:7,borderRadius:12,overflow:'hidden'},available:{backgroundColor:'#E2EED4',color:'#3E5229'},pending:{backgroundColor:'#F1E9D8',color:'#765E2B'},license:{fontSize:13,lineHeight:20,color:'#697066',marginTop:14},notice:{fontSize:13,lineHeight:20,color:'#765E2B',marginTop:10}
});

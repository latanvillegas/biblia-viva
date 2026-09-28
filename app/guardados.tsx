import { Link } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function SavedScreen(){return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.container}>
<Link href="/" style={s.back}>‹ Inicio</Link><Text style={s.title}>Mis guardados</Text><Text style={s.subtitle}>Tus favoritos, resaltados y notas vivirán aquí.</Text>
{[['Favoritos','Guarda versículos para encontrarlos rápidamente.'],['Resaltados','Organiza pasajes importantes con colores.'],['Notas','Escribe reflexiones vinculadas a un versículo.']].map(([title,text])=><View key={title} style={s.card}><Text style={s.cardTitle}>{title}</Text><Text style={s.text}>{text}</Text><Text style={s.empty}>Aún no hay elementos.</Text></View>)}
<View style={s.notice}><Text style={s.noticeTitle}>Persistencia preparada</Text><Text style={s.text}>El modelo de datos ya está definido. La siguiente integración añadirá almacenamiento local y luego sincronización con una cuenta.</Text></View>
</ScrollView></SafeAreaView>}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:'#F7F5EF'},container:{padding:24,paddingBottom:48},back:{color:'#556B2F',fontSize:16,fontWeight:'700',marginTop:12,marginBottom:20},title:{fontSize:36,fontWeight:'800',color:'#1F261C'},subtitle:{fontSize:16,color:'#697066',marginTop:8,marginBottom:24},card:{backgroundColor:'#FFF',padding:20,borderRadius:18,marginBottom:12},cardTitle:{fontSize:19,fontWeight:'800',color:'#25321F'},text:{fontSize:14,lineHeight:21,color:'#697066',marginTop:6},empty:{fontSize:13,color:'#8A9086',marginTop:14},notice:{backgroundColor:'#E9EDDF',padding:18,borderRadius:16,marginTop:8},noticeTitle:{fontWeight:'800',color:'#25321F'}});

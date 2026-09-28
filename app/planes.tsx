import { Link } from 'expo-router';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { readingPlans } from '../src/data/plans';

export default function PlansScreen() {
  return <SafeAreaView style={s.safe}><ScrollView contentContainerStyle={s.container}>
    <Link href="/" style={s.back}>‹ Inicio</Link><Text style={s.title}>Planes</Text>
    <Text style={s.subtitle}>Lecturas guiadas para crear un hábito y explorar la Biblia.</Text>
    {readingPlans.map(plan => <View key={plan.id} style={s.card}>
      <Text style={s.days}>{plan.durationDays} DÍAS</Text><Text style={s.cardTitle}>{plan.title}</Text>
      <Text style={s.text}>{plan.description}</Text>
      <View style={s.divider} />
      {plan.days.slice(0,3).map(day => <Text key={day.day} style={s.day}>Día {day.day} · {day.title} — {day.passages.join(', ')}</Text>)}
      {plan.days.length > 3 && <Text style={s.more}>+ {plan.days.length - 3} días más</Text>}
    </View>)}
  </ScrollView></SafeAreaView>;
}
const s=StyleSheet.create({safe:{flex:1,backgroundColor:'#F7F5EF'},container:{padding:24,paddingBottom:48},back:{color:'#556B2F',fontSize:16,fontWeight:'700',marginTop:12,marginBottom:20},title:{fontSize:36,fontWeight:'800',color:'#1F261C'},subtitle:{fontSize:16,lineHeight:23,color:'#697066',marginTop:8,marginBottom:24},card:{backgroundColor:'#FFFFFF',padding:20,borderRadius:20,marginBottom:14},days:{fontSize:11,fontWeight:'800',letterSpacing:1.3,color:'#71805C'},cardTitle:{fontSize:22,fontWeight:'800',color:'#25321F',marginTop:7},text:{fontSize:14,lineHeight:21,color:'#697066',marginTop:7},divider:{height:1,backgroundColor:'#ECEDE9',marginVertical:16},day:{fontSize:14,color:'#3D443A',marginBottom:8},more:{fontSize:13,fontWeight:'700',color:'#71805C',marginTop:4}});

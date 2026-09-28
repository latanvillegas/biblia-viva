import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StudyProvider } from '../src/context/StudyContext';
export default function RootLayout(){return <StudyProvider><StatusBar style="dark"/><Stack screenOptions={{headerShown:false}}/></StudyProvider>}

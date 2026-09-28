import { Stack } from 'expo-router';import { StatusBar } from 'expo-status-bar';import { StudyProvider } from '../src/context/StudyContext';import { PlanProvider } from '../src/context/PlanContext';
export default function RootLayout(){return <StudyProvider><PlanProvider><StatusBar style="dark"/><Stack screenOptions={{headerShown:false}}/></PlanProvider></StudyProvider>}

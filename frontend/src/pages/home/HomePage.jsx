import React from 'react'
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';
import { useAuthStore } from '../../store/authUser.js';

export default function HomePage() {
  const {user} = useAuthStore();
  return (
    <>
      {user ? <HomeScreen/>:<AuthScreen/>}
    </>
  )
}
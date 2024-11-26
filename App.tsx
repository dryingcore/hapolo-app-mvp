import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';
import LoginScreen from './components/LoginScreen'; // Certifique-se de importar o LoginScreen
import Dashboard from './components/Dashboard'; // Crie um componente para a Dashboard

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para controlar o login

  // Função chamada quando o login for bem-sucedido
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {isLoggedIn ? (
        <Dashboard /> // Renderiza a Dashboard se estiver logado
      ) : (
        <LoginScreen clientName="Hapolo" onLoginSuccess={handleLoginSuccess} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },
});

import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Image, Alert } from 'react-native';
import { Title } from 'react-native-paper';

interface LoginScreenProps {
  clientName: string;
  onLoginSuccess: () => void; // Função para indicar sucesso no login
}

export function LoginScreen(props: LoginScreenProps) {
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');

  const handleLogin = () => {
    if (cpf.trim().length >= 0 && senha.trim().length >= 0) {
      // Chama a função de sucesso do login, passando para o App
      props.onLoginSuccess();
    } else {
      Alert.alert('Por favor, preencha todos os campos.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')} // Substitua por sua imagem
          style={styles.logo}
        />
        <Text style={styles.title}>Olá, bem-vindo {props.clientName}!</Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Insira seu CPF</Text>
          <TextInput
            style={styles.input}
            placeholder="EX: 55413245211"
            keyboardType="numeric"
            value={cpf}
            onChangeText={setCpf}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Insira sua senha</Text>
          <TextInput
            style={styles.input}
            placeholder="EX: 1234"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        {/* Botão de Login */}
        <View style={styles.buttonContainer}>
          <Title style={styles.button} onPress={handleLogin}>
            Entrar
          </Title>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#333', // Cor de fundo do login
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  formContainer: {
    width: '80%', // Limita a largura do formulário
  },
  inputContainer: {
    marginTop: 20,
  },
  input: {
    backgroundColor: '#fff',
    height: 40,
    width: '100%',
    borderColor: '#ccc', // Cor da borda
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
  },
  label: {
    color: 'white',
    marginBottom: 5,
    fontSize: 12,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#4CAF50', // Cor de fundo do botão
    color: 'white',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    fontSize: 16,
  },
});

export default LoginScreen;

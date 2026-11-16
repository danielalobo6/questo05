import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';

export default function App() {
  const [saldo, setSaldo] = useState(1000.00);
  const [valor, setValor] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  const depositar = () => {
    Keyboard.dismiss();
    setErro('');
    setMensagem('');

    const valNum = parseFloat(valor.replace(',', '.'));
    if (isNaN(valNum) || valNum <= 0) {
      setErro('Informe um valor positivo para depósito.');
      return;
    }

    const novoSaldo = saldo + valNum;
    setSaldo(novoSaldo);
    setMensagem(`Depósito de R$ ${valNum.toFixed(2)} realizado com sucesso!`);
    setValor('');
  };

  const sacar = () => {
    Keyboard.dismiss();
    setErro('');
    setMensagem('');

    const valNum = parseFloat(valor.replace(',', '.'));
    if (isNaN(valNum) || valNum <= 0) {
      setErro('Informe um valor positivo para saque.');
      return;
    }

    if (valNum > saldo) {
      setErro('Operação recusada: valor de saque superior ao saldo disponível.');
      return;
    }

    const novoSaldo = saldo - valNum;
    setSaldo(novoSaldo);
    setMensagem(`Saque de R$ ${valNum.toFixed(2)} realizado com sucesso!`);
    setValor('');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Simulador Bancário</Text>

        <View style={styles.saldoBox}>
          <Text style={styles.saldoLabel}>Saldo Atual:</Text>
          <Text style={styles.saldoValor}>R$ {saldo.toFixed(2)}</Text>
        </View>

        <TextInput
          style={styles.input}
          placeholder="Digite o valor (R$)"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />

        <View style={styles.botoes}>
          <Button title="Depositar" color="#2e7d32" onPress={depositar} />
          <View style={{ height: 10 }} />
          <Button title="Sacar" color="#c62828" onPress={sacar} />
        </View>

        {erro ? <Text style={styles.erro}>{erro}</Text> : null}
        {mensagem ? <Text style={styles.sucesso}>{mensagem}</Text> : null}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  saldoBox: { backgroundColor: '#f0f0f0', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 20 },
  saldoLabel: { fontSize: 16, color: '#666' },
  saldoValor: { fontSize: 24, fontWeight: 'bold', color: '#1b5e20', marginTop: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 15, borderRadius: 5 },
  botoes: { marginBottom: 15 },
  sucesso: { marginTop: 15, fontSize: 14, color: '#2e7d32', fontWeight: 'bold', textAlign: 'center' },
  erro: { marginTop: 15, fontSize: 14, color: '#c62828', textAlign: 'center' },
});
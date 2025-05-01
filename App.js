import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, Button } from 'react-native';

export default function App() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    if (!query.trim()) return;

    try {
      const result = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a legal assistant for Indian citizens. Use the Constitution of India, IPC, CrPC, and RTI Act to guide users. Always respond in a simple, understandable way.'
            },
            {
              role: 'user',
              content: query
            }
          ]
        })
      });

      const data = await result.json();
      const answer = data.choices?.[0]?.message?.content || 'No response';
      setResponse(answer);
    } catch (error) {
      setResponse('Error fetching legal info.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Legal Assist (India)</Text>
      <TextInput
        style={styles.input}
        placeholder="Describe your legal issue here..."
        multiline
        onChangeText={setQuery}
        value={query}
      />
      <Button title="Get Help" onPress={handleSubmit} />
      <Text style={styles.response}>{response}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    minHeight: 100,
    borderRadius: 8
  },
  response: {
    marginTop: 20,
    fontSize: 16,
    color: 'green'
  }
});
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      loadHistory();
    }, [])
  );

  const loadHistory = async () => {
    const savedHistory = await AsyncStorage.getItem("history");
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent={true} backgroundColor={'#F5F5F5'} barStyle={'dark-content'} />
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
      }}>
        <Text style={styles.title}>Completed Tasks</Text>
      </View>
      {history && history.length > 0 ? (
        <FlatList
          data={history}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.historyItem}>
              <Text style={styles.historyText}>{item.name}</Text>
              <Text style={styles.dateText}>🕒 {item.completedAt}</Text>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateText}>No History</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#F5F5F5" },
  title: { fontSize: 24, fontWeight: "bold", textAlign: "center", color: "#333" },
  historyItem: { backgroundColor: "#FFF", padding: 15, marginVertical: 6, borderRadius: 8, },
  historyText: { fontSize: 18, fontWeight: "bold", color: "#333" },
  dateText: { fontSize: 14, color: "#666" },
  emptyStateContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 250
  },
  emptyStateText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '400'
  },
});

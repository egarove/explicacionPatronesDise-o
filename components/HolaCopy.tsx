import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { use, useEffect, useState } from "react";
import useAppContext from "../context/Context";
import StrategyClient from "../Singleton/StrategyClient";
import AxiosStrategy from "../Strategy/AxiosStrategy";
import FetchStrategy from "../Strategy/FetchStrategy";
import { JsonParsingStrategy } from "../Strategy/DataParsingStrategy";
import { StyleSheet } from "react-native";

const HolaCopy = () => {
  // Estado local para mensajes de interfaz
  const [mensaje, setMensaje] = useState("Selecciona una estrategia");

  // Store global
  const animales = useAppContext((s) => s.animales);
  const addAnimales = useAppContext((s) => s.addAnimales);
  const vaciasAnimales = useAppContext((s) => s.vaciarListaAnimales);

  // Instancias (Singleton y Parser)
  const client = StrategyClient.getInstance();
  const parser = new JsonParsingStrategy();
  const url = "/egarove/testingServer/main/animales.json";
  const baseUrl = "https://raw.githubusercontent.com";

  // Función unificada para manejar las peticiones
  const cargarDatos = (tipo: "Fetch" | "Axios") => {
    setMensaje(`Cargando con ${tipo}...`);

    // 1. Configurar Estrategia
    if (tipo === "Axios") {
      client.setStrategy(new AxiosStrategy(baseUrl));
    } else {
      client.setStrategy(new FetchStrategy(baseUrl));
    }

    // 2. Ejecutar Petición
    client
      .get(url)
      .then((response) => {
        const datosParseados = parser.parse(response);
        addAnimales(datosParseados);
        setMensaje(`¡Datos recibidos vía ${tipo}!`);
      })
      .catch((error) => {
        console.error(error);
        setMensaje("Error en la carga ");
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>HolaCopy</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.purpleButton]}
            onPress={() => {
              vaciasAnimales;
              cargarDatos("Fetch");              
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Usar Fetch</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.blueButton]}
            onPress={() => {
              vaciasAnimales;
              cargarDatos("Axios");              
            }}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>Usar Axios</Text>
          </TouchableOpacity>
        </View>
        /* --- MENSAJE DE ESTADO ---*/
        <Text style={styles.messageText}>{mensaje}</Text>
        /* --- LISTA DE RESULTADOS --- */
        <View style={styles.listContainer}>
          {animales.map((animal, index) => (
            <View key={index} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.animalName}>{animal.esp}</Text>
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{animal.tipo}</Text>
                </View>
              </View>

              <View style={styles.cardDetails}>
                <Text style={styles.detailText}>Peso medio: {animal.peso_kg}kg</Text>
                <Text style={styles.detailText}>Esperanza de vida: {animal.vida} años</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
//Chatgpt al fallo
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  container: {
    padding: 24,
    alignItems: "center",
    paddingBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 24,
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
    gap: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 3,

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  purpleButton: {
    backgroundColor: "#9333ea",
    marginRight: 10,
  },
  blueButton: {
    backgroundColor: "#2563eb",
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "600",
    fontSize: 16,
  },
  messageText: {
    marginBottom: 20,
    color: "#6b7280",
    fontStyle: "italic",
    fontWeight: "500",
    fontSize: 14,
  },
  listContainer: {
    width: "100%",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 5,
    borderLeftColor: "#6366f1",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardHeader: {
    flex: 1,
  },
  animalName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 4,
  },
  badge: {
    backgroundColor: "#e5e7eb",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 12,
    color: "#4b5563",
    fontWeight: "500",
  },
  cardDetails: {
    alignItems: "flex-end",
  },
  detailText: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 2,
  },
});

export default HolaCopy;

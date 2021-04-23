import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

import { Header } from "../_components/Header";
import { EnviromentButton } from "../_components/EnviromentButton";
import { Load } from "../_components/Load";

import { PlantProps } from "../libs/storage";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import api from "../services/api";
import { PlantCardPrimary } from "../_components/PlantCardPrimary";

interface EnvironmentProps {
  key: string;
  title: string;
}


export function PlantSelect() {
  const navigation = useNavigation();
  const [environments, setEnvironments] = useState<EnvironmentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [environmentSelected, setEnvironmentSelected] = useState("all");
  const [loading, setLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  //SELECIONANDO AMBIENTE
  function handleEnvironmentSelected(environment: string) {
    setEnvironmentSelected(environment);
    if (environment === "all") return setFilteredPlants(plants);
    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment)
    );
    setFilteredPlants(filtered);
  }
  //SELECIONANDO AMBIENTE

  function handleFetchMore(distance: number) {
    if (distance < 1) {
      return;
    }
    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
    fecthPlants();
  }

  function handlePlantSelect(plant: PlantProps) {
    navigation.navigate("PlantSave", { plant });
  }

  //BUSCANDO AMBIENTES
  useEffect(() => {
    async function fecthEnvironment() {
      const { data } = await api.get(
        "plants_environments?_sort=title&_order=asc"
      );
      setEnvironments([
        {
          key: "all",
          title: "Todos",
        },
        ...data,
      ]);
    }
    fecthEnvironment();
  }, []);
  //BUSCANDO AMBIENTES

  //BUSCANDO PLANTAS
  async function fecthPlants() {
    const { data } = await api.get(
      `plants?_sort=name&_order=asc&_page${page}&_limit=8`
    );
    if (!data) return setLoading(true);
    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }
    setLoading(false);
    setLoadingMore(false);
  }
  useEffect(() => {
    fecthPlants();
  }, []);
  //BUSCANDO PLANTAS

  if (loading) return <Load />;
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
        <Text style={styles.title}>Em qual ambiente</Text>
        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={environments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButton
              active={item.key === environmentSelected}
              onPress={() => handleEnvironmentSelected(item.key)}
              title={item.title}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.environmentList}
        />
      </View>

      <View style={styles.plant}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handlePlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handleFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: colors.background,
  },

  header: {
    paddingHorizontal: 30,
  },

  title: {
    fontSize: 17,
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight: 20,
    marginTop: 15,
  },

  subtitle: {
    fontFamily: fonts.heading,
    fontSize: 17,
    lineHeight: 20,
    color: colors.heading,
  },

  environmentList: {
    height: 40,
    justifyContent: "center",
    paddingBottom: 5,
    marginLeft: 32,
    marginVertical: 32,
  },

  plant: {
    flex: 1,
    paddingHorizontal: 32,
    justifyContent: "center",
  },
});

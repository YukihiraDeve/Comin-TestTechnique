import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../def'; // Assurez-vous que le chemin d'importation est correct
import { getPokemonByName } from '../api/pokeAPI';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'DetailScreen'>;

type DetailScreenProps = {
  route: DetailScreenRouteProp;
};

const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const { name } = route.params;
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const data = await getPokemonByName(name);
        setPokemon(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [name]);

  if (loading) return <Text>Chargement...</Text>;

  if (!pokemon) return <Text>Pokemon introuvable</Text>;

  return (
    <View>
      <Text>{pokemon.name}</Text>
    </View>
  );
};

export default DetailScreen;

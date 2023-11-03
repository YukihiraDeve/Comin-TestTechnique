import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../def'; // Assurez-vous que le chemin d'importation est correct
import { getPokemonDetails } from '../api/pokeAPI';
import {styles} from '../styles/DetailScreen';
import { capitalizeFirstLetter, formatWeight } from '../utils/helper';

type DetailScreenRouteProp = RouteProp<RootStackParamList, 'DetailScreen'>;

type DetailScreenProps = {
  route: DetailScreenRouteProp;
};

interface PokemonDetail {
    name: string;
    id: number;
    types: { type: { name: string } }[];
    weight: number;
    sprites: {
        front_default: string;
    };
}

const DetailScreen: React.FC<DetailScreenProps> = ({ route }) => {
  const { name } = route.params;
  const [pokemon, setPokemon] = useState<PokemonDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      setLoading(true);
      try {
        const data: PokemonDetail = await getPokemonDetails(name);
        setPokemon(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPokemonDetails();
  }, [name]);

  if (loading) {
    return <Text>Chargement...</Text>;
  }

  if (!pokemon) {
    return <Text>Pokemon introuvable</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: pokemon.sprites.front_default }} style={styles.sprite} />
      <Text>{capitalizeFirstLetter(pokemon.name)}</Text>
      <Text>#{pokemon.id}</Text>
      <Text>Type: {capitalizeFirstLetter(pokemon.types.map(t => t.type.name).join(', '))}</Text>
      <Text>Poids: {formatWeight(pokemon.weight)}</Text>
    </View>
  );
};

export default DetailScreen;

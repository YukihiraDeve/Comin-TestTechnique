const BASE_URL = 'https://pokeapi.co/api/v2';

// Fonction pour obtenir une liste de Pokémon

type PokemonListResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
      name: string;
      url: string;
    }[];
  };

  export const getPokemonList = async (limit: number = 50, offset: number = 0): Promise<PokemonListResponse> => {
    try {
      const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}&offset=${offset}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const pokemonWithSprites = await Promise.all(data.results.map(async (pokemon: any) => {
          const details = await getPokemonDetails(pokemon.name);
          return {
              ...pokemon,
              sprite: details.sprites.front_default
          };
      }));
      return {
          ...data,
          results: pokemonWithSprites
      };
    } catch (error) {
      console.error('Could not fetch Pokémon list:', error);
      throw error;
    }
};

// Fonction pour obtenir les détails d'un Pokémon spécifique
export const getPokemonDetails = async (name: string) => {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${name}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error(`Could not fetch details of Pokémon ${name}:`, error);
    throw error;
  }
};

export const getPokemonByName = async (name: string) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const pokemonData = await response.json();
      return pokemonData;
    } catch (error) {
      console.error('Error fetching data: ', error);
      throw error;
    }
  };

  export const getPokemonSprite = async (name: string): Promise<string> => {
    try {
      const details = await getPokemonDetails(name);
      return details.sprites.front_default;
    } catch (error) {
      console.error(`Could not fetch sprite of Pokémon ${name}:`, error);
      throw error;
    }
};


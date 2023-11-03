import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getPokemonList, getPokemonByName } from '../api/pokeAPI';

interface PokemonState {
    list: any[];
    current: any | null;
    loading: boolean;
    error: string | null;
}

const initialState: PokemonState = {
    list: [],
    current: null,
    loading: false,
    error: null
};

export const fetchPokemonList = createAsyncThunk('pokemon/fetchList', async () => {
    const data = await getPokemonList(20, 0);
    return data.results; 
});

export const fetchPokemonByName = createAsyncThunk('pokemon/fetchByName', async (name: string) => {
    const response = await getPokemonByName(name);
    return response;
});

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
        .addCase(fetchPokemonList.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchPokemonList.fulfilled, (state, action) => {
            state.list = action.payload;
            state.loading = false;
        })
        .addCase(fetchPokemonList.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = false;
        })
    }
});

export default pokemonSlice.reducer;

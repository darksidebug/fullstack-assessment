import { useCallback, useEffect, useRef, useState } from "react"
import { ABILITIES, BASE_URL, ELEMENTS, POKEMONS } from "../constants/endpoints";
import axios from "axios";
import type { Ability, Pokemon, PokemonListItem, Element } from "../types";

export const usePokemon = () => {
  const [pokemonList, setPokemonLists] = useState<PokemonListItem[]>([]);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pokemonElements, setPokemonElements] = useState<Element[]>([]);
  const [pokemonAbilities, setPokemonAbilities] = useState<Ability[]>([]);
  const loadingDataRef = useRef(false);
  const [sort, setSort] = useState<string | null>(null);
  const [pokemonListCopy, setPokemonListCopy] = useState<PokemonListItem[]>([]);
  const [keyword, setKeyword] = useState<string | null>(null);
  
  const fetchAllPokemons = useCallback(async () => {
    try {
      const { data, status } = await axios.get(`${BASE_URL}/${POKEMONS}`);

      if (status === 200) {
        setPokemons(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchPokemonElements = useCallback(async () => {
    try {
      const { data, status } = await axios.get(`${BASE_URL}/${ELEMENTS}`);

      if (status === 200) {
        setPokemonElements(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchPokemonAbilities = useCallback(async () => {
    try {
      const { data, status } = await axios.get(`${BASE_URL}/${ABILITIES}`);

      if (status === 200) {
        setPokemonAbilities(data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await Promise.all([
        fetchAllPokemons(),
        fetchPokemonElements(),
        fetchPokemonAbilities()
      ]);
    };

    if (!loadingDataRef.current) {
      fetchData();
      loadingDataRef.current = true;
    }
  }, [loadingDataRef]);

  useEffect(() => {
    if (!pokemons?.length || !pokemonElements?.length || !pokemonAbilities?.length) {
      return;
    }

    const data: PokemonListItem[] = pokemons.map((item: Pokemon) => {
      const element = pokemonElements.find(
        (el: Element) => el.id === item.element_id
      );
      const ability = pokemonAbilities.find(
        (ability: Ability) => ability.pokemon_id === item.id
      );

      return {
        power: ability ? Number(ability.power) : 0,
        ability_id: ability ? ability.id : null,
        ability: ability ? ability.name : "",
        type: element ? element.name : "",
        color: element ? element.color : "",
        ...item,
      }
    });
    setPokemonLists(data);
  }, [
    pokemons,
    pokemonElements,
    pokemonAbilities
  ]);

  useEffect(() => {
    if (sort === null) return;

    const sortedPokemons = [...pokemonList].sort((a, b) => {
      if (sort === 'asc') {
        return a.name.localeCompare(b.name);
      } 
      
      if (sort === 'desc') {
        return b.name.localeCompare(a.name);
      }

      return a.id - b.id
    });
    setPokemonLists(sortedPokemons);
    setSort(null);
  }, [sort, pokemonList])

  useEffect(() => {
    if (keyword === null) return;

    setTimeout(() => {
      const filteredPokemons = pokemonList.filter((item: PokemonListItem) => 
        JSON.stringify(item).toLocaleLowerCase().includes(keyword.toLowerCase())
      );

      setPokemonListCopy(filteredPokemons);
    }, )
  }, [keyword, pokemonList])

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timeout: ReturnType<typeof setTimeout>;
    return (...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  }

  const handleSearch = debounce((keys) => {
    setKeyword(keys);
  }, 500);

  return {
    pokemons,
    pokemonElements,
    pokemonAbilities,
    pokemonList,
    setSort,
    pokemonListCopy,
    handleSearch
  }
}

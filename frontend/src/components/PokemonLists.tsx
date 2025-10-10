import { useMemo } from 'react';
import { usePokemon } from '../hooks/usePokemon'
import Dropdown from './common/Dropdown';
import PokemonCard from './common/PokemonCard';
import SearchFilter from './common/SearchFilter';

const PokemonLists = () => {
  const {
    pokemonList, 
    setSort, 
    pokemonListCopy,
    handleSearch
  } = usePokemon();

  const pokemons = useMemo(() => {
    if (pokemonListCopy?.length) return pokemonListCopy;
    return pokemonList;
  }, [pokemonList, pokemonListCopy])

  return (
    <div className='container mx-auto mt-6 px-4 sm:px-4 md:px-10 lg:px-4 2xl:px-0'>
      <div className='flex items-center justify-between pb-4 border-b border-gray-300'>
        <div className='w-7/12 md:w-5/12 xl:w-4/12 2xl:w-3/12 '>
          <SearchFilter onChange={(e) => handleSearch(e.target.value)} />
        </div>
        <Dropdown
          onSelect={(value: string) => setSort(value)}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 my-6'>
        {pokemons.map(item => (
          <PokemonCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </div>
  )
}

export default PokemonLists

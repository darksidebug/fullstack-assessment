import { useMemo } from 'react';
import type { PokemonListItem } from '../../types';
import Electric from '../../assets/icons/Electric';
import Fire from '../../assets/icons/Fire';
import Dragon from '../../assets/icons/Dragon';
import Grass from '../../assets/icons/Grass';
import Ghost from '../../assets/icons/Ghost';
import Psychic from '../../assets/icons/Phsychic';
import Normal from '../../assets/icons/Normal';
import Water from '../../assets/icons/Water';
import Fight from '../../assets/icons/Fight';

const PokemonCard = ({ item }: { item: PokemonListItem}) => {
  const hexToRgba = (hex: string, alpha: number) => {
    let r = parseInt(hex.slice(1, 3), 16);
    let g = parseInt(hex.slice(3, 5), 16);
    let b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  const pokemon = useMemo(() => item, [item]);

  const elements = {
    "Electric": <Electric />,
    "Fire": <Fire />,
    "Dragon": <Dragon />,
    "Grass": <Grass />,
    "Ghost": <Ghost />,
    "Psychic": <Psychic />,
    "Normal": <Normal />,
    "Water": <Water />,
    "Fighting": <Fight />
  }

  return (
    <div
      className='relative min-h-[350px] flex items-center justify-center border border-gray-300 rounded-lg overflow-hidden hover:outline-[4px] outline-offset-1 outline-gray-400'
      style={{
        background: `linear-gradient(to bottom, ${pokemon.color}, ${hexToRgba(pokemon.color, 0.7)})`
      }}
    >
      <div className='absolute top-5 text-center'>
        <h3 className='text-white text-2xl font-semibold'>{pokemon.name}</h3>
        <span className='relative -top-1 text-gray-100 text-sm'>{pokemon.ability}</span>
      </div>
      <span className='absolute z-1 top-5'>{elements[pokemon.type as keyof typeof elements]}</span>
      {pokemon.image_url && (
        <div className='relative z-2 h-full flex items-center justify-center'>
          <img
            src={pokemon.image_url}
            alt="pokemon"
            className='h-[180px] w-[180px]'
            style={{
              filter: 'drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.5))'
            }}
          />
        </div>
      )}
      <div className='absolute bottom-5 flex flex-col justify-center items-center text-white font-semibold'>
        <h4>HP: {pokemon.hp}</h4>
        <h4>Attack: {pokemon.power}</h4>
      </div>
    </div>
  )
}

export default PokemonCard

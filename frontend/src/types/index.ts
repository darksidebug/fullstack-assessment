export interface Pokemon {
  id:         number;
  element_id: number;
  hp:         number;
  image_url:  string;
  name:       string
}

export interface Element {
  id:    number;
  color: string;
  name:  string
}

export interface Ability {
  id:         number;
  pokemon_id: number;
  power:      string;
  name:       string
}

export interface PokemonListItem extends Pokemon {
  ability_id: number | null;
  power:      number;
  ability:    string;
  color:      string;
  type:       string;
}
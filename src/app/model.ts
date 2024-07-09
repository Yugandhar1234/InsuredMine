
export interface IPage{
  count: number 
  next: null | string 
  previous: null | string, 
  results: ICharacter[]
}

export interface ICharacter {
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  birth_year: string
  gender: string
  homeworld: string
  films: string[]
  species: any[]
  vehicles: string[]
  starships: string[]
  created: string
  edited: string
  url: string
  }
  
  export interface IFilm {
    title: string;
    url: string;
  }
  
  export interface ISpecies {
    name: string;
    url: string;
  }
  
  export interface IVehicle {
    name: string;
    url: string;
  }
  
  export interface IStarship {
    name: string;
    url: string;
  }
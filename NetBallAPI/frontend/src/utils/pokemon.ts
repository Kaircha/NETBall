const PokemonUtils = {
    fullName(name: string) {
      if (name === undefined || name.length === 0) return ""; 
      return name[0].toUpperCase() + name.slice(1).toLowerCase();
    },
    displayName(name: string) {
      if (name === undefined || name.length === 0) return ""; 
      return (name[0].toUpperCase() + name.slice(1).toLowerCase()).split('-')[0];
    }
}


// CAUTIONARY TALE: DO NOT USE THIS SHIT AT LEAST FOR NOW GET USED TO IT
// class PokeUtils {
//     static fullName(name: string) {
//         return name[0].toUpperCase() + name.slice(1).toLowerCase();
//     }
//     static displayName(name: string) {
//         return (name[0].toUpperCase() + name.slice(1).toLowerCase()).split('-')[0];
//     }
// }

export default PokemonUtils
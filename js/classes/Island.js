export default class Island {
    constructor(name, color) {
        this.name = name || this.getRandomName();
        this.color = color || this.getRandomColor();
    }
  
    getRandomColor() {
      return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
  
    remove(islandElement) {
      // JS animations api, fade out

      //check if islandElement exists before attempting to remove it
      // remove the element when the animation ended
      if(islandElement) {
        islandElement.addEventListener('animationend', () => {
            islandElement.remove();
        });
        islandElement.classList.add('island-fade-out');
      }
     
    }
  
    getRandomName() {
      // array with 10 random island names
      const names = [
        "Starlight Cove",
        "Galaxy Oasis",
        "Nebula Shores",
        "Cosmic Retreat",
        "Aurora Isle",
        "Celestial Haven",
        "Lunar Paradise",
        "Astral Beach",
        "Orion Oasis",
        "Stellar Haven"
      ];
  
      // return a random name from the array
      return names[Math.floor(Math.random() * names.length)];
    }
  }
  
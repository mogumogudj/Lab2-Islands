export default class Island {
    constructor(name) {
        this.name = name || this.getRandomName();
        this.color = this.getRandomColor();
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
        "Palmtree beach",
        "Sandy beach",
        "Tropical beach",
        "Palm beach",
        "Sunny beach",
        "Paradise beach",
        "Sunny island",
        "Tropical island",
        "Palm island",
        "Paradise island"
      ];
  
      // return a random name from the array
      return names[Math.floor(Math.random() * names.length)];
    }
  }
  
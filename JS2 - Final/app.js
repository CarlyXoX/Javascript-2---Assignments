const { createApp } = Vue;

createApp({
  data() {
    return {
      cats: this.loadCats(),
      selectedCat: null,
      scheduled: JSON.parse(localStorage.getItem('scheduled-cats') || '[]')
    };
  },
  methods: {
    loadCats() {
      // initial seed data
      return [
        {
          id: 1,
          name: 'Void',
          age: '2',
          fee: 40,
          img: 'Black Cat.jpg',
          description: "I'm full of energy and need an owner who can keep up with me.",
          favorite: false
        },
        {
          id: 2,
          name: 'Mr. Peabody',
          age: '4',
          fee: 30,
          img: 'Gray Tabby.jpg',
          description: "A distinguished gentleman ready to oversee your household.",
          favorite: false
        },
        {
          id: 3,
          name: 'Clementine',
          age: '1',
          fee: 40,
          img: 'Orange Tabby.jpg',
          description: "I love taking long naps in the sun, but I'm full of energy in the evening.",
          favorite: false
        },
        {
          id: 4,
          name: 'Carmella',
          age: '8mo',
          fee: 50,
          img: 'Tortishell Cat.jpg',
          description: "Young and feisty, but sweet as caramel with treats!",
          favorite: false
        }
      ];
    },
    toggleFavorite(cat) {
      cat.favorite = !cat.favorite;
      this.saveState();
    },
    showDetails(cat) {
      this.selectedCat = cat;
      const el = document.getElementById('detailsModal');
      const m = new bootstrap.Modal(el);
      m.show();
    },
    scheduleMeet(cat) {
      if (this.scheduled.find(c => c.id === cat.id)) {
        alert(`${cat.name} is already scheduled!`);
        return;
      }
      this.scheduled.push(cat);
      this.saveState();
      alert(`Meet-&-Greet scheduled for ${cat.name}`);
    },
    saveState() {
      localStorage.setItem('scheduled-cats', JSON.stringify(this.scheduled));
      // could also persist cats if you want favorites to survive refresh
      localStorage.setItem('cats', JSON.stringify(this.cats));
    }
  },
  mounted() {
    // restore favorite status if saved before
    const savedCats = localStorage.getItem('cats');
    if (savedCats) {
      this.cats = JSON.parse(savedCats);
    }
  }

  

}).mount('#app');

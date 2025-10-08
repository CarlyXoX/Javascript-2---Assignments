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

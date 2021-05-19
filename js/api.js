let app = new Vue({
  el: '#app',
  data: {
    welcomeMessage: 'Welcome To My Api Page',
    results: [],
    total_number: 6
  },
  mounted() {
    axios.get('http://206.189.202.188:2523/articles/index.json').then(response => {
      this.results = response.data
    })
  }
});
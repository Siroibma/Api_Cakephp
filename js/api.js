


let app = new Vue({
  el: '#app',
  data: {
    welcomeMessage: 'Welcome To My Api Page',
    results: [],
    total_number: 6,
    output: ''
  },
  mounted() {

    axios ({
      method: 'get',
      url: 'http://206.189.202.188:2523/articles/index.json',
      params : {
        _limit: 6
      }
      })
      .then(response => {
        this.results = response.data
        console.log(this.results)
      })
  },
  methods: {
    formSubmit(e) {
        e.preventDefault();
        let currentObj = this;
        this.axios.post('http://206.189.202.188:2523/api/users/add', {
            email: 'ambioris42432@gmail.com',
            password: 'test'
        })
    }
},
});

function addUser() {
  axios
    .post('http://206.189.202.188:2523/api/users/add', {
      email: 'ambioris42432@gmail.com',
      password: 'test'
    })
    .then(res => console.log(res.request.response.data[0]))
    .catch(err => console.error(err));
}

function deleteArticle() {
  axios
    .post('http://206.189.202.188:2523/api/users/add', {
      email: 'ambioris42432@gmail.com',
      password: 'test'
    })
    .then(res => console.log(res.request.response.data[0]))
    .catch(err => console.error(err));
}


function createArticle() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'sometoken'
    }
  };

  axios
    .post(
      'https://jsonplaceholder.typicode.com/todos',
      {
        title: 'New Todo',
        completed: false
      },
      config
    )
    .then(res => showOutput(res))
    .catch(err => console.error(err));
}




document.getElementById('post').addEventListener('click', addUser);
document.getElementById('create').addEventListener('click', createArticle);
document.getElementById('delete').addEventListener('click', deleteArticle);
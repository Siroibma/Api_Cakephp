token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjgwLCJleHAiOjE2MjIxMzI0ODB9.GEoBhrlckoVTjt4upuwyzNdD2G5ZJ3KK4ZxGCPeG-PM"


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
    .then(res => console.log(res.request.response.data))
    .catch(err => console.error(err));
}

function deleteArticle() {

  Article_ID = String(document.getElementById('AID').value);

  Article_url = "http://206.189.202.188:2523/api/articles/delete/";

  console.log(Article_ID);

  delete_url = Article_url.concat(Article_ID);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
    }
  };


  console.


  axios
    .delete(
      'http://206.189.202.188:2523/api/articles/delete/8',
      {
        id: '8'
      },
      config
    )
    .then(result => console.log(result))
    .catch(err => console.error(err));
}


function createArticle() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
    }
  };

  axios
    .post(
      'http://206.189.202.188:2523/api/articles/add',
      {
        title: 'New Todo',
        body: 'hello',
        category_id: '0'
      },
      config
    )
    .then(result => console.log(result))
    .catch(err => console.error(err));
}






document.getElementById('post').addEventListener('click', addUser);
document.getElementById('create').addEventListener('click', createArticle);
document.getElementById('delete').addEventListener('click', deleteArticle);
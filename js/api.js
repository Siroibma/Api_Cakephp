let app = new Vue({
  el: '#app',
  data: {
    welcomeMessage: 'Welcome To My Api Page',
    results: [],
    total_number: 5,
    output: '',
    token: '',
    email: '',
    password: '',
    title: '',
    body: '',
    id: '',
    category: ''

  },

  methods : {

    addUser:function() {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
    
      axios
        .post('http://206.189.202.188:2523/api/users/add', {
          email: `${app.email}`,
          password: `${app.password}`
        },
        config
        )
        .then(response => 
          this.token_get(response)
        )
        .catch(error => console.error(error)); 
    },

    refreshArticle:function(){
      axios ({
        method: 'get',
        url: 'http://206.189.202.188:2523/articles/index.json',
        })
        .then(response => {
          this.results = response.data
          console.log(this.results)
        })
    },

    deleteArticle:function(){

      let Article_url = "http://206.189.202.188:2523/api/articles/delete/";
      let delete_url = Article_url.concat(app.id);
    
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${app.token}` 
        }
      };

      axios
        .delete(
          `${delete_url}`,
          config
        )
        .then(result => console.log(result))
        .catch(err => console.error(err));

        this.refreshArticle();

    },
    updateArticle:function(){

      let Article_url = "http://206.189.202.188:2523/api/articles/edit/";
      let edit_url = Article_url.concat(app.id);

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${app.token}` 
        }
      };
    
      axios
        .post(
          `${edit_url}`,
          {
            title: `${app.title}`,
            body: `${app.body}`,
          },
          config
        )
        .then(result => console.log(result))
        .catch(err => console.error(err));

        this.refreshArticle();

    },
    createArticle:function(){

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${app.token}` 
        }
      };
    
      axios
        .post(
          'http://206.189.202.188:2523/api/articles/add',
          {
            title: `${app.title}`,
            body: `${app.body}`,
            category_id: `${app.category}`
          },
          config
        )
        .then(result => console.log(result))
        .catch(err => console.error(err));

        this.refreshArticle();

    },
    token_get:function(response){
      console.log(response.request.response);
      json_response = JSON.parse(response.request.response);
    
      app.token = json_response.data.token;
      console.log(app.token)
    },


  },
  mounted() {

    axios ({
      method: 'get',
      url: 'http://206.189.202.188:2523/articles/index.json',
      })
      .then(response => {
        this.results = response.data
        console.log(this.results)
      })
  },
});

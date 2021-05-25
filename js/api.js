token = "";

let app = new Vue({
  el: '#app',
  data: {
    welcomeMessage: 'Welcome To My Api Page',
    results: [],
    total_number: 5,
    output: '',
    token: '',
    email: '',
    password: ''

  },

  methods : {

    addUser:function() {

      console.log(this.$refs.user_info.email.value);
      console.log(this.$refs.user_info.password.value);
    
    
      app.email = String(this.$refs.user_info.email.value); 
      app.password = String(this.$refs.user_info.password.value);
    
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


      let Article_ID = String(this.$refs.delete_art.art_id.value);
    
      let Article_url = "http://206.189.202.188:2523/api/articles/delete/";
    
      console.log(Article_ID);
    
      let delete_url = Article_url.concat(Article_ID);
    
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${app.token}` 
        }
      };
    
    
      console.log(delete_url);
    
    
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
      let Article_ID = String(this.$refs.update_art.update_AID.value);
      let Article_Title = String(this.$refs.update_art.update_title.value);
      let Article_Body = String(this.$refs.update_art.update_body.value);
    
    
    
      let Article_url = "http://206.189.202.188:2523/api/articles/edit/";
    
      console.log(Article_ID);
    
      let edit_url = Article_url.concat(Article_ID);
    
    
    
    
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
            title: `${Article_Title}`,
            body: `${Article_Body}`,
          },
          config
        )
        .then(result => console.log(result))
        .catch(err => console.error(err));

        this.refreshArticle();

    },
    createArticle:function(){
      let Article_Title = String(this.$refs.article_info.title.value);
      let Article_Body = String(this.$refs.article_info.body.value);
      let Article_Category = String(this.$refs.article_info.category.value);
    
    
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
            title: `${Article_Title}`,
            body: `${Article_Body}`,
            category_id: `${Article_Category}`
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

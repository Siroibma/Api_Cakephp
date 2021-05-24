token = "";
var amount = 5;

console.log(token);

let app = new Vue({
  el: '#app',
  data: {
    welcomeMessage: 'Welcome To My Api Page',
    results: [],
    total_number: amount,
    output: ''
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

function addUser(event) {

  console.log("hello");

  event.preventDefault();


  let email = "amber123@gmail.com";
  let password = "123";

  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  axios
    .post('http://206.189.202.188:2523/api/users/add', {
      email: `${email}`,
      password: `${password}`
    },
    config
    )
    .then(response => 
      test_statement(response)
    )
    .catch(error => console.error(error));
}


function test_statement(response) {
  console.log(response.request.response);
  json_response = JSON.parse(response.request.response);

  token = json_response.data.token;
}

function deleteArticle(event) {
  event.preventDefault();

  let Article_ID = String(document.getElementById('article_ID').value);

  let Article_url = "http://206.189.202.188:2523/api/articles/delete/";

  console.log(Article_ID);

  let delete_url = Article_url.concat(Article_ID);

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
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

}


function createArticle(event) {

  event.preventDefault();

  let Article_Title = String(document.getElementById('title').value);
  let Article_Body = String(document.getElementById('body').value);
  let Article_Category = String(document.getElementById('category_id').value);


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
        title: `${Article_Title}`,
        body: `${Article_Body}`,
        category_id: `${Article_Category}`
      },
      config
    )
    .then(result => console.log(result))
    .catch(err => console.error(err));

}

function updateArticle(event) {

  event.preventDefault();

  let Article_Title = String(document.getElementById('update_title').value);
  let Article_Body = String(document.getElementById('update_body').value);
  let Article_ID = String(document.getElementById('AID').value);



  let Article_url = "http://206.189.202.188:2523/api/articles/edit/";

  console.log(Article_ID);

  let edit_url = Article_url.concat(Article_ID);




  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` 
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
}






document.getElementById('create').addEventListener('click', createArticle);
document.getElementById('delete').addEventListener('click', deleteArticle);
document.getElementById('register').addEventListener('click', addUser);
document.getElementById('update').addEventListener('click', updateArticle);
const STORAGE_KEY = 'lists';

let app = new Vue({
    el: "#vueApp",
    data: {
        welcomeMessage: 'To Do List',
        lists:[
          {id:1, item: 'Test1', status: 'Incomplete'},
          {id:2, item: 'Test2', status: 'Incomplete'},
          {id:3, item: 'Test3', status: 'Incomplete'}
        ],
        newItem: '',
    },

    created () {
      this.lists = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    },
    methods: {

      //This allows us to add a list item to our website
      addItem:function(){
        let id = this.lists.length + 1
        if(this.newItem!== '') {
          const newList = {id:id,item:this.newItem, status: 'Incomplete'}
          this.lists.push(newList)
          this.newItem = ''
          localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lists))
        }
      },

      change_status:function(index) {
        //var index_color = index + 1;
        if(this.lists[index].status == "Incomplete"){
          this.lists[index].status = "Complete"
          document.getElementsByClassName("list-group-item")[index].style.color = "Green";
          //document.getElementById(index_color).style.color = 'Green';
        }
        else {
          this.lists[index].status = "Incomplete"
          document.getElementsByClassName("list-group-item")[index].style.color = "Red";
          //document.getElementById("#1").style.color = 'Red';
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lists))

      },

      remove:function(list) {
        this.lists.splice(this.lists.indexOf(list), 1)
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lists))

      },

      swap_up:function(index) {
        if(index == 0){
          alert('Cannot Swap Up')
        }
        else {
          this.lists.splice(index - 1, 2, this.lists[index], this.lists[index - 1])
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lists))

      },

      swap_down:function(index) {
        array_length = this.lists.length;
        if (index + 1 == array_length){
          alert("You Cannot Swap down since you exceed the list length");
        }
        else {
          let rows = [this.lists[index], this.lists[index + 1]];
          this.lists.splice(index, 2, rows[1], rows[0]);
        }
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lists))

      },

    },
    mounted() {

    },
});

              // Full spec-compliant TodoMVC with localStorage persistence
              // and hash-based routing in ~120 effective lines of JavaScript.

              // localStorage persistence
              /*var STORAGE_KEY = 'taches'
              var todoStorage = {
                fetch: function () {
                  var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
                  todos.forEach(function (todo, index) {
                    todo.id = index
                  })
                  todoStorage.uid = todos.length
                  return todos
                },
                save: function (todos) {
                  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
                }
              }*/

              var db = firebase.initializeApp({
                databaseURL: 'https://todo-9566f.firebaseio.com/'
              }).database()
              var todosRef = db.ref('todo')
              var todoId = Math.floor((Math.random() * 1000000000) + 1)
              var todos = todosRef


              // visibility filters
              var filters = {
                all: function (todos) {
                  return todos
                },
                active: function (todos) {
                  return todos.filter(function (todo) {
                    return !todo.completed
                  })
                },
                completed: function (todos) {
                  return todos.filter(function (todo) {
                    return todo.completed
                  })
                }
              }

              // app Vue instance
              var app = new Vue({
                data: {
                  /*todos: '',*/
                  newTodo: '',
                  editedTodo: null,
                  visibility: 'all'
                },
                firebase: {
                  todos: todosRef.limitToLast(50)
                },
                // watch todos change for localStorage persistence
                watch: {
                  todos: {
                    handler: function () {
                      todosRef
                    },
                    deep: true
                  },
                    remaining: function () {
                        $.ajax({
                          async: true,
                          type: "GET",
                          url: "/",
                          success: function () {
                              document.title = document.getElementById('noti').innerHTML + ' Tâches';
                              document.getElementById('pageh1').innerHTML = "Tâches"
                              document.getElementById('noti').style.left = null
                              if (document.getElementById('noti').innerHTML < 2) {
                                document.getElementById('pageh1').innerHTML = "Tâche"
                                document.getElementById('noti').style.left = "72.7%"
                                document.title = document.getElementById('noti').innerHTML + ' Tâche';
                              };
                          },
                          error: function () {
                              document.title = 'Tâches'
                          }
                        });
                    }
                },

                // computed properties
                computed: {
                  filteredTodos: function () {
                    return filters[this.visibility](this.todos)
                  },
                  remaining: function () {
                    return filters.active(this.todos).length
                  },
                  allDone: {
                    get: function () {
                      return this.remaining === 0
                    },
                    set: function (value) {
                      this.todos.forEach(function (todo) {
                        todo.completed = value
                        if (!todo.completed) {
                          todosRef.child(todo['.key']).child('completed').set(false)
                        } else {
                          todosRef.child(todo['.key']).child('completed').set(true)
                        }
                      })
                    }
                  }
                },
                  filters: {
                    pluralize: function (n) {
                      return n === 1 || n === 0 ? 'tâche restante' : 'tâches restantes'
                    }
                  },

                // methods that implement data logic.
                // note there's no DOM manipulation here at all.
                methods: {
                  addTodo: function () {
                    var value = this.newTodo && this.newTodo.trim()
                    if (!value) {
                      return
                    }
                    todosRef.push({
                      title: this.newTodo,
                      completed: false,
                      index: todoId ++
                    })
                    try {
                      var xhr = new XMLHttpRequest();
                      xhr.open("POST", "https://hooks.zapier.com/hooks/catch/2486348/rixkal/");
                      xhr.send(JSON.stringify({data: this.newTodo}));
                      console.log("Pushed to Zapier successfully!");
                    } catch(e) {
                      console.error(e);
                    }
                    this.newTodo = ''

                  },
                  completedTodo: function (todo) {
                    if (!todo.completed) {
                      todosRef.child(todo['.key']).child('completed').set(false)
                    } else {
                      todosRef.child(todo['.key']).child('completed').set(true)
                    }
                  },

                  removeTodo: function (todo) {
                    if(confirm('Êtes-vous sûr de vouloir supprimer la tâche "' +  todo.title  + '" ?')) {
                      /*var index = this.todos.indexOf(todo)
                      this.todos.splice(index, 1)*/
                      todosRef.child(todo['.key']).remove()
                    } else {
                      return false
                    }
                  },

                  editTodo: function (todo) {
                    this.beforeEditCache = todo.title
                    this.editedTodo = todo
                  },

                  doneEdit: function (todo) {
                    if (!this.editedTodo) {
                      return
                    }
                    this.editedTodo = null
                    todo.title = todo.title.trim()
                    todosRef.child(todo['.key']).child('title').set(todo.title)
                    if (!todo.title) {
                      this.removeTodo(todo)
                      todosRef.child(todo['.key']).remove()
                    }
                  },

                  cancelEdit: function (todo) {
                    this.editedTodo = null
                    todo.title = this.beforeEditCache
                  },

                  removeCompleted: function (todos) {
                    if(confirm("Êtes-vous sûr de vouloir supprimer les tâches terminées ?")) {

                      var refi = firebase.database().ref('todo');
                      refi.orderByChild('completed').equalTo(true).once('value', snapshot => {
                           var updates = {};
                           snapshot.forEach(child => updates[child.key] = null);
                           refi.update(updates);
                      });
                    } else {
                      return false
                    }
                  },

                  reOrder: function (oldIndex, newIndex) {
                    var movedItem = this.todos.splice(oldIndex, 1)[0]
                    this.todos.splice(newIndex, 0, movedItem)

                    /*function printSnapshot(todo) {
                        todo.forEach(function(snapshot) {
                            console.log(snapshot.val().title);
                        });
                    }*/

                    var query = todosRef.orderByChild('title');
                    query.on('child_added', function(snap) {
                      var number = snap.val();
                      console.log(number.title);
                    });
                  }
                },

                // a custom directive to wait for the DOM to be updated
                // before focusing on the input field.
                // drag & drop
                // http://vuejs.org/guide/custom-directive.html
                directives: {
                  'todo-focus': function (el, binding) {
                    if (binding.value) {
                      el.focus()
                    }
                  },

                  'sortable': {
                      inserted: function (el, binding) {
                        var sortable = new Sortable(el, binding.value || {});
                      }
                  }

                }
              })

              // handle routing
              /*function onHashChange () {
                var visibility = window.location.hash.replace(/#\/?/, '')
                if (filters[visibility]) {
                  app.visibility = visibility
                } else {
                  window.location.hash = ''
                  app.visibility = 'all'
                }
              }

              window.addEventListener('hashchange', onHashChange)
              onHashChange()*/


              // mount
              app.$mount('.todoapp')


              $(document).ready(function($) {

                  setTimeout(function(){
                  document.title = document.getElementById('noti').innerHTML + ' Tâches';
                  document.getElementById('pageh1').innerHTML = "Tâches"

                  if (document.getElementById('noti').innerHTML < 2) {
                    document.title = document.getElementById('noti').innerHTML + ' Tâche';
                    document.getElementById('pageh1').innerHTML = "Tâche"
                    document.getElementById('noti').style.left = "72.7%"
                  }

                  var firstChild = $('body').children().first().attr('id');
                  if (firstChild == "cap-wrap-not-logged") {
                    comexposiumCap.openCap("login");
                  }

                }, 1000)

              var sonde = setTimeout(function(){
              var theFirstChild = $('body').children().first();
              var firstChild = $('body').children().first().attr('id');

              if (firstChild == "cap-wrap-logged") {
                $('#monApp').fadeIn(500);
              }
              if (firstChild == "cap-wrap-not-logged") {
                $('#monApp').fadeOut(500);
              }
            }, 3000)


            var theFirstChild = $('body').children().first();
            $(theFirstChild).change(function(event) {
              sonde
            });


            $('*').click(function(event) {
              /* Act on the event */
              setTimeout(function(){
                var theFirstChild = $('body').children().first();
                var firstChild = $('body').children().first().attr('id');

                if (firstChild == "cap-wrap-logged") {
                  $('#monApp').fadeIn(500);
                }
                if (firstChild == "cap-wrap-not-logged") {
                  $('#monApp').fadeOut(500);
                }
              }, 3000)

            });

            setTimeout(function(){
              $('<iframe src="https://redmine.comexposium-portail.com/my/page" style="width: 100%; height: 765px;" frameborder="0" scrolling="no" id="myFrame"></iframe>')
       .appendTo('#my-selection > div');

       $('<iframe src="https://jira.kaliop.net/secure/Dashboard.jspa" style="width: 100%; height: 765px;" frameborder="0" scrolling="no" id="myFrame"></iframe>')
.appendTo('#dashboard > p');

      $('<iframe src="https://www.cms-cxpm.com/" style="width: 100%; height: 181em;" frameborder="0" scrolling="no" id="myFrame"></iframe>')
      .appendTo('#newsletter > p');

      $('head').append('<style>#cap-nav > ul > li:nth-child(2) > a > div.cap-nav-icon.socialicon-stackoverflow:before{content: url("https://jira.kaliop.net/s/-5i1z66/72009/6184c9d3cf573ee06571ad8041c786aa/_/jira-logo-scaled.png")}</style>');

      $('head').append('<style>#cap-nav > ul > li:nth-child(3) > a > div.cap-nav-icon.socialicon-appleinc:before{content: url("http://www.auplod.com/u/odulap9db43.png")}</style>');

      $('head').append('<style>#cap-nav > ul > li:nth-child(1) > a > div.cap-nav-icon.icon-user-circle-o:before{content: url("http://i.picresize.com/images/2017/09/28/JpWfV.png")}</style>');

      $('head').append('<style>#cap-nav > ul > li:nth-child(4) > a > div.cap-nav-icon.socialicon-stackoverflow:before{content: url("http://i.picresize.com/images/2017/09/28/zWGPl.png")}</style>');

     }, 2000);

     $("#register > form").submit(function(event) {
       /* Act on the event */
       var emaildata = $("#register > form > div.validate-field-wrapper > input").val();
       try {
         var xhr = new XMLHttpRequest();
         xhr.open("POST", "https://hooks.zapier.com/hooks/catch/2486348/iyjhjg/");
         xhr.send(JSON.stringify({data: emaildata}));
         console.log("Pushed to Zapier successfully!");
       } catch(e) {
         console.error(e);
       }
     });

              });

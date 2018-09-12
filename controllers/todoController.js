var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// Connect to the database
mongoose.connect('mongodb://test:test123@ds151382.mlab.com:51382/todo');

// Create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
  item: String
});
// Model
var Todo = mongoose.model('Todo', todoSchema);

// var itemOne = Todo({item: 'buy flowers'}).save(function(err){
//   if (err) throw err;
//   console.log('item saved');
// });

// var data = [{item: 'Get milk'}, {item: 'Complete assignment'}, {item: 'Do some Coding'}];
var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function(app) {

app.get('/todo', function(req, res){
  // get data from mongoDb and pass it to the view
  Todo.find({}, function(err, data){
    if(err) throw err;
    res.render('todo', {todos: data});
  })

});

app.post('/todo', urlencodedParser, function(req, res){
  // get data from the view and add it to mongoDb
  var newTodo = Todo(req.body).save(function(err, data){
    if (err) throw err;
    res.json({todos: data});
  });
});

app.delete('/todo/:item', function(req, res){
  // delete the requested item from mongodb
  Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
    if (err) throw err;
    res.json(data);
  });
});
};

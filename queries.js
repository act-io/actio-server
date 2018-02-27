const promise = require('bluebird');

const options = {
  // Initialization Options
  promiseLib: promise
};
const pgp = require('pg-promise')(options);
const DATABASE = process.env.DATABASE_URL || 'postgres://:@localhost/actio';
const db = pgp(DATABASE);

function getAllUser(req, res, next) {
    db.any('select * from users')
      .then(function (data) {
        res.status(200)
          .json({
            status: 'success',
            data: data,
            message: 'Retrieved ALL users'
          });
      })
      .catch(function (err) {
        return next(err);
      });
  }

function postInUser(req, res, next) {
    const data = req.body;
    db.none("INSERT INTO users (name, age, username, password) VALUES ($1, $2, $3, $4)", [data.name, data.age, data.username, data.password])
      .then(posts => {
        res.redirect(req.get('referer'));
    })
      .catch(error => {
       res.send(`<p>Gat ekki bætt gögnum við: ${error}</p>`);
      });
}

function login(req, res, next) {
  const body = req.body;
  db.any('select username,password from users')
    .then(function (data){
      res.status(200)
        .json({
          data: data
        });
        console.log("data: " + data)
        for (i in data)
        {
          console.log(body.username);
          console.log(body.password);
          console.log(data.username);
          console.log(data.username); 
          console.log('-----------');
          
          if(body.username === data.username && body.password === data.password)
            res.send({status: true});
        } 
    })
    .catch(function (err){
      return next(err);
    });
}


module.exports = {
    getAllUser: getAllUser,
    postInUser: postInUser,
    login: login,
  };
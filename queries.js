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
    const test = req.body;
    console.log(test);
    console.log("virkar?");

    //db.none("INSERT INTO user (username, email, password, birthDate, interests) VALUES ($1, $2, $3, $4, $5)", [name, data, gName])
     // .then(posts => {
      //  res.redirect(req.get('referer'));
    //})
     // .catch(error => {
      // res.send(`<p>Gat ekki bætt gögnum við: ${error}</p>`);
      //});
}


module.exports = {
    getAllUser: getAllUser,
    postInUser: postInUser,

  };
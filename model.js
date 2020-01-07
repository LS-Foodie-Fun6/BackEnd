const db = require('./data/db-config.js')

module.exports = {
  getAll,
  findBy,
  findById,
  findByName,
  findByRestId,
  findByUsername,
  add
}

//all
function getAll(data){
  return db(data)
}

function findById(data, id){
  return db(data)
  .where({ id })
  .first()
}

function findBy(data, filter){
  return db(data).where(filter)
}

function add(data, x){
  return db(data)
  .insert(x,'id')
  .then(ids => {
    const [id] = ids
    return findById(data, id)
  })
}


//users
function findByUsername(username){
  return db('users')
  .where( username )
  .first()
}

//restautants
function findByName(name){
  return db('restaurants')
  .where({ name })
  // .first()
}

///reviews
function findByRestId(restaurant_id){
  return db('reviews')
  .where({ restaurant_id })
}

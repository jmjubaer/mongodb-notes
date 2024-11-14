// filtering by field ====================================================

db.collectionName.find({fieldName: fieldValue})

// Field filtering===============================================
// for get the specific field value we can use field filtering. its like graphql.

db.collectionName.find({age:21},{email:1,gender: 1, age: 1}) // we can use empty {} when we don't meed any filtering.
db.collectionName.findOne({age:21},{email:1,gender: 1, age: 1})

// this is another option to field filtering. But we can't use this with findOne method
db.collectionName.find({}).project({email:1,gender: 1, age: 1})


// Query Operators like graphql ====================================================
db.collectionName.find({age: {$eq: 30}})
db.collectionName.findOne({age: {$eq: 30}})

// Comparison Query Operators. like graphql.


$eq // equal
$ne // not equal
$gt // greater than
$gt // greater than
$gte // greater than equal
$lt // less than 
$lte // less than equal

// We can write multiple queries separating them by commas its call implicit and

db.collectionName.find({gender: "Female",age: {$gt: 18,$lt: 30}}) // implicit and.


$in // $in operator

db.collectionName.find({email:{$in: ["mdangl1@odnoklassniki.ru","omirfin2@i2i.jp"] }}) // its return those values which match with the in parameter pass value. There we can get if one value matches or multiple values match with the data.

$nin // not $in operator

db.collectionName.find({email:{$in: ["mdangl1@odnoklassniki.ru","omirfin2@i2i.jp"] }}) // its return those values which not match with the in parameter pass value. This remove if one value matches or multiple values match with the data.
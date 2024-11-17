// filtering by field ====================================================

db.collectionName.find({ fieldName: fieldValue });

// Field filtering===============================================
// for get the specific field value we can use field filtering. its like graphql.

db.collectionName.find({ age: 21 }, { email: 1, gender: 1, age: 1 }); // we can use empty {} when we don't meed any filtering.
db.collectionName.findOne({ age: 21 }, { email: 1, gender: 1, age: 1 });

// this is another option to field filtering. But we can't use this with findOne method
db.collectionName.find({}).project({ email: 1, gender: 1, age: 1 });

// Query Operators like graphql ====================================================
db.collectionName.find({ age: { $eq: 30 } });
db.collectionName.findOne({ age: { $eq: 30 } });

// Comparison Query Operators. like graphql.

$eq; // equal
$ne; // not equal
$gt; // greater than
$gt; // greater than
$gte; // greater than equal
$lt; // less than
$lte; // less than equal

// We can write multiple queries separating them by commas its call implicit and
// implicit and
db.collectionName.find({ gender: "Female", age: { $gt: 18, $lt: 30 } }); // implicit and.

$in; // $in operator
// implicit or
db.collectionName.find({
    email: { $in: ["mdangl1@odnoklassniki.ru", "omirfin2@i2i.jp"] },
}); // its return those data which match with the in parameter pass value. There we can get if one value matches or multiple values match with the data.

$nin; // not $in operator

db.collectionName.find({
    email: { $in: ["mdangl1@odnoklassniki.ru", "omirfin2@i2i.jp"] },
}); // its return those data which not match with the in parameter pass value. This remove if one value matches or multiple values match with the data.

// logical $and or explicit and

$and; // logical and
// There return only those data which the all filters condition.
db.collectionName.find({
    $and: [
        { "skills.name": "JAVASCRIPT" }, // we can access array of objects or objects data by using "." but we need to use "" quotation.
        { "skills.name": "PYTHON" },
        { "skills.level": "Expert" },
    ],
});

// logical $or or explicit or

$or; // logical or
// if there match any one condition or multiple conditions match its return those data.
db.collectionName.find({
    $or: [
        { "skills.name": "JAVASCRIPT" },
        { "skills.name": "PYTHON" },
        { "skills.level": "Expert" },
    ],
});

$not; // logical not

// its remove those data which are match the conditions.
db.collectionName.find({ age: { $not: { $eq: 21 } } });

$nor; // logical not
// its remove those data which are match the all conditions
db.collectionName.find({
    $nor: [{ age: { $gt: 18 } }, { "skills.name": "JAVASCRIPT" }],
});

$exists; // is exists this field

// its return those data which are exists this field or not exists this field (true,false.
db.collectionName.find({ age: { $exists: true } }); // true or false
db.collectionName.find({ age: { $exists: false } }); // true or false

$type; // type of this field
// its return those data which are the define filed type is match.
db.collectionName.find({ company: { $type: "null" } }); // use quote for define type.

$size; // check array length
// its a array operator. it returns those data which the define field length is match.
db.collectionName.find({ skills: { $size: 5 } });

// Match the field with position in array
// This condition matches the field exactly. its means its return those data which define field is match fully with position.
db.collectionName.find({ interests: ["Cooking", "Writing", "Reading"] });

// Match the field with position in object
// This condition matches the field exactly. its means its return those data which define field is match fully with position.
db.collectionName.find({
    skills: {
        name: "JAVASCRIPT",
        level: "Expert",
        isLearning: false,
    },
});

$all; // all operator, array operator
// this operator matches the field data without position. its return those data which define field data is match not the data position match.
db.test.find({ interests: { $all: ["Cooking", "Writing", "Reading"] } });

$elemMatch; // $elemMatch operator array of object operator
// this operator matches the field data without position. its return those data which define field data is match not the data position match.
db.test.find({
    skills: {
        $elemMatch: {
            level: "Expert",
            name: "JAVASCRIPT",
            isLearning: false,
        },
    },
});

// MongoDB update operator
$set; // $set operator or primitive operator
// this operator update the hole filed data. this is use full for primitive data
db.test.updateOne(
    {
        _id: ObjectId("6406ad63fc13ae5a40000065"),
    },
    {
        $set: {
            age: 25,
        },
    }
);

$addToSet; // $addToSet operator or non-primitive operator
// its update the specific filled with not overrid or not remove the previous data. its not push multiple data in a field.

db.test.updateOne(
    {
        _id: ObjectId("6406ad63fc13ae5a40000065"),
    },
    {
        $addToSet: {
            interests: "Driving",
        },
    }
);

$each; // $each method
// For adding multiple data by updating at a time.
db.test.updateOne(
    {
        _id: ObjectId("6406ad63fc13ae5a40000065"),
    },
    {
        $addToSet: {
            interests: {
                $each: ["Learing", "Farming"],
            },
        },
    }
);

$push; // $each method
// For pushing multiple data by updating at a time. its can push the same data multiple times.
db.test.updateOne(
    {
        _id: ObjectId("6406ad63fc13ae5a40000065"),
    },
    {
        $push: {
            interests: {
                $each: ["Learing", "Farming"],
            },
        },
    }
);

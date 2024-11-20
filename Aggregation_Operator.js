// aggregation
$match // for filtering
$project // for getting the specific data field like graphGL.
$addFields // for adding new fields into the results not in main data.
$out // for creating a new collection by applying the aggregation pipeline filter and more configuration
$push // for push the the field into the existing collection.
$group // for create group by filter specific field

db.test.aggregate([
    // we can use same stage multiple time. but its time delay

    { $match: { gender: "Female", age: { $gt: 15 } } }, // filtering stage

    { $addFields: { course: "level 2" } }, // its add the fields in the result not in main data.

    { $project: { name: 1, age: 1, gender: 1, course: 1 } }, // always we write the $project at last stage because it's filter the fields

    // pass collection name
    { $out: "course_students" }, // This is a last stage method. This create a new collection by using the documents data.

    // pass collection name
    { $merge: "test" }, //This is a last stage method. Merge the new fields into the existing collection.
]);


// here $ is very important because its define the data field.
$group // for create group by filter specific field
$sum // for getting the quantity how many data has in a group
$push // for passing the data into the return data.
$$ROOT // for getting the all data into the return data.

db.test.aggregate([
    {
        $group: { // for create group.
            _id: "$age", // The id of the filter method
            count: { $sum: 1 }, // for get the how data has a group
            // mainData: { $push: "$name" }, // for get the specific data field
            mainData: { $push: "$$ROOT" }, // for get full data
        },
    },
]).project({"mainData.name": 1}); // we can also use here project for get the specific data field from the document.

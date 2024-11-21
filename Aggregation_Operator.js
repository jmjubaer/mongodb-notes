// aggregation
$match; // for filtering
$project; // for getting the specific data field like graphGL.
$addFields; // for adding new fields into the results not in main data.
$out; // for creating a new collection by applying the aggregation pipeline filter and more configuration
$push; // for push the the field into the existing collection.
$group; // for create group by filter specific field

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

// "$" Reference operator. Here $ is very important because its refer the data field.
$group; // for create group by filter specific field
$sum; // for getting the quantity how many data has in a group
$push; // for passing the data into the return data.
$$ROOT; // for getting the all data into the return data.

db.test
    .aggregate([
        {
            $group: {
                // for create group.
                _id: "$age", // The id of the filter method
                count: { $sum: 1 }, // for get the how data has a group
                // mainData: { $push: "$name" }, // for get the specific data field
                mainData: { $push: "$$ROOT" }, // for get full data
            },
        },
    ])
    .project({ "mainData.name": 1 }); // we can also use here project for get the specific data field from the document.

$sum; // for accumulate
$min; // for minimum
$max; // for maximum
$avg; // for average
$subtract; // for subtract or minus.

db.test.aggregate([
    {
        $group: {
            _id: null, // if i use _id is null its means its a group.
            totalSalary: { $sum: "$salary" }, // if we use 1 its means its accumulated 1 for per data. if we define any field by "$" its accumulated this field value.
            maxSalary: { $max: "$salary" }, // its return the maximum value
            minSalary: { $min: "$salary" }, // its return the minimum value
            avgSalary: { $avg: "$salary" }, // its return the average value
        },
    },
    {
        $project: {
            totalSalary: 1,
            minSalary: 1,
            maxSalary: 1,
            averageSalary: "$avgSalary", // we can rename any field by refer the this field by "$".
            salaryDif: { $subtract: ["$maxSalary", "$minSalary"] }, // we can calculate anything in project method.
        },
    },
]);

// we can not make group base on any array type data, we need to unwind the array element.
$unwind; // for unwind the array type data.
db.test.aggregate([
    {
        $unwind: "$interests", // make multiple data by divide the array element.
    },

    {
        $group: {
            _id: "$age",
            interests: { $push: "$interests" }, // we can get total interest for per age group.
        },
    },
]);

$bucket; // $bucket operator for make buckets by different different boundaries
$sort; // for sorting
$limit; // for limit
db.test.aggregate([
    // stage 1
    {
        $bucket: {
            // for make buckets by different different boundaries
            groupBy: "$age", // define which field use to make buckets.
            boundaries: [20, 40, 60, 80], // define boundaries
            default: "remaining", // define remaining variable name
            output: {
                // define which are you want to output or return
                count: { $sum: 1 }, // we can accumulate the count
                name: { $push: "$name" }, // push the data in return
            },
        },
    },
    // stage 2
    {
        $sort: { count: 1 }, // sorting 1 for ascending -1 descending
    },
    // stage 3
    {
        $limit: 2, // limit the number of data to be returned.
    },
]);

$facet // for use multiple pipeline
// we use multiple pipeline by using the facet operator. we can make a report base on different different fields.
db.test.aggregate([
    {
        $facet: { // for multi pipeline create

            // pipeline - 1
            "friendsCount": [ // give a variable name there return the results
                // stage -1
                { $unwind: "$friends" },
                // stage - 2
                {
                    $group: { _id: "$friends", count: { $sum: 1 } },
                },
            ],

            // pipeline - 2
            "interestsCount": [// give a variable name there return the results
                //stage - 1
                {
                    $unwind: "$interests",
                },
                {
                    $group: { _id: "$interests", count: { $sum: 1 } },
                },
            ],

            // pipeline - 3
            "skillsCount": [// give a variable name there return the results
                //stage - 1
                {
                    $unwind: "$skills",
                },
                // stage - 2
                {
                    $group: { _id: "$skills", count: { $sum: 1 } },
                },
            ],
        },
    },
]);


$lookup // for get data from another collection.
db.orders.aggregate([
    {
        $lookup: {
               from: "test", // the collection name where want to get data.
               localField: "userId", // current collection field name.
               foreignField: "_id", // the another collection field name.
               as: "userInfo" // the data variable name.
             }
    }
    ])


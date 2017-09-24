exports.loadIndex = (req, res, next) => {
    console.log('inside / of appRoutes.js');
    res.render('index');
};

exports.homeLoad = (req, res, next) => {
/*    console.log("inside the homeload function");
    Jobs.find({})
        .sort({createdAt: -1})
        // .limit(10)
        .populate("employer")
        .exec(function(error, doc){
            // console.log(JSON.stringify(doc, null, "\t"))
            res.status(200).json({
                message: 'Success',
                jobs: doc
            })
        });*/
};
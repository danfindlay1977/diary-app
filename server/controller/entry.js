const Entry = require("../model/Entry");
// add a new entry
// POST /api/entry/create
exports.createEntry = async (req,res,next) => { 
    const {title , topic , entry} = req.body
    let entryStr = entry
    // remove unwated text
    entryStr = entryStr.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"");
    const wordCount =  entryStr.trim().split(" ").length
    const newEntry = new Entry({
        title,
        topic,
        entry,
        userId: req.userId,
        wordCount

    }) 
    try{
        const result = await newEntry.save()
        res.status(201).send({
            message: "entery added",
            entry: result
        })

    }
    catch(e) {
        if(!e.statusCode) {
            e.statusCode = 500
            }
         next(e); 
    }
}

// fetch all entries 
// GET /api/entries/fetch
exports.fetchEntries = async (req , res, next ) => {
    let query;
    // pagenation options
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * pageSize;
    const total = await Entry.countDocuments();

    const pages = Math.ceil(total / pageSize);

    // check the page requested is not greater then the number of pages
    if(page > pages) {
        return res.json({
            status: "failer",
            msg: "no pages found"
        })
    }
    let uiValues = {
        sort: {},
        filtering: {}
    }
        const reqQuery = {...req.query}
        const removeFiels = ["sort", "page", "limit"]
        removeFiels.forEach(val => delete reqQuery[val])
        const filterKeys = Object.keys(reqQuery)
        const filterVaulues = Object.values(reqQuery)
        filterKeys.forEach((val , index) => uiValues.filtering[val] = filterVaulues[index])
        let queryStr = JSON.stringify(reqQuery)
        queryStr = queryStr.replace(
            /\b(gt|gte|lt|lte|in)\b/g,
            (match) => `$${match}`
          );
          console.log(queryStr)
          queryStr = JSON.parse(queryStr)
          queryStr.userId = req.userId
            query = Entry.find(queryStr).populate("userId").skip(skip).limit(pageSize)
            if(req.query.sort) {
                const sortArr = req.query.sort.split(",")
                const sortSrt = sortArr.join(" ")
                query = query.sort(sortSrt)
            }
            else{
                query = query.sort("-updatedAt")
            }
    

   
    try{
        const entries = await query
        res.status(200).json({
            status: "susccses",
            entries,
            count: entries.length,
            page,
            pages
        })
    }
    catch(e) {
        if(!e.statusCode) {
            e.statusCode = 500
            }
         next(e); 
    }
    
}

// delete an entry
// DELETE /api/entries/delete/:id
exports.deleteEntries = async (req,res,next) => {
    try{
        const id = req.params.id
        const count = await Entry.deleteOne({_id: id })
        res.json({count})
    }
    catch(e) {
        if(!e.statusCode) {
            e.statusCode = 500
            }
         next(e);  
    }
}
// PUT /api/entries/update/:id
// update entry
exports.updateEntry = async (req,res,next) => {
    try{
        const id = req.params.id
        const {title, topic, entry} = req.body
        const singleEntry = await Entry.findById(id)
        singleEntry.title = title
        singleEntry.topic = topic
        singleEntry.entry = entry
        const updateEntry = await singleEntry.save()
        res.status(200).json({
            updateEntry,
            msg: "entry has been updated"
        })

    }
    catch(e) {
        if(!e.statusCode) {
            e.statusCode = 500
            }
         next(e);  

    }
}
exports.searchEntry = async (req ,res, next) => {
    console.log(req.query)
    const search = req.query.search.replace("+", " ")
    const query = {
        userId: req.userId,
        topic: new RegExp(search, "i")
    }
    const entry = await Entry.find(query).populate("userId")
    console.log(entry)

    res.status(200).json({
        data: entry
    })
}
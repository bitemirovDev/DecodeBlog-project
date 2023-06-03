
const comments = require('./comments')

const saveComment = async(req, res) =>{
    if(req.body.authorID && req.body.blogID)
    await new comments({
        comment: req.body.comment,
        authorID: req.body.authorID,
        blogID: req.body.blogID,
    }).save()
    res.status(200).send(true)
}

module.exports = {saveComment}
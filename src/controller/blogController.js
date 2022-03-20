const moment = require("moment")
const blogModel = require("../model/blogModel")
const authorModel = require("../model/authorModel")
 
const createBlog = async (req, res) => {
    try{
        const data = req.body;
        const {authorId} = req.body
        const author = await authorModel.findById(authorId)
        if (!author){
            return res.status(400).send({status: false, msg: "author does not exist"})
        }
        const blog = await blogModel.create(data)
        res.status(201).send({status: true, data: blog})
    }catch(e){
        res.status(400).send({status: false, msg: e.message})
    }
}


const getBlog = async (req, res) => {
    try{
        const data = req.query;
        const filter = {
            isDeleted: false, 
            isPublished: true,
            ...data
        }
        
        const blog = await blogModel.find(filter)
        if (blog.length == 0){
            return res.status(400).send({status: false, msg: "no blogs published"}) 
        }
        return res.status(201).send({status: true, data: blog})
    }catch(e){
        res.status(400).send({status: false, msg: e.message})
    }
}


const updateBlog = async (req, res) => {
    try{
        const id = req.params.blogId
        const data = req.body
        
        const blog = await blogModel.findOne({_id: id})
      
        if (!blog){
            return res.send({status: false, Err: "blog not found"})
        }
        if (blog.isDeleted == true){
            return res.status(400).send({status: false, msg: "this blog is deleted"})
        }
        if (data.isPublished == true){
            data.publishedAt = moment().format()
        }else{
            data.publishedAt = " "
        }
        if (data.isDeleted){
            data.deletedAt = moment().format()
        }
        
        const updatedBlog = await blogModel.findOneAndUpdate({_id: id}, data, {new: true})
        return res.status(201).send({status: true, msg: updatedBlog})
    }catch(e){
        res.status(400).send({status: false, msg: e.message})
    }
}



const deleteBlogById = async (req, res) => {
    try{
        const id = req.params.blogId;
        const blog = await blogModel.findOne({_id: id})
        if (!blog){
            return res.status(400).send({Err: "blog not found"})
        }
        if (blog.isDeleted == true){
            return res.status(400).send({status: false, msg: "this blog is already deleted"})
        }
        
        
        const deletedBlog = await blogModel.findOneAndUpdate({_id: id}, {isDeleted: true, deletedAt: moment().format()}, {new: true})
        return res.status(201).send({status: true, msg: deletedBlog})
    }catch(e){
        res.status(400).send({status: false, msg: e.message})
    }
}


 
const deleteBlogBykey = async (req, res) => {
    try{
        const data = req.query
        const blog = await blogModel.findOne(data)
        if (!blog){
            return res.status(400).send({Err: "blog not found"})
        }
        if (blog.isDeleted == true){
            return res.status(400).send({status: false, msg: "this blog is already deleted"})
        }
        
        
        const deletedBlog = await blogModel.findOneAndUpdate(data, {isDeleted: true, deletedAt: moment().format()}, {new: true})
        return res.status(201).send({status: true, msg: deletedBlog})
    }catch(e){
        res.status(400).send({status: false, msg: e.message})
    }
}

module.exports.createBlog = createBlog;
module.exports.getBlog = getBlog
module.exports.updateBlog = updateBlog
module.exports.deleteBlogById = deleteBlogById
module.exports.deleteBlogBykey = deleteBlogBykey

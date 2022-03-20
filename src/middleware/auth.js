//const jwt = require("jsonwebtoken")
const blogModel = require("../model/blogModel")
const authorModel = require("../model/authorModel")
const jwt = require("jsonwebtoken");

const authentication = (req, res, next) => {
    const token = req.headers["x-api-key"]
    if (!token){
        return res.status(404).send({status: false, msg: " your important header is missing"})
    }
    try{
        const decodeedToken = jwt.verify(token, "projectOne")
        
    }catch{
        return res.status(400).send({status: false, msg: "This token is not valid"})
    }
    next()
}

const authroisation1 = async (req, res, next) => {
    const token = req.headers["x-api-key"]
    if (!token){
        return res.status(404).send({status: false, msg: "important header is missing"})
    }
    const data = req.params
    
    try{
        const blog = await blogModel.findById(data.blogId)
        
        const decodeedToken = jwt.verify(token, "projectOne")
        if(decodeedToken.id == blog.authorId){
            next()
        }else{
            return res.status(404).send({status: false, msg: "you are not autherize to do changes in this blog"})
        }
       
    }catch(e){
        return res.status(400).send({status: false, msg: e.message})
    }
}

const authroisation2 = async (req, res, next) => {
    const token = req.headers["x-api-key"]
    if (!token){
        return res.status(404).send({status: false, msg: "important header is missing"})
    }
    const data = req.query
    
    try{
        const blog = await blogModel.findOne(data)
       
        const decodeedToken = jwt.verify(token, "projectOne")
        if(decodeedToken.id == blog.authorId){
            next()
        }else{
            return res.status(404).send({status: false, msg: "you are not autherize to do changes in this blog"})
        }
        
    }catch(e){
        return res.status(400).send({status: false, msg: e.message})
    }
}

module.exports.authentication = authentication
module.exports.authroisation1 = authroisation1
module.exports.authroisation2 = authroisation2

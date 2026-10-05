const blogmodel = require("./../model/blogmodel");


// CREATE BLOG
const createBlog = async (req, res) => {
    try {
        let data = req.body;
       
        // Multer image
        if (req.file) {
            data.image = `/uploads/${req.file.filename}`;
        }

        const blog = await blogmodel.create(data);

        res.status(200).json({
            success: true,
            message: "Create Blog",
            data: blog
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// GET ALL BLOGS
const getBlogs = async (req, res) => {
    try {

        const blogs = await blogmodel.find();

        res.status(200).json({
            success: true,
            Count: blogs.length,
            data: blogs
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// GET SINGLE BLOG
const getBlog = async (req, res) => {
    try {

        let id = req.params.id;

        const blog = await blogmodel.findOne({
            _id: id
        });

        res.status(200).json({
            success: true,
            data: blog
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// UPDATE BLOG
const updateBlog = async (req, res) => {
    try {

        let id = req.params.id;

        let data = req.body;

        // New image
        if (req.file) {
            data.image = `/uploads/${req.file.filename}`;
        }

        const blog = await blogmodel.updateOne(
            { _id: id },
            data
        );

        res.status(200).json({
            success: true,
            message: "Update Blog",
            data: blog
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


// DELETE BLOG
const deleteBlog = async (req, res) => {
    try {

        let id = req.params.id;

        const blog = await blogmodel.deleteOne({
            _id: id
        });

        res.status(200).json({
            success: true,
            message: "Delete Blog",
            data: blog
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


module.exports = {
    createBlog,
    getBlogs,
    getBlog,
    updateBlog,
    deleteBlog
};
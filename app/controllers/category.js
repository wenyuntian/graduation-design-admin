const _ = require('underscore');
const Category= require('../models/category');

module.exports = {

    add: (req, res) => {
        const category = req.body.category;
        const categoryId = category.id;

        if(categoryId != null) {
            
            Category.update({_id: categoryId}, category, (error, category) => {
                if(error) {
                    console.log(error)
                    return res.send({status: 1002, information: '数据库出错'});
                }
                res.send({status: 1000, information: '分类更新成功', category: category})
            })
        } else {
            const _category = new Category(category)
            _category.save((error, category) => {
                if(error) {
                    console.log(error)
                    return res.send({status: 1002, information: '数据库出错'});
                }
                res.send({status: 1000, information: '分类录入成功', category: category})
            })
        } 
    },

    list: (req, res) => {
        Category.find((error, categoryList) => {
            if(error) {
                console.log("error");
                return res.send({status: 1002, information: '数据库出错'});
            }
            res.send({status: 1000, information: null, categoryList: categoryList});
        });
    },

    delete: (req, res) => {
        const categoryId = req.body.id;

        if(categoryId != null && categoryId !== "") {
            Category.deleteOne({ _id: categoryId }, (error) => {
                if(error) {
                    console.log("error");
                    return res.send({status: 1002, information: '数据库出错'});
                }
                return res.send({status: 1000, information: '删除成功'});
            })
        }
        else {
            res.send({status: 1002, information: '系统错误'});
        }
    }
}
const _ = require('underscore');
const Article= require('../models/article');
const Category= require('../models/category');

module.exports = {

    add: (req, res) => {
        const article = req.body.article;
        const articleId = article.id;

        if(articleId != null) {
            
            Article.update({_id: articleId}, article, (error, article) => {
                if(error) {
                    return res.send({status: 1002, information: '数据库出错'});
                }
                res.send({status: 1000, information: '文章更新成功', articleId: articleId})
            })
        } else {
            const _article = new Article(article)
            _article.save((error, article) => {
                if(error) {
                    console.log("error");
                    return res.send({status: 1002, information: '数据库出错'});
                }
                res.send({status: 1000, information: '文章录入成功', articleId: article.id})
            })
        }  
    },

    getArticleClassification: (req, res) => {
        Article.find({}, (error, allArticle) => {
            if(error) {
                console.log("error");
                return res.send({status: 1002, information: '数据库出错'});
            }

            res.send({status: 1000, information: null, allArticle: allArticle});
        })
    },

    getCategoryArticleCount: async (req, res) => {
        const categoryArticleCount = [];
        Category.find({})
                .then((categoryList) => {
                    const promises = categoryList.map((item) => {
                        categoryArticleCount.push({category: item.name})
                        return Article.countDocuments({category: item.name})
                    })
                    return Promise.all(promises);
                }).then((countArray) => {
                    const CategoryArticleCount = categoryArticleCount.map((item, index) => {
                        return {
                            count: countArray[index],
                            ...item
                        }
                    })

                    res.send({status: 1000, information: '成功', categoryArticleCount: CategoryArticleCount})
                }).catch((error) => {
                    console.log("error");
                    return res.send({status: 1002, information: '数据库出错'});
                })
    },

    delete: (req, res) => {
        const ids = req.body.ids;
        Article.deleteMany({_id: {$in: ids}}, (error, articles) => {
            if(error) {
                console.log("error");
                return res.send({status: 1002, information: '数据库出错'});
            }
            res.send({status: 1000, information: "删除成功"})
        })
    },

    setRecommend: (req, res) => {
        const ids = req.body.ids;
        const isRecommend = req.body.isRecommend

        Article.updateMany({_id: {$in: ids}}, {isRecommend: isRecommend},  (error, articles) => {
            if(error) {
                console.log("error");
                return res.send({status: 1002, information: '数据库出错'});
            }
            res.send({status: 1000, information: "操作成功"})
        })
    }
}
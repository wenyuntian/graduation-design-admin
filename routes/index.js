const Article = require('../app/controllers/article');
const Category = require('../app/controllers/category');
const Link = require('../app/controllers/link');
const Administrator = require('../app/controllers/administrator');
const Carousel = require('../app/controllers/carousel');

module.exports = function(app) {
  
  // 从session中取出administrator对象
  app.use(function(req, res, next) {
    var _administrator = req.session.administrator;
    var _user = req.session.user;

    app.locals.administrator = _administrator;
    app.locals.user = _user;

    next();
  })

  app.use('/api/article/add', Article.add)
  app.use('/api/article/delete', Article.delete)
  app.use('/api/article/setRecommend', Article.setRecommend)
  app.use('/api/article/getArticleClassification', Article.getArticleClassification)
  app.use('/api/article/getCategoryArticleCount', Article.getCategoryArticleCount)

  app.use('/api/category/add', Category.add)
  app.use('/api/category/list', Category.list)
  app.use('/api/category/delete', Category.delete)

  app.use('/api/link/save', Link.save)
  app.use('/api/link/delete', Link.delete)
  app.use('/api/link/list', Link.list)

  app.use('/api/administrator/update', Administrator.update)
  app.use('/api/administrator/uploadImage', Administrator.uploadImage)
  app.use('/api/administrator/getAdministratorInformation', Administrator.getAdministratorInformation)
  

  app.use('/api/carousel/update', Carousel.update)
  app.use('/api/carousel/list', Carousel.list)
}

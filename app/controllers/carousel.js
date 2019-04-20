const Carousel= require('../models/carousel');
const Utils = require('../../utils/index');

module.exports = {
    update: async (req, res) => {
        const id = req.body.id;
        
        if(id) {
            Carousel.deleteOne({_id: id}, (error, carousel) => {
                if(error) {
                    console.log(error)
                    return res.send({status: 1002, information: '数据库出错'});
                }
                res.send({status: 1000, information: '删除成功', carousel: carousel})
            })
        } else {
            const img = req.files.file;
            const uploadImagePath = Utils.uploadImage(img);

            const carousel = {
                path: uploadImagePath,
                type: req.body.type
            }
            _carousel = new Carousel(carousel);
            _carousel.save((error, carousel) => {
                if(error) {
                    console.log(error)
                    return res.send({status: 1002, information: '数据库出错'});
                }
                res.send({status: 1000, information: '上传成功', carousel: carousel})
            })
        }
    },

    list: (req, res) => {
        Carousel.find({}, (error, carouselList) => {
            if(error) {
                console.log(error)
                return res.send({status: 1002, information: '数据库出错'});
            }
            res.send({status: 1000, information: '成功', carouselList: carouselList})
        })
    }
}
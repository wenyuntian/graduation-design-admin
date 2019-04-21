const Carousel= require('../models/carousel');
const Utils = require('../../utils/index');

module.exports = {
    update: async (req, res) => {
        const id = req.body.id;
        const path = req.body.path;
        if(id) {
            Carousel.deleteOne({_id: id}, (error, carousel) => {
                if(error) {
                    console.log(error)
                    return res.send({status: 1002, information: '数据库出错'});
                }
                
                Utils.deleteImage(path)
                res.send({status: 1000, information: '删除成功', carousel: carousel})
            })
        } else {
            const img = req.files.file;
            const uploadImagePath = await Utils.uploadImage(img);

            const carousel = {
                path: uploadImagePath,
                type: req.query.type
            }
            _carousel = new Carousel(carousel);
            _carousel.save((error, carousel) => {
                if(error) {
                    console.log(error)
                    return res.send({status: 1002, information: '数据库出错'});
                }
                carousel.path = `/images/upload/${carousel.path}`
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

            carouselList = carouselList.map((item, index) => {
                return {
                    uid: -(index+1),
                    name: '轮播图',
                    url: `/images/upload/${item.path}`,
                    id: item._id,
                    type: item.type
                }
            })
            const adminCarouselList = carouselList.filter((item) => item.type === 0);
            const frontCarouselList = carouselList.filter((item) => item.type === 1);

            res.send({status: 1000, adminCarouselList: adminCarouselList, frontCarouselList: frontCarouselList})
        })
    }
}
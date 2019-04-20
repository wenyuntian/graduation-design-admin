const _ = require('underscore');
const Link= require('../models/link');

module.exports = {
    save: (req, res) => {
        const linkId = req.body.id;
        const link = {
            name: req.body.name,
            path: req.body.path
        }

        if(linkId != null) {
            
            Link.updateOne({_id: linkId}, link, (error, link) => {
                if(error) {
                    console.log(error)
                    return res.send({status: 1002, information: '数据库出错'});
                }
                res.send({status: 1000, information: '链接更新成功', link: link})
            })
        } else {
            const _link = new Link(link)
            _link.save((error, link) => {
                if(error) {
                    console.log(error)
                    return res.send({status: 1002, information: '数据库出错'});
                }
                res.send({status: 1000, information: '链接录入成功', link: link})
            })
        } 
    },

    delete: (req, res) => {
        const id = req.body.id;

        if(id != null) {
            Link.deleteOne({_id: id}, (error, result) => {
                if(error) {
                    console.log(error)
                    return res.send({status: 1002, information: '数据库出错'});
                }
                res.send({status: 1000, information: '链接删除成功', result: result})
            })
        }
    },

    list: (req, res) => {
        Link.find({}, (error, linkList) => {
            if(error) {
                console.log(error)
                return res.send({status: 1002, information: '数据库出错'});
            }
            res.send({status: 1000, information: null, linkList: linkList})
        })
    }
}
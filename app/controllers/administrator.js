const _ = require('underscore');
const Utils = require('../../utils/index'); 
const Administrator = require('../models/administrator');

module.exports = {
    update: (req, res) => {
        const id = '5cb6e8cf27702821e8558c6e';
        const administrator = req.body.administrator;
        if (id != null) {
            Administrator.update({
                _id: id
            }, administrator, (error, status) => {
                if (error) {
                    console.log(error)
                    return res.send({
                        status: 1002,
                        information: '数据库出错'
                    });
                }
                res.send({
                    status: 1000,
                    information: '信息更新成功',
                    status: status
                })
            })
        }
    },

    uploadImage: (req, res) => {
        const img = req.files.file;
        const uploadImagePath = Utils.uploadImage(img);

        Administrator.update({
            _id: '5cb6e8cf27702821e8558c6e'
        }, {image: uploadImagePath}, (error, administrator) => {
            if (error) {
                console.log(error)
                return res.send({
                    status: 1002,
                    information: '数据库出错'
                });
            }
            res.send({
                status: 1000,
                information: '信息更新成功',
                administrator: administrator
            })
        })
    },

    modifyPassword: (req, res) => {

    },

    getAdministratorInformation: (req, res) => {
        Administrator.findOne({
            _id: '5cb6e8cf27702821e8558c6e'
        }, (error, administrator) => {
            if (error) {
                console.log(error)
                return res.send({
                    status: 1002,
                    information: '数据库出错'
                });
            }
            res.send({
                status: 1000,
                information: null,
                administrator: administrator
            })
        })
    }
}
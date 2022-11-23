
const sequelize = require('../models/index');
const init_models = require('../models/init-models');
const model = init_models(sequelize);
const { sucessCode, failCode, errorCode } = require('../config/reponse');
// Post like
const like = async (req, res) => {
    try {
        let { res_id } = req.params;
        let { date_like, user_id } = req.body;
        let result = await model.like_res.create({
            user_id, res_id, date_like
        })
        sucessCode(res, result, "Like thành công!")
    } catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}
// Post unLike
const unLike = async (req, res) => {
    try {
        let { res_id } = req.params;
        let { date_like, user_id } = req.body;
        let checkLike = await model.like_res.findOne({
            where: {
                user_id
            }
        })
        if (checkLike) {
            await model.like_res.destroy({
                date_like, user_id,
                where: {
                    res_id
                },
                truncate: false
            })
            sucessCode(res, checkLike, "unLike thành công!")
        }
        else {
            failCode(res, user_id, "Chưa like ! ")
        }
    } catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}

//getLikeRes
const getLikeRes = async (req, res) => {
    try {
        let { res_id } = req.params;

        let data = await model.like_res.findAll({
            where: {
                res_id
            }
        })
        if (data != "") {
            sucessCode(res, data, "Lấy danh sách like theo nhà hàng thành công !")
        }
        else {
            failCode(res, data, "Nhà hàng này không được like !")
        }
    } catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}

// getLikeUser
const getLikeUser = async (req, res) => {
    try {
        let { user_id } = req.params;

        let data = await model.like_res.findAll({
            where: {
                user_id
            }
        })
        if (data != "") {
            sucessCode(res, data, "Lấy danh sách người dùng like nhà hàng thành công !")
        }
        else {
            failCode(res, data, "Người dùng này chưa like nhà hàng nào !")
        }
    } catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}
//post rate
const postRate = async (req, res) => {
    try {
        let { res_id } = req.params;
        let { user_id, amount, date_rate } = req.body;
        let result = await model.rate_res.create({
            user_id, amount, date_rate, res_id
        })
        sucessCode(res, result, `Đánh giá nhà hàng thành công !`)
    } catch (err) {

        errorCode(res, "Lỗi Backend")
    }
}
//getRateRes
const getRateRes = async (req, res) => {
    try {
        let { res_id } = req.params;

        let data = await model.rate_res.findAll({
            where: {
                res_id
            }
        })
        if (data != "") {
            sucessCode(res, data, "Lấy danh sách đánh giá theo nhà hàng thành công !")
        }
        else {
            failCode(res, data, "Nhà hàng này không được đánh giá !")
        }
    } catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}
//getRateUser
const getRateUser = async (req, res) => {
    try {
        let { user_id } = req.params;

        let data = await model.rate_res.findAll({
            where: {
                user_id
            }
        })
        if (data != "") {
            sucessCode(res, data, "Lấy danh sách người dùng đánh giá nhà hàng thành công !")
        }
        else {
            failCode(res, data, "Người dùng này chưa đánh giá nhà hàng nào !")
        }
    } catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}
const postOrder = async (req, res) => {
    try {
        let { food_id } = req.params;
        let { user_id, amount, code, arr_sub_id } = req.body
        let data = await model.order.create({
            user_id, amount, code, arr_sub_id, food_id

        })
        if (data != "") {
            sucessCode(res, data, "Đặt hàng thành công !")

        }
        else {
            failCode(res, data, "Đặt hàng không thành công !")
        }
    } catch (err) {
        errorCode(res, "Lỗi Backend")
    }
}
module.exports = {
    like,
    unLike,
    getLikeRes,
    getLikeUser,
    postRate,
    getRateRes,
    getRateUser,
    postOrder
}
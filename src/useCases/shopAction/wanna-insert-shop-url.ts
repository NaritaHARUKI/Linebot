import { DB, DBORM } from "../../db"
import SHOP_STATUS from "../../type/shop-status"

const wannaInsertShopURL = async (userId : string) => {
    DBORM.User.updateStatus(userId, SHOP_STATUS.third.insertShopURL)
    const messageText = 'お店のurlを登録します。あなたのお店のurlを教えてください。ない場合は「ない」と送ってください。'
    return messageText
}

export default wannaInsertShopURL
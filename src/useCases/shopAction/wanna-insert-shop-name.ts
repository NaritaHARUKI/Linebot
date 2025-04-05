import { DB, DBORM } from "../../db"
import SHOP_STATUS from "../../type/shop-status"

const wannaInsertShopName = async (userId : string) => {
    const shop = await DBORM.Shop.findOne(userId)
    if (shop)  return 'お店がすでに登録されています。'
    
    DBORM.User.updateStatus(userId, SHOP_STATUS.first.insertShopName)
    DBORM.User.insertType(userId, 'shop')
    const messageText = 'お店の名前を登録します。あなたのお店の名前を教えてください'
    return messageText
}

export default wannaInsertShopName
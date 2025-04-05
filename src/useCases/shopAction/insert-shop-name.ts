import { DBORM } from "../../db"
import SHOP_STATUS from "../../type/shop-status"

const insertShopName = async (message: string, userId: string) => {
    await DBORM.Shop.save({ name: message, userId })
    await DBORM.User.updateStatus(userId, SHOP_STATUS.second.wannaInsertShoplocate)

    const messageText = `お店の名前を「${message}」で登録しました。`
    return messageText
}

export default insertShopName
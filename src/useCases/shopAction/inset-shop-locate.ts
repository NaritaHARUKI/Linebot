import { DBORM } from "../../db"
import SHOP_STATUS from "../../type/shop-status"

const insertShopLocate = async (message: string, userId: string) => {
    DBORM.Shop.save({ locate: message })
    DBORM.User.updateStatus(userId, SHOP_STATUS.third.wannaInsertShopURL)

    const messageText = `お店の場所を「${message}」で登録しました。`
    return messageText
}

export default insertShopLocate
import { DBORM } from "../../db"
import SHOP_STATUS from "../../type/shop-status"

const insertShopUrl = async (message: string, userId: string) => {
    DBORM.Shop.save({ url: message, complete: SHOP_STATUS.complte.yes })
    DBORM.User.updateStatus(userId, SHOP_STATUS.complte.yes)

    const messageText = `お店の場所を「${message}」で登録しました。`
    return messageText
}

export default insertShopUrl
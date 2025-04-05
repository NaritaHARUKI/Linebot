import { DBORM } from "../../db"
import SHOP_STATUS from "../../type/shop-status"

const insertShopLocate = async (message: string, userId: string) => {
    DBORM.Shop.update(userId, { locate: message })
    DBORM.User.updateStatus(userId, SHOP_STATUS.third.wannaInsertShopURL)

    const messageText = `お店の場所を「${message}」で登録しました。
最後に、お店のURLを登録します。あなたのお店のURLを教えてください。`
    return messageText
}

export default insertShopLocate
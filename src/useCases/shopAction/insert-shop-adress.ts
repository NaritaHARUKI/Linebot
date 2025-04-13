import { DBORM } from "../../db"
import SHOP_STATUS from "../../type/shop-status"

const insertShopAdress = async (message: string, userId: string) => {
    DBORM.Shop.update(userId,{ adress: message, complete: SHOP_STATUS.complte.yes })
    DBORM.User.updateStatus(userId, SHOP_STATUS.complte.yes)

    const messageText = `お店の場所を「${message}」で登録しました。お店の登録が完了しました。お店の情報は「お店の情報を確認する」で確認できます。`
    return messageText
}

export default insertShopAdress
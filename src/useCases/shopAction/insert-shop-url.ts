import { DBORM } from "../../db"
import SHOP_STATUS from "../../type/shop-status"

const insertShopUrl = async (message: string, userId: string) => {
    DBORM.Shop.update(userId,{ url: message, complete: SHOP_STATUS.complte.yes })
    DBORM.User.updateStatus(userId, SHOP_STATUS.fourth.insertShopAdress)

    const messageText = `お店の場所を「${message}」で登録しました。最後にお店の住所を登録します。お店の住所は、購入したお客さんの受け取りのために使用します。お店の住所を送信して下さい。
    例）東京都渋谷区道玄坂2丁目29-5 渋谷プライム1F`
    return messageText
}

export default insertShopUrl
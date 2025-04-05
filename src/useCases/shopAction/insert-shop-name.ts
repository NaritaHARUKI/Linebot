import { DBORM } from "../../db"
import SHOP_STATUS from "../../type/shop-status"

const insertShopName = async (message: string, userId: string) => {
    await DBORM.Shop.save({ name: message, userId })
    await DBORM.User.updateStatus(userId, SHOP_STATUS.second.insertShoplocate)

    const messageText = `お店の名前を「${message}」で登録しました。
次に、お店の名前を場所を登録します。あなたのお店の場所を〇〇[都道府県]〇〇[市群]〇〇[区町村]の形式で教えてください。
例）愛知県名古屋市中川区`
    return messageText
}

export default insertShopName
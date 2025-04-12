import { DBORM } from "../../db"
import SHOP_STATUS from "../../type/shop-status"

const insertShopName = async (message: string, userId: string) => {
    await DBORM.Shop.save({ name: message, userId })
    await DBORM.User.updateStatus(userId, SHOP_STATUS.second.confirmShoplocate)

    const messageText = `お店の名前を「${message}」で登録しました。
次に、お店の最寄駅を登録します。登録したい最寄駅を入力してください。複数選択したい場合は改行して送信して下さい。
例）
名古屋
栄`
    return messageText
}

export default insertShopName
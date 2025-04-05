import { DB, DBORM } from "../../db"
import SHOP_STATUS from "../../type/shop-status"

const wannaInsertShopLocate = async (userId : string) => {
    DBORM.User.updateStatus(userId, SHOP_STATUS.third.wannaInsertShopURL)
    const messageText = `お店の名前を場所を登録します。あなたのお店の場所を〇〇[都道府県]〇〇[市群]〇〇[区町村]の形式で教えてください。
    例）愛知県名古屋市中川区`
    return messageText
}

export default wannaInsertShopLocate
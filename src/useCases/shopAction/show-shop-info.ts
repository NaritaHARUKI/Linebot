import { DBORM } from "../../db"
import SHOP_STATUS from "../../type/shop-status"

const showShopInfo = async (userId: string) => {
    const shop = await DBORM.Shop.findOne(userId)
    if (!shop) {
        DBORM.User.updateStatus(userId, SHOP_STATUS.complte.no)
        return 'お店が登録されていません。'
    }

    const messageText = `
名前:${shop.name}
場所:${shop.locate}
URL:${shop.url}
    `
    return messageText
}

export default showShopInfo
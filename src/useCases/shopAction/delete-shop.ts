import { DBORM } from "../../db"
import SHOP_STATUS from "../../type/shop-status"

const deleteShop = async (userId: string) => {
    await DBORM.Shop.delete(userId)
    await DBORM.User.updateStatus(userId, SHOP_STATUS.complte.no)

    const messageText = `削除しちゃった！😱`
    return messageText
}

export default deleteShop
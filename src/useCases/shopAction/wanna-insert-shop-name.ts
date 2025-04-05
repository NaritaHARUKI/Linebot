import { DBORM } from "../../db"

const wannaInsertShopName = async (userId : string) => {
    const shop = await DBORM.Shop.findOne(userId)
    if (shop)  return 'お店がすでに登録されています。'

    DBORM.User.initialInsert(userId, 'shop')
    const messageText = 'お店の名前を登録します。あなたのお店の名前を教えてください'
    return messageText
}

export default wannaInsertShopName
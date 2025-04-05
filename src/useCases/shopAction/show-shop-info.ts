import { DBORM } from "../../db"

const showShopInfo = async (userId: string) => {
    const shop = await DBORM.Shop.findOne(userId)
    if (!shop) {
        throw new Error('Shop not found')
    }

    const messageText = `
        名前:${shop.name}
        場所:${shop.locate}
        URL:${shop.url}
    `
    return messageText
}

export default showShopInfo
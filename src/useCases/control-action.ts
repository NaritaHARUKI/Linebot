import SHOP_STATUS from "../type/shop-status"
import insertShopName from "./shopAction/insert-shop-name"
import insertShopLocate from "./shopAction/inset-shop-locate"
import wannaInsertShopLocate from "./shopAction/wanna-Insert-shop-locate"
import wannaInsertShopName from "./shopAction/wanna-insert-shop-name"

interface ControlAction {
    type: string
    status: string
    message: string
    userId: string
}

const controlAction = async ({ type, status, message, userId }: ControlAction) => {

    let res = ''
    res = await command(status, message, userId)
    if (res !== '') return res

    switch (type) {
        case 'shop':
            console.log('shop')
            res = await shopAction(status, message, userId)
            return res
        default:
            console.log('default')
            res = 'ニコニコ☺️'
    }
    return res
}

export default controlAction

const command =  (status: string, message: string, userId: string) => {
    switch (message) {
        case 'お店を登録する':
            console.log('お店を登録する')
            return wannaInsertShopName(userId)
        case 'お店の情報を確認する':
            console.log('お店の情報を確認する')
            return wannaInsertShopName(userId)
    }
    return ''
}

const shopAction = (status: string, message: string, userId: string) => {
    switch (status) {
        case SHOP_STATUS.first.insertShopName:
            return insertShopName(message, userId)

        case SHOP_STATUS.second.wannaInsertShoplocate:
            return wannaInsertShopLocate(userId)
        case SHOP_STATUS.second.insertShoplocate:
            return insertShopLocate(message, userId)

        case SHOP_STATUS.third.wannaInsertShopURL:
            return wannaInsertShopLocate(userId)
        case SHOP_STATUS.third.insertShopURL:
            return insertShopLocate(message, userId)
        default:
            throw new Error('Invalid status')
    }
}
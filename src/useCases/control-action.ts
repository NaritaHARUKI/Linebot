import SHOP_STATUS from "../type/shop-status"
import deleteShop from "./shopAction/delete-shop"
import insertShopName from "./shopAction/insert-shop-name"
import insertShopUrl from "./shopAction/insert-shop-url"
import insertShopLocate from "./shopAction/inset-shop-locate"
import showShopInfo from "./shopAction/show-shop-info"
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
            return await shopAction(status, message, userId)
        default:
            res = 'ニコニコ☺️'
    }
    return res
}

export default controlAction

const command =  (status: string, message: string, userId: string) => {
    switch (message) {
        case 'お店を登録する':
            return wannaInsertShopName(userId)
        case 'お店を削除する':
            return deleteShop(userId)
        case 'お店の情報を確認する':
            return showShopInfo(userId)
    }
    return ''
}

const shopAction = (status: string, message: string, userId: string) => {
    switch (status) {
        case SHOP_STATUS.first.insertShopName:
            return insertShopName(message, userId)

        case SHOP_STATUS.second.insertShoplocate:
            return insertShopLocate(message, userId)

        case SHOP_STATUS.third.insertShopURL:
            return insertShopUrl(message, userId)
        case SHOP_STATUS.complte.yes:
            return `お店の情報はすでに登録されてるよ。お店の情報は、「お店の情報を確認する」で確認できるでーー。ニコニコ☺️`
        default:
            return 'ニコニコ☺️'
    }
}
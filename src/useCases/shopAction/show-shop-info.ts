import { DBORM } from "../../db"
import STATION_DATA from "../../station-data"
import SHOP_STATUS from "../../type/shop-status"

const showShopInfo = async (userId: string) => {
    const shop = await DBORM.Shop.findOne(userId)
    if (!shop) {
        DBORM.User.updateStatus(userId, SHOP_STATUS.complte.no)
        return 'お店が登録されていません。'
    }

    const getStationName = (stationId: number) => 
        STATION_DATA.find(station => station.id === stationId)?.station_name 
   
    const messageText = `
    名前:${shop.name}
    場所:${Array.isArray(shop.shopLocates) && shop.shopLocates.map((locate) => {
            return `
            駅名：${getStationName(locate.stationId)}
            `
        }
        ).join(',')}
    URL:${shop.url}`
    return messageText
}

export default showShopInfo
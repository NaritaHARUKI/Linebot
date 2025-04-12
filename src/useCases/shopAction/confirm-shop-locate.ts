import { DBORM } from "../../db"
import STATION_DATA from "../../station_data"
import SHOP_STATUS from "../../type/shop-status"

const confirmShopLocate = async (message: string, userId: string) => {
    const submittedStations = message.split('\n').map(s => s.trim()).filter(s => s !== '')
    const uniqueStations = [...new Set(submittedStations)]
    const findStation = STATION_DATA.filter((station) => {
        return uniqueStations.some((uniqueStation) => {
            return station.station_name.includes(uniqueStation) || station.station_name_kana.includes(uniqueStation)
        })
    })

    if (findStation.length === 0) return `最寄駅の情報が見つかりませんでした。もう一度入力してください。`
    

    await DBORM.User.updateStatus(userId, SHOP_STATUS.second.insertShoplocate)
    const messageText = `
    ${findStation.length}件の最寄駅が見つかりました。
    -----------------------
    ${findStation.map((station) => {
        return `
        駅名：${station.station_name}
        路線名：${station.line_name}
        都道府県名：${station.prefecture}
        `
    }).join('\n')}
    -----------------------
    上記の中から、登録したい最寄駅の駅名を送信してください。複数選択したい場合は改行して送信して下さい。
    例）
    名古屋駅
    栄駅
    `
    return messageText
}

export default confirmShopLocate
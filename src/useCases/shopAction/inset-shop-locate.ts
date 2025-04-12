import { DBORM } from "../../db"
import STATION_DATA from "../../station-data"
import SHOP_STATUS from "../../type/shop-status"

const insertShopLocate = async (message: string, userId: string) => {
    const _validate = (message: string) => {
        let errs: string[] = []
        let ok: number[] = []
        const submittedStations = message.split('\n').map(s => s.trim()).filter(s => s !== '')
        const uniqueStations = [...new Set(submittedStations)]
        uniqueStations.forEach((uniqueStation) => {
            const found = STATION_DATA.some((station) => {
                const stationName = station.station_name === uniqueStation || station.id === Number(uniqueStation)
                return stationName
            })
    
            if (found) {
                const stationId = STATION_DATA.find(station => station.station_name === uniqueStation || station.id === Number(uniqueStation))?.id
                if (stationId) ok.push(stationId)
            } else {
                errs.push(uniqueStation)
            }
        })

        if(errs.length > 0) {
            return { ok: false, data: errs }
        }
        return { ok: true, data: ok }
    }

    console.log(_validate(message))

    if(_validate(message).ok === false) {
        const messageText = `
        以下の駅名は登録できませんでした。
        もう一度入力してください。
        -----------------------
        ${_validate(message).data.map((station) => {
            return `
            駅名またはid：${station}
            `
        }).join('\n')}
        -----------------------
        `
        return messageText
    }

    DBORM.ShopLocate.insertLocate(userId, _validate(message).data as number[])
    DBORM.User.updateStatus(userId, SHOP_STATUS.third.insertShopURL)
    const messageText = `
    お店の最寄駅を以下で登録しました。
    -----------------------
    ${_validate(message).data.map((station) => {
        return `
        駅名：${station}
        `
    }
    ).join('\n')}
    -----------------------
    お店のURLを登録します。
    登録したいURLを入力してください。
    例）https://hikakin.com
    `
    return messageText
}

export default insertShopLocate
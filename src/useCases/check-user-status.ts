import { DB } from "../db"
import SHOP_STATUS from "../type/shop-status";

type UserStatus = {
    type: 'shop' | 'customer' | '';
    status: string;
}

const checkUserStatus = async (lineId: string, isFirstShop?: boolean): Promise<UserStatus> => {
    const user = await DB.getRepository('User').findOne({ where: { lineId } })
    // 初めての人
    if (!user) {
        DB.getRepository('User').save({
            name: '',
            lineId,
            type: '',
            status: '',
        })
        return {'type': '' , 'status': '' }
    }


    // お店の人
    if (user.type === 'shop') {
        return { 'type': 'shop', 'status': user.status }
    }


    // お客さん
    if (user.type === 'customer') {
        return { 'type': 'customer', 'status': user.status }
    }

    return { 'type': '', 'status': '' }
}

export default checkUserStatus
import { DB } from "../db"

type UserStatus = {
    type: 'shop' | 'customer' | '';
    status: string;
}

const checkUserStatus = async (lineId: string): Promise<UserStatus> => {
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

    return {
        'type': user.type,
        'status': user.status
    }
 }

export default checkUserStatus
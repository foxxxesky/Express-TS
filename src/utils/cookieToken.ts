import { User } from 'types'
import { Response } from 'express'
import getToken from '../helpers/getJwtToken'
import { transformUser } from '../transformers'

const cookieToken = (user: User, res: Response) => {
    const token = getToken(user.id)
    const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
    }

    user.password = undefined
    res.status(200).cookie('auth_token', token, options).json({
        success: true,
        token, 
        user: transformUser(user) 
    })
}

export default cookieToken

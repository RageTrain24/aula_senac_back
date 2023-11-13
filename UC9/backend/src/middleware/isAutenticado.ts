import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'

interface Payload {
    sub: string
}

export function isAutenticado(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const autToken = req.headers.authorization
    // console.log(autToken)

    if (!autToken) {
        return res.json({dados: 'Token Invalido'})
    }

    const [, token] = autToken.split(' ') //isso aqui diz respeito àquele 'Bearer ' + ...

    try {
        const { sub } = verify( //isso verifica a assinatura e a validade do Token
            token,
            process.env.JWT_SECRET
        ) as Payload
        req.user_id = sub
        return next()
    } catch (err) {
        return res.json({dados: 'Token Invalido'})
    }
}


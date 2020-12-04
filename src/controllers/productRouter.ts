import { Request, Response, Router} from 'express'
import { requiredProductDataError } from '../services/errors'
import { fbRef } from '../services/firebase'

const productRouter = Router()

const registerProduct = async(req: Request, res: Response) => {
    try {
        const { productName, productDescription, productAmount, productPrice} = req.body

        if (!productName || !productDescription || !productPrice || !productAmount) 
            throw requiredProductDataError

        await fbRef.child('products').push().set({
            name: productName,
            description: productDescription,
            amount: productAmount,
            price: productPrice
        })
    } catch(error) {
        return res.send(error.toJson())
    }
    return res.status(200).send({status: 'ok'})
}

productRouter.post('/products', registerProduct)

export default productRouter


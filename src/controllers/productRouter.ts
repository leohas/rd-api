import { Request, Response, Router} from 'express'
import { requiredProductDataError } from '../services/errors'
import { fbDb } from '../services/firebase'

const productRouter = Router()

const registerProduct = async(req: Request, res: Response) => {
    try {
        const { productName, productDescription, productAmount, productPrice} = req.body

        if (!productName || !productDescription || !productPrice || !productAmount) 
            throw requiredProductDataError

        await fbDb.child('products').push().set({
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

const listProducts = async(req: Request, res: Response) => {
    try {
        const products = (await fbDb.child('products').once('value')).val() || {}
        return res.send(products)
    } catch(error) {
        return res.send(error.toJson()) 
    }
}

productRouter.get('/products', listProducts)

productRouter.post('/products', registerProduct)

export default productRouter


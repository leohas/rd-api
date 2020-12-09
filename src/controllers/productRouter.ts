import { Request, Response, Router} from 'express'
import { invalidTypeDataError, requiredProductDataError } from '../services/errors'
import { fbDb } from '../services/firebase'
import Produto from '../types' 

const productRouter = Router()

const productRegistration = async(req: Request, res: Response) => {
    try {
        const { productName, productDescription, productAmount, productPrice } = req.body

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

const productList = async(req: Request, res: Response) => {
    try {
        const products = (await fbDb.child('products').once('value')).val() || {}

        return res.send(products)
    } catch(error) {
        return res.send(error.toJson()) 
    }
}

const updateProduct = (req: Request, res: Response) => {
    try{
        const { productId } =  req.body
        console.log(typeof(req.body.productPrice))
        let produto: Produto = {
            name: req.body.productName,
            description: req.body.productDescription,
            price: req.body.productPrice,
            amount: req.body.productAmount
        }
        fbDb.child(`products/${productId}`).update(produto)
        console.log(typeof(req.body.productPrice))
        console.log(typeof(req.body.productName))
        return res.json({status: 'ok'})
    }catch(error) {
        return res.send(error.toJson())
    }
}

productRouter.get('/product', productList)

productRouter.post('/product', productRegistration)

productRouter.put('/product', updateProduct)

export default productRouter


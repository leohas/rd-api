import { Request, Response, Router} from 'express'
import { invalidTypeDataError, requiredProductDataError } from '../services/errors'
import { fbDb } from '../services/firebase'

const productRouter = Router()

// Esta interface deveria estar aqui? Ou em um arquivo específico de interfaces?
interface Produto {
    name?: String,
    description?: String,
    amount?: Number,
    price?: Number 
}

const registerProduct = async(req: Request, res: Response) => {
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

const listProducts = async(req: Request, res: Response) => {
    try {
        const products = (await fbDb.child('products').once('value')).val() || {}

        return res.send(products)
    } catch(error) {
        return res.send(error.toJson()) 
    }
}

const setProduct = async(req: Request, res: Response) => {
    try{
        let produtoNovo: Produto = {}
        const { productId, productName, productDescription, productAmount, productPrice } = req.body
        
        // Não sabemos como validar esta condição. 
        if (productAmount !== Number && productPrice !== Number) throw invalidTypeDataError
        
        // Poderíamos colocar em uma função os 4 ifs?
        if (productName) produtoNovo.name = productName
        if (productDescription) produtoNovo.description = productDescription
        if (productAmount) produtoNovo.amount = productAmount
        if (productPrice) produtoNovo.price = productPrice

        fbDb.child(`products/${productId}`).update(produtoNovo)

        return res.json({status: 'ok'})
    }catch(error) {
        return res.send(error.toJson())
    }
}

productRouter.get('/product', listProducts)

productRouter.post('/product', registerProduct)

productRouter.put('/product', setProduct)

export default productRouter


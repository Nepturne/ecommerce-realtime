'use strict'

const { TIMESTAMP } = require("mysql/lib/protocol/constants/types")
const Database = use('Database')

class OrderService {
    constructor(model, trx=false){
        this.model = model
        this.trx = trx
    }


    async syncItems(items){
        if(!Array.isArray(items)){
            return false
        }
        await this.model.items().delete(this.trx)
        await this.model.items().createMany(items, this.trx)
    }

    async updateItems(items){
        let currentItems = await this.model
            .items()
            .whereIn('id', items.map( item => item.id))
            .fetch()
            // deleta os itens que o user não quer mais
            await this.model
                .items()
                .whereNotIn('id', items.map(item => item.id))
                .delete(this.trx)

            // Atualiza os valores e quantidades 
            await Promise.all(currentItems.rows.map(async item =>{
                item.fill(items.find(n => n.id === item.id))
                await item.save(this.trx)
            }))
    }

    
    async canApplyDiscount(coupon){
        const couponProducts = await Database.from('coupon_products').where('coupon_id', coupon.id).pluck('product_id')
    }

} 

module.exports = OrderService


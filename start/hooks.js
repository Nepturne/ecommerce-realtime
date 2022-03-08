const { hooks } = require('@adonisjs/fold')


hooks.after.providersBooted(() => {
    
    const Validator = use('Validator')
    const Database  = use('Database')
    
    const existsFn = async (data, field, message, args, get) => {
        const value = get(data, field)
        if(!value){
            /**
             * Skip validation if value is not defined. 'required' rule
             * should take care of it.
             */
            return
        }
        
    
        const [table, colum] = args
        const row = await Database.table(table)
            .where(column,value)
            .first()
    
        if(!row){
            throw message
        }
    
    }

})

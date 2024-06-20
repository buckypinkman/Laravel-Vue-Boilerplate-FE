import _ from "./general"
class Validation {

    constructor(items = {}) {
        const result = {}
        for(let i in items) { 
            result[i] = {
                required: items[i].includes('required'),
                message: `Mohon input ${_.removeUnderScore(i.replace('id', ''))}`,
                trigger: 'blur',
                ...(items[i].includes('number') ? { type: 'number' } : {})
            }       
        }

        return result
    }
}

export default Validation
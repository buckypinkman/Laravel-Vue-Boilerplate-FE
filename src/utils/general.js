export default {
    dateYmd(time = false, date = null) {
        date = date ?? new Date()  

        const year = date.getFullYear();
        const month = this.addZero(date.getMonth() + 1)
        const day = this.addZero(date.getDate())

        if(time) {
            const hours = this.addZero(date.getHours());
            const minutes = this.addZero(date.getMinutes());
            const seconds = this.addZero(date.getSeconds());
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
        }

        return `${year}-${month}-${day}`
    },
    addZero(value) {
        return ('0' + value).slice(-2)
    },
    isset(key) {
        return typeof key !== 'undefined'
    },
    isEmpty(value) {
        if (typeof value == 'object') {
            for(let i in value) return false
            return true
        }

        if(Array.isArray(value)) {
            return value.length == 0
        }

        return value == null || value == ''
    },
    chunk(arr = [], chunkSize = 2) {
        const temp = [];
        for (var i=0,len=arr.length; i<len; i+=chunkSize) {
            temp.push(arr.slice(i,i+chunkSize));
        }
        return temp;
    },
    removeUnderScore(str) {
        return str.replace(/_/g, " ");
    },
    slugify(str) {
        return str.toLowerCase()
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-');
    },
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    compileErrors(errors) {

        if(typeof errors == 'string') return errors
        
        if(errors) {
            const arr = []
            for (const [key, value] of Object.entries(errors)) {
                arr.push(`${key}: ${value}`)
            } 

            return arr.join(' ')
        }

        return 'Something went wrong'
    },
    generateFormData(data) {
        const formData = new FormData()

        Object.keys(data).forEach((key) => {
          formData.append(
            key,
            data[key]
          );
        });

        return formData
    }
    
}
class FormChecker {

    constructor (fieldName,value,validationInfo){
        this.fieldName = fieldName;
        this.value = value;
        this.validationInfo = validationInfo;
    }
  
    validate (){
  
        let validResult = {
            fieldName : this.fieldName,
            isCorrect : null,
            message : ''
        }
  
        if (this.validationInfo.length === 0)
            return validResult;
  
        for (var rule of this.validationInfo){
  
            if (!rule['method'](this.value,rule['args'])){
                
                validResult = {
                    fieldName : this.fieldName,
                    isCorrect : 'error',
                    message : rule['message']
                };
  
                return validResult;
            }
        }
        
        return validResult;
  
    }
  } export default FormChecker;
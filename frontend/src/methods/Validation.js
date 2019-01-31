
import validator from 'validator';

class Validation {

    static strLengthCondition (inpStr,args){

        if (inpStr.length < args[0]['min'] || inpStr.length > args[0]['max']){
            return false;
        }
        return true;
    }

    static isNotEmpty (inpStr){
        return !validator.isEmpty(inpStr);
    }

    static passwordStrengthCondition (inpStr){
        // 8글자 이상 20글자 이하 and 특수문자 최소 1개 포함
        return new RegExp('^(?=.*?[#?!@$%^&*-]).{8,20}$').test(inpStr);
    }

    static sameAsPassword (passwordStr,args){
        return passwordStr === args[0]['confirmationStr'];
    }

}
export default Validation
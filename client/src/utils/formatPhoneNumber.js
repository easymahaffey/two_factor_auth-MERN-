

export const formatPhoneNumber = (num) =>{
    const numStr = num.toString()
    if(numStr.length < 7 || numStr.length > 11){
        return num
    } else if ( numStr.length === 7){
        let first3 = numStr.slice(0,3)
        let last4 = numStr.slice(3,7)
        return first3 + "-" + last4
    } else if ( numStr.length === 10){
        let areaCode = numStr.slice(0,3)
        let first3 = numStr.slice(3,6)
        let last4 = numStr.slice(6-10)
        return "(" + areaCode + ") "+first3 + "-" + last4
    } else if ( numStr.length === 11 && numStr[0] === "1"){
        let init1 = numStr[0]
        let areaCode = numStr.slice(1,4)
        let first3 = numStr.slice(4,7)
        let last4 = numStr.slice(7,11)
        return init1 + "+(" + areaCode + ") " + first3 + "-" + last4
    }
    else {
        return num
    }
}


export const validatorPositive = value => {
  if (value >= 0) {
    return true
  }
  return false
}

export const validatorMaxCaracteres = (value,longitud = 5) => {
  if(value.length > longitud){
    return false;
  }
  return true;

}


export const validatorPassword = password => {
  /* eslint-disable no-useless-escape */
  const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()]).{8,}/
  /* eslint-enable no-useless-escape */
  const validPassword = regExp.test(password)
  return validPassword
}

export const validatorCreditCard = creditnum => {
  /* eslint-disable no-useless-escape */
  const cRegExp = /^(?:3[47][0-9]{13})$/
  /* eslint-enable no-useless-escape */
  const validCreditCard = cRegExp.test(creditnum)
  return validCreditCard
}

export const validatorUrlValidator = val => {
  if (val === undefined || val === null || val.length === 0) {
    return true
  }
  /* eslint-disable no-useless-escape */
  const re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/
  /* eslint-enable no-useless-escape */
  return re.test(val)
}

export const validarCorreo = (email) => {
  return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(email));
}


export const montoMax = (value,args) => {
  return value <= args.monto
}


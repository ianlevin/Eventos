class ValidacionesHelper{
    
    ValidaNumero = (num) => {
        return isNaN(num)
    }

    ValidarMayorATresLetras(str){
        return ((str!=null) && (str.length>3))
    }
}
export default new ValidacionesHelper();
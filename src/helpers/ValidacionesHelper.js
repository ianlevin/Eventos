class ValidacionesHelper{
    
    ValidaNumero = (num) => {
        return isNaN(num)
    }

    ValidarMayorATresLetras(str){
        return ((str!=null) && (str.length>3))
    }

    ValidarHasta10 = (num) =>{
        return (num >= 0 && num <= 10)
    }
}
export default new ValidacionesHelper();
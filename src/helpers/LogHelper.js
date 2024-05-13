import 'dotenv/config'
import fs from 'fs';

class LogHelper {

    constructor() {
        this.filePath            = process.env.LOG_FILE_PATH;
        this.fileName            = process.env.LOG_FILE_NAME;
        this.logToFileEnabled    = process.env.LOG_TO_FILE_ENABLED.toLowerCase() === 'true';
        this.logToConsoleEnabled = process.env.LOG_TO_CONSOLE_ENABLED.toLowerCase() === 'true';
    }


    /**

     * Este método almacena en un archivo de texto y/o por muestra consola información del Error.

     * @param {*} errorObject

     */

    logError = (errorObject) => {

        /* Hacer el cuerpo del método, no seas vago. */

    }

}


export default new LogHelper();
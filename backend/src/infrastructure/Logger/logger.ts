import { ILogger } from "../../application/interfaces/ILogger";
import winston  from "winston";

export const winstonLogger = winston.createLogger({
    level:'info',
    format:winston.format.combine(
        winston.format.timestamp(),
        winston.format.colorize(),
        winston.format.printf(({level,message,timestamp})=>{
            return `[${timestamp}] ${level}: ${message}`
        })
    ),
    transports:[new winston.transports.Console(),
        new winston.transports.File({filename:'logs/app.log'})
    ]
})


export class WinstonLogger implements ILogger{
    info(message:string):void{
      winstonLogger.info(message)
    }

    error(message: string, error?: unknown): void {
        winstonLogger.error(`${message} ${error?JSON.stringify(error):''}`)
        
    }

    warn(message: string): void {
        winstonLogger.warn(message) 
    }


}
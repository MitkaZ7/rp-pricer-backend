import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const logger = winston.createLogger({

    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        
        winston.format.json(),
        winston.format((info) => {
            if (info.password) {
                info.password = '******';
            }
            if (info.token) {
                info.token = '******';
            }
            return info;
        })()
    ),
    transports: [
        new winston.transports.File({ filename: './logs/errors.log', level: 'error'}),
        new DailyRotateFile({
            filename: './logs/rp-server.log',
            datePattern: 'YYYY-MM-DD',
            maxSize: '20m',
            maxFiles: '7d'
        }),
        new winston.transports.Console()
    ]

});

export default logger;
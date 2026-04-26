import pino from 'pino';

const isDevelopment = process.env.NODE_ENV === 'development';

export const logger = pino({
    level: process.env.LOG_LEVEL || (isDevelopment ? 'debug' : 'info'),
    transport: isDevelopment ? {
        target: 'pino-pretty',
        options: {
            colorize: true,
            ignore: 'pid,hostname',
        },
    } : undefined,
    base: {
        env: process.env.NODE_ENV,
        version: process.env.npm_package_version,
    },
});

export const logError = (error: any, context?: string) => {
    logger.error({ 
        err: error instanceof Error ? {
            message: error.message,
            stack: error.stack,
            name: error.name
        } : error,
        context 
    }, error?.message || "Unknown error");
};


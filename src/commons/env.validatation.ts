/**
 * Validates all required Environment variables are valid, should be rewritten, but currently works.
 */
export const validateEnvironment = () => {
    const keys: string[] = [
        'MONGO_HOST',
        'MONGO_PORT',
        'MONGO_COLLECTION',
        'JWT_SECRET',
    ]
    for (const key of keys) {
        const value = process.env[key]
        if (!value || value.length <= 0) {
            throw new Error(`Environment variable "${key}" is missing or invalid! Please ensure you define it before trying again!`)
        }
    }
};

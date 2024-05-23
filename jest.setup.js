const { execSync } = require('child_process');
require('dotenv').config();
module.exports = async () => {
    process.env.DATABASE_URL = process.env.DATABASE_URL_TEST;

    try {
        execSync('npx prisma migrate deploy', { stdio: 'inherit' });
        console.log('Migrations applied successfully');
    } catch (error) {
        console.error('Error running migrations:', error);
    }
};

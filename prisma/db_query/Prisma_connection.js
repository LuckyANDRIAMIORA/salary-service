const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const connect = async () => {
    await prisma.$connect();
};

const disconnect = async () => {
    await prisma.$disconnect();
};

module.exports = {connect, disconnect}
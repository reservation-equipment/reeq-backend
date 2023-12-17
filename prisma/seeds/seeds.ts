import {PrismaClient} from '@prisma/client'
import {institutes} from "./institutes.js";
import {areas} from "./areas.js";

const prisma = new PrismaClient()

async function main() {
    await institutes();
    await areas()


}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
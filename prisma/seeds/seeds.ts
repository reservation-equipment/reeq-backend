import {PrismaClient} from '@prisma/client'
import {institutes} from "./institutes.js";
import {areas} from "./areas.js";
import {equipments} from "./equipments";

const prisma = new PrismaClient()

async function main() {
    await institutes();
    await areas()
    await equipments()

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
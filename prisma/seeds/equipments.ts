import {PrismaClient} from '@prisma/client'
import {dataEquipments} from "./data/data.js";


const prisma = new PrismaClient()

export async function equipments() {
    const areasIds = await prisma.areas.findMany({
        select: {
            id: true,
            name: true
        }
    })

    for (const {id, name} of areasIds) {
        const data = dataEquipments
            .find((item) => item?.area_name === name)?.inventory
            .map((item) => {
                return {
                    ...item,
                    area_id: id
                }
            });

        console.log(data?.length)

        await prisma.equipments.createMany({
            data: data as any
        })
    }

    // console.log(areas)

    // console.log(JSON.parse())

}
// areas()

// equipments()
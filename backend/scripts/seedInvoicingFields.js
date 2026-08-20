import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const data = [
  { slug: 'paceattack-pro',          productCode: 'SDPTPAPRO',  hsnCode: '95069990', gstRate: 5,  leadTime: '15 days' },
  { slug: 'twister',                 productCode: 'SDTWISTER',  hsnCode: '95069990', gstRate: 5,  leadTime: '15 days' },
  { slug: 'cricket-balls-box-of-6',  productCode: 'SDBALL6',    hsnCode: '95066210', gstRate: 18, },
  { slug: 'cricket-balls-box-of-12', productCode: 'SDBALL12',   hsnCode: '95066210', gstRate: 18,   },
  { slug: 'cricket-simulator',       productCode: 'SDSIM',      hsnCode: '95069990', gstRate: 5,  },
  { slug: 'pixel-play',              productCode: 'SDPIXEL',    hsnCode: '95069990', gstRate: 5,   },
  { slug: 'subgoal-soccer',          productCode: 'SDSUBGOAL',  hsnCode: '95049090', gstRate: 18,  },
]

async function main() {
  for (const item of data) {
    const updated = await prisma.product.update({
      where: { slug: item.slug },
      data: {
        productCode: item.productCode,
        hsnCode: item.hsnCode,
        gstRate: item.gstRate,
        leadTime: item.leadTime,
      },
    })
    console.log(`✔ ${updated.name} — ${item.productCode} / HSN ${item.hsnCode} / GST ${item.gstRate}%`)
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
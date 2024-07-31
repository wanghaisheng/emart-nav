// CommonJS import style
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    // Create some initial products
    const product1 = await prisma.products.create({
        data: {
            brand: 'Brand A',
            category: 'Category 1',
            description: 'A great product',
            discountPercentage: 10.0,
            id_: 1,
            images: ['http://example.com/image1.jpg'],
            price: 100,
            rating: 4.5,
            stock: 50,
            thumbnail: 'http://example.com/thumbnail1.jpg',
            title: 'Product 1'
        }
    });

    const product2 = await prisma.products.create({
        data: {
            brand: 'Brand B',
            category: 'Category 2',
            description: 'Another great product',
            discountPercentage: 5.0,
            id_: 2,
            images: ['http://example.com/image2.jpg'],
            price: 200,
            rating: 4.0,
            stock: 30,
            thumbnail: 'http://example.com/thumbnail2.jpg',
            title: 'Product 2'
        }
    });

    // Create some users
    const user1 = await prisma.users.create({
        data: {
            email: 'user1@example.com',
            hashedPassword: 'hashedpassword1',
            name: 'User One'
        }
    });

    const user2 = await prisma.users.create({
        data: {
            email: 'user2@example.com',
            hashedPassword: 'hashedpassword2',
            name: 'User Two'
        }
    });

    // Create carts and items
    await prisma.carts.create({
        data: {
            email: 'user1@example.com',
            items: {
                create: [
                    {
                        productId: product1.id_,
                        quantity: 2
                    },
                    {
                        productId: product2.id_,
                        quantity: 1
                    }
                ]
            }
        }
    });

    await prisma.carts.create({
        data: {
            email: 'user2@example.com',
            items: {
                create: [
                    {
                        productId: product2.id_,
                        quantity: 3
                    }
                ]
            }
        }
    });

    console.log('Seed data has been added!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

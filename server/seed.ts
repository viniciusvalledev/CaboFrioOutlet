import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { prisma } from './db';

/**
 * Bootstrap mínimo do banco: configurações padrão da loja e o usuário admin.
 * O catálogo de produtos (fotos, preços, estoque) é cadastrado pelo painel /admin,
 * não por seed — este banco é o banco real da loja, não um ambiente de exemplo.
 */
async function main() {
  await prisma.settings.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      storeName: 'Cabo Frio Outlet',
      freeShippingThreshold: 299,
      announcementMessages: JSON.stringify([
        'Parcele em até 3x sem juros',
        'Troca grátis em até 30 dias',
        'Novidades toda semana',
      ]),
    },
  });
  console.log('Configurações padrão da loja garantidas.');

  const existingAdmin = await prisma.admin.findUnique({ where: { id: 1 } });
  if (!existingAdmin) {
    const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD || 'caboadmin2026';
    const passwordHash = await bcrypt.hash(defaultPassword, 10);
    await prisma.admin.create({ data: { id: 1, passwordHash } });
    console.log('Admin criado com a senha definida em ADMIN_DEFAULT_PASSWORD.');
  } else {
    console.log('Admin já existe, seed de admin ignorado.');
  }
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

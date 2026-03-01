import { Client, GatewayIntentBits, Events, GuildMember } from 'discord.js';
import { Telegraf } from 'telegraf';
import dotenv from 'dotenv';

// Carregar variáveis de ambiente
dotenv.config();

// Configurações e validações
const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

// Verifica se as chaves existem antes de rodar
if (!DISCORD_TOKEN || !TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
  console.error('❌ ERRO: Faltam variáveis no arquivo .env');
  process.exit(1);
}

// 1. Inicializar Telegram
const telegramBot = new Telegraf(TELEGRAM_BOT_TOKEN);

// 2. Inicializar Discord
const discordClient = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers, // <--- OBRIGATÓRIO para ver quem entra
  ],
});

// --- EVENTOS ---

discordClient.once(Events.ClientReady, (c) => {
  console.log(`✅ Sistema Iniciado! Logado como ${c.user.tag}`);
});

// Quando um novo membro entra
discordClient.on(Events.GuildMemberAdd, async (member: GuildMember) => {
  try {
    const userName = member.user.username;
    const userId = member.id;
    const serverName = member.guild.name;
    // Pega a hora atual (ex: 14:30:05)
    const time = new Date().toLocaleTimeString('pt-BR', { hour12: false });

    console.log(`🔔 Novo membro: ${userName} em ${serverName}`);

    // Mensagem formatada igual ao pedido do cliente
    const message = `
🔔 NEW MEMBER | ${time}

👤 User: ${userName}
🆔 ID: ${userId}
🏛 Server: ${serverName}
    `;

    // Envia para o Telegram
    await telegramBot.telegram.sendMessage(TELEGRAM_CHAT_ID, message);

  } catch (error) {
    console.error('❌ Erro ao enviar mensagem:', error);
  }
});

// --- LIGAR O BOT ---
discordClient.login(DISCORD_TOKEN);
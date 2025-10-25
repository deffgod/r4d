/**
 * Telegram Bot Configuration
 * 
 * Setup Instructions:
 * 1. Create a bot via @BotFather on Telegram
 * 2. Copy your bot token
 * 3. Start a chat with your bot
 * 4. Get your chat ID from https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates
 * 5. Paste both values below
 */

export const TELEGRAM_CONFIG = {
  // Paste your bot token here (from @BotFather)
  BOT_TOKEN: '7906656869:AAGckUoQg8GX_xxmhEwz9x0qAVSlcTjqOds',
  
  // Paste your chat ID here (your personal Telegram ID or group chat ID)
  CHAT_ID: '6938549842',
  
  // Optional: Customize the message format
  MESSAGE_TEMPLATE: {
    enabled: true,
    emoji: {
      name: '👤',
      email: '📧',
      company: '🏢',
      message: '💬'
    }
  }
};

// Helper function to format the message
export const formatTelegramMessage = (formData) => {
  const { MESSAGE_TEMPLATE } = TELEGRAM_CONFIG;
  
  if (MESSAGE_TEMPLATE.enabled) {
    const { emoji } = MESSAGE_TEMPLATE;
    return `
🔔 <b>Новая заявка с сайта R4D!</b>

${emoji.name} <b>Имя:</b> ${formData.name}
${emoji.email} <b>Email:</b> ${formData.email}
${emoji.company} <b>Компания:</b> ${formData.company || 'Не указана'}
${emoji.message} <b>Сообщение:</b>
${formData.message}

⏰ <i>Время: ${new Date().toLocaleString('ru-RU')}</i>
    `.trim();
  }
  
  return `
Новая заявка с сайта R4D!

Имя: ${formData.name}
Email: ${formData.email}
Компания: ${formData.company || 'Не указана'}
Сообщение: ${formData.message}

Время: ${new Date().toLocaleString('ru-RU')}
  `.trim();
};

// Helper function to send message to Telegram
export const sendToTelegram = async (formData) => {
  const { BOT_TOKEN, CHAT_ID } = TELEGRAM_CONFIG;
  
  if (!BOT_TOKEN || !CHAT_ID) {
    throw new Error('Telegram bot configuration is missing. Please check src/config/telegram.js');
  }
  
  const message = formatTelegramMessage(formData);
  
  const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'HTML'
    })
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.description || 'Failed to send message to Telegram');
  }
  
  return response.json();
};

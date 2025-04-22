const ollamaService = require('../service/ollamaService');

const formatChatHistory = (chat) => {
    const systemPrompt = "You are a helpful assistant. Respond to questions clearly and concisely.\n\n";
  
    const history = chat.map(msg => `${msg.sender}: ${msg.message}`).join('\n');
  
    return `${systemPrompt}${history}\nAI:`;
  };

const handleChat = async (req, res) => {
    const { chat } = req.body;

    if (!Array.isArray(chat) || chat.length === 0) {
        return res.status(400).json({ error: 'Chat history is required.' });
    }

    try {
        const formattedPrompt = formatChatHistory(chat);
        const response = await ollamaService.sendMessage(formattedPrompt);
        return res.status(200).json({ response });
    } catch (err) {
        console.error('Ollama error:', err);
        return res.status(500).json({ error: 'AI failed to respond.' });
    }
};

module.exports = { handleChat };

const Message = require('../Models/message');

const createMessage = async (req, res) => {
    const { sender, receiver, text } = req.body;

    try {
        const existingChat = await Message.findOne({ participantDoc: receiver, participantPatient: sender });   
        console.log(existingChat);

        if (existingChat) 
        await Message.updateOne(
            { participantDoc: receiver, participantPatient: sender },
            {
                $push: {
                    'aggregatedMessages': {
                        sender,
                        receiver,
                        text,
                        timestamp: new Date(),
                    },
                },
            }
        );    
        else {
            const newChat = new Message({
                participantDoc: receiver,
                participantPatient: sender,
                aggregatedMessages: [{
                    sender,
                    receiver,
                    text,
                    timestamp: new Date(),
                }],
            });

            await newChat.save();
        }

        res.status(200).json({ success: true });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};


const getMessages = async (req, res) => {
    const { patientId, doctorId } = req.params;
    
    try {
        let chat = await Message.findOne({ participantDoc: doctorId, participantPatient: patientId });
        
        if (!chat) {
            chat = new Message({
                participantDoc: doctorId,
                participantPatient: patientId,
                aggregatedMessages: [],
            });
        }

        await chat.save();

        res.status(200).json({ chat });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


const updateMessages = async (req, res) => {
    const { chatId } = req.params;
    const { sender, receiver, text } = req.body;

    try {
        const existingChat = await Message.findOne({ chatId, 'aggregatedMessages.sender': sender });

        if (existingChat) {
            // If the sender already exists, update the aggregatedMessages array
            await Message.updateOne(
                { chatId, 'aggregatedMessages.sender': sender },
                {
                    $push: {
                        'aggregatedMessages': {
                            sender,
                            receiver,
                            text,
                            timestamp: new Date(),
                        },
                    },
                }
            );
        } else {
            await Message.updateOne(
                { chatId },
                {
                    $push: {
                        aggregatedMessages: {
                            sender,
                            receiver,
                            messages: [{ text, timestamp: new Date() }],
                        },
                    },
                }
            );
        }

        res.status(200).json({ success: true });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

module.exports = {
    createMessage,
    getMessages,
    updateMessages,
};

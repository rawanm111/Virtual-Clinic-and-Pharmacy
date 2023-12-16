const MessagePharm = require('../Models/messagePharmacy');


const createMessage = async (req, res) => {
    
    const { sender, receiver, text } = req.body;

    try {
        const existingChat = await MessagePharm.findOne({ participantPharm: sender, participantDoc: receiver });   
        console.log(existingChat);

        if (existingChat) 
        await MessagePharm.updateOne(
            { participantPharm: sender, participantDoc: receiver },
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
            const newChat = new MessagePharm({
                participantPharm: sender,
                participantDoc: receiver,
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
        let chat = await MessagePharm.findOne({ participantPharm: doctorId, participantDoc: patientId });
        
        if (!chat) {
            chat = new MessagePharm({
                participantPharm: doctorId,
                participantDoc: patientId,
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
        const existingChat = await MessagePharm.findOne({ chatId, 'aggregatedMessages.sender': sender });

        if (existingChat) {
            // If the sender already exists, update the aggregatedMessagePharms array
            await MessagePharm.updateOne(
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
            await MessagePharm.updateOne(
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

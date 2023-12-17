const MessagePharm = require('../Models/messagePharmacy');
const Pharmacist = require('../Models/pharmacists');

const createMessage = async (req, res) => {
    console.log(req.body);
  
    try {
      const { participantDoc, sender, text, broadcast, subject } = req.body;
  
      const allPharmacists = await Pharmacist.find({}); 
      const chat= await MessagePharm.findOne({participantDoc:participantDoc});
        console.log( "hello");
        console.log(chat, "chat");

        if(!chat){
            const newMessage = new MessagePharm({
              participantDoc,
                aggregatedMessages: [{ sender, text }],
                broadcast,
                subject,
              });
              const savedMessage = await newMessage.save();
              console.log(savedMessage, "savedMessage");
              res.status(201).json(savedMessage);
              return;
        }

        chat.aggregatedMessages.push({sender, text});
        await chat.save();
        console.log(chat, "chat2");

        res.status(201).json(chat);
          
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  const getMessages = async (req, res) => {
    try {
      const { participantDoc } = req.query;
    console.log(participantDoc, "participantDoc");
      if (!participantDoc) {
        return res.status(400).json({ error: 'Participant patient parameter is required' });
      }
  
      const chat = await MessagePharm.findOne({ participantDoc });
        console.log(chat, "chat yarab");
      if (!chat) {
        return res.status(404).json({ error: 'Chat not found' });
      }
      
      res.status(200).json(chat);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  

  

module.exports = { createMessage, getMessages };

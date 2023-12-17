import { createContext , useState ,useEffect} from 'react';
import { baseUrl, getRequest, postRequests } from '../utils/sevices';

export const ChatContext = createContext();

const ChatContextProvider = ({children ,user}) => {
    const [userChats, setUserChats] = useState([]);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);

    useEffect(() => {
        const getUserChats = async () => {
            if (user?._id) {
                setIsUserChatsLoading(true);
                setUserChatsError(null);
    
                try {
                    const response = await getRequest(`${baseUrl}/chats/${user._id}`);
                    setIsUserChatsLoading(false);
    
                    if (response.error) {
                        return setUserChatsError(response.error);
                    }
    
                    setUserChats(response);
                } catch (error) {
                    setIsUserChatsLoading(false);
                    setUserChatsError(error.message);
                }
            }
        };
    
        getUserChats();
    }, [user?._id]);
    

    return (
        <ChatContext.Provider 
        value={{userChats, isUserChatsLoading, userChatsError}}
        >
            {children}
        </ChatContext.Provider>
    );
}

export default ChatContextProvider;

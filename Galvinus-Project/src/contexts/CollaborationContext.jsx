import { createContext, useState } from 'react';

export const CollaborationContext = createContext();

const CollaborationProvider = ({ children }) => {
  const [conversations, setConversations] = useState([]);
  const [comments, setComments] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [files, setFiles] = useState([]);
  const [wiki, setWiki] = useState('');

  const addConversation = (message) => {
    setConversations([...conversations, message]);
  };

  const addComment = (comment) => {
    setComments([...comments, comment]);
  };

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const addFile = (file) => {
    setFiles([...files, file]);
  };

  const updateWiki = (content) => {
    setWiki(content);
  };

  return (
    <CollaborationContext.Provider
      value={{
        conversations,
        comments,
        tasks,
        files,
        wiki,
        addConversation,
        addComment,
        addTask,
        addFile,
        updateWiki,
      }}
    >
      {children}
    </CollaborationContext.Provider>
  );
};

export default CollaborationProvider
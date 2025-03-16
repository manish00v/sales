import Coll from './CollaborationSettings.module.css'; // Import the CSS module
import { useContext, useState } from 'react';
import { CollaborationContext } from '../../contexts/CollaborationContext';

const CollaborationSettings = () => {
  const {
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
  } = useContext(CollaborationContext);

  const [newMessage, setNewMessage] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newTask, setNewTask] = useState('');
  //const [newFile, setNewFile] = useState(null);
  const [newWikiContent, setNewWikiContent] = useState('');

  const handleAddConversation = () => {
    if (newMessage) {
      addConversation(newMessage);
      setNewMessage('');
    }
  };

  const handleAddComment = () => {
    if (newComment) {
      addComment(newComment);
      setNewComment('');
    }
  };

  const handleAddTask = () => {
    if (newTask) {
      addTask(newTask);
      setNewTask('');
    }
  };

  const handleAddFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      addFile(file.name);
    }
  };

  const handleUpdateWiki = () => {
    if (newWikiContent) {
      updateWiki(newWikiContent);
      setNewWikiContent('');
    }
  };

  return (
    <div className={Coll['collaboration-settings']}> 
      <div className={Coll['team-chat']}> 
        <h2>Team Chat</h2>
        <div className={Coll.conversations}> 
          {conversations.map((msg, index) => (
            <div key={index} className={Coll.message}> 
              {msg}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Start a conversation"
          className={Coll.input} 
        />
        <button onClick={handleAddConversation} className={Coll.button}> 
          Send
        </button>
      </div>

      <div className={Coll.comments}> 
        <h2>Comments on Records</h2>
        <div className={Coll['comment-list']}> 
          {comments.map((comment, index) => (
            <div key={index} className={Coll.comment}> 
              {comment}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment"
          className={Coll.input} // Apply CSS class
        />
        <button onClick={handleAddComment} className={Coll.button}> 
          Add Comment
        </button>
      </div>

      <div className={Coll.tasks}> 
        <h2>Task Assignments</h2>
        <div className={Coll['task-list']}> 
          {tasks.map((task, index) => (
            <div key={index} className={Coll.task}>
              {task}
            </div>
          ))}
        </div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Create a task"
          className={Coll.input}
        />
        <button onClick={handleAddTask} className={Coll.button}> 
          Assign Task
        </button>
      </div>

      <div className={Coll.files}> 
        <h2>File Attachments</h2>
        <div className={Coll['file-list']}> 
          {files.map((file, index) => (
            <div key={index} className={Coll.file}> 
              {file}
            </div>
          ))}
        </div>
        <input
          type="file"
          onChange={handleAddFile}
          className={Coll['file-input']} 
        />
      </div>

      <div className={Coll.wiki}> 
        <h2>Team Wiki</h2>
        <textarea
          value={wiki}
          readOnly
          placeholder="Team Wiki Content"
          className={Coll.textarea} 
        />
        <textarea
          value={newWikiContent}
          onChange={(e) => setNewWikiContent(e.target.value)}
          placeholder="Update Wiki Content"
          className={Coll.textarea} 
        />
        <button onClick={handleUpdateWiki} className={Coll.button}>
          Update Wiki
        </button>
      </div>
    </div>
  );
};

export default CollaborationSettings;
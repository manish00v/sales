import { useState, useEffect, useRef } from 'react';
import Set from './Setting.module.css';

const API_BASE_URL = 'http://localhost:4000/api';

const Settings = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    companyName: '',
    companyAddress: '',
    timezone: 'UTC'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      fetchSettings();
    }
  }, [isOpen]);

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/settings`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch settings: ${response.status}`);
      }
      
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const saveSettings = async (data) => {
    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/settings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save settings');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Save error:', error);
      setError(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveSettings(settings);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      // Error is already handled in saveSettings
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className={Set.overlay}>
      <div className={Set.settings} ref={popupRef}>
        <div className={Set.header}>
          <h1 className={Set.title}>Settings</h1>
          <button className={Set.closeButton} onClick={onClose}>&times;</button>
        </div>
        
        {error && <div className={Set.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={Set.section}>
            <h2>Company Information</h2>
            <label className={Set.customlabel}>
              Company Name:
              <input
                type="text"
                name="companyName"
                value={settings.companyName}
                onChange={handleChange}
                className={Set.input}
                required
                disabled={!isEditing}
              />
            </label>
            <label className={Set.customlabel}>
              Company Address:
              <input
                type="text"
                name="companyAddress"
                value={settings.companyAddress}
                onChange={handleChange}
                className={Set.input}
                required
                disabled={!isEditing}
              />
            </label>
          </div>

          <div className={Set.section}>
            <h2>Notification Preferences</h2>
            <label className={Set.customlabel}>
              Time Zone:
              <select
                name="timezone"
                value={settings.timezone}
                onChange={handleChange}
                className={Set.select}
                disabled={!isEditing}
              >
                <option value="UTC">UTC</option>
                <option value="EST">EST</option>
                <option value="PST">PST</option>
              </select>
            </label>
          </div>

          <div className={Set.actions}>
            {!isEditing ? (
              <button 
                type="button"
                onClick={() => setIsEditing(true)}
                className={Set.button}
              >
                Edit Settings
              </button>
            ) : (
              <>
                <button 
                  type="submit" 
                  className={`${Set.button} ${Set.primary}`}
                  disabled={isLoading}
                >
                  {isLoading ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    fetchSettings(); // Reset form
                  }}
                  className={Set.button}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
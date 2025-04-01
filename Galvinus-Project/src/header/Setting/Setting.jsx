import { useState, useEffect } from 'react';
import Set from './Setting.module.css';

// API base URL configuration
const API_BASE_URL = 'http://localhost:4000/api'; // Added /api prefix

const Settings = () => {
  const [timeZone, setTimeZone] = useState('UTC');
  const [theme] = useState('light');
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/settings');
      
      if (!response.ok) {
        // Handle specific error cases
        if (response.status === 404) {
          throw new Error('Settings endpoint not found (404)');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      // Return default settings if API fails
      return {
        companyName: '',
        companyAddress: '',
        timezone: 'UTC'
      };
    }
  };
  
  const saveSettings = async (data) => {
    try {
      const response = await fetch('http://localhost:4000/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
  
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to save settings');
      }
  
      return await response.json();
    } catch (error) {
      console.error('Save error:', error);
      throw error; // Re-throw to handle in component
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveSettings().then(() => {
      setIsEditing(false);
    });
  };

  return (
    <div className={`${Set.settings} ${Set[theme]}`}>
      <h1 className={Set.title}>Settings</h1>
      {error && <div className={Set.error}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <section className={Set.section}>
          <h2>Company Information</h2>
          <label className={Set.customlabel}>
            Company Name:
            {isEditing ? (
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={Set.input}
                required
              />
            ) : (
              <div className={Set.input}>{companyName}</div>
            )}
          </label>
          <label className={Set.customlabel}>
            Address:
            {isEditing ? (
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={Set.input}
                required
              />
            ) : (
              <div className={Set.input}>{address}</div>
            )}
          </label>
        </section>

        <section className={Set.section}>
          <label className={Set.customlabel}>
            Time Zone:
            <select
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value)}
              className={Set.select}
              disabled={!isEditing}
            >
              <option value="UTC">UTC</option>
              <option value="EST">EST</option>
              <option value="PST">PST</option>
            </select>
          </label>
        </section>

        <button 
          type={isEditing ? 'submit' : 'button'} 
          onClick={!isEditing ? () => setIsEditing(true) : null}
          className={Set.button}
        >
          {isEditing ? 'Save' : 'Edit'}
        </button>
      </form>
    </div>
  );
};

export default Settings;
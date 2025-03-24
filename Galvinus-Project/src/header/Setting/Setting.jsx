import { useState, useEffect } from 'react';
import Set from './Setting.module.css'; // Import the CSS module

const Settings = () => {
  const [timeZone, setTimeZone] = useState('UTC');
  const [theme] = useState('light');
  const [isEditing, setIsEditing] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');

  // Fetch settings when the component mounts
  useEffect(() => {
    fetchSettings();
  }, []);

  // Fetch current settings from the backend
  const fetchSettings = async () => {
    try {
      const response = await fetch('http://localhost:4000/settings');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setCompanyName(data.companyName || '');
      setAddress(data.companyAddress || '');
      setTimeZone(data.timezone || 'UTC');
    } catch (error) {
      console.error('Error fetching settings:', error.message);
    }
  };

  // Save updated settings to the backend
  const saveSettings = async () => {
    try {
      const response = await fetch('http://localhost:4000/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          companyName,
          companyAddress: address,
          timezone: timeZone,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to save settings');
      }
      const data = await response.json();
      console.log('Settings saved:', data);
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    saveSettings(); // Save settings to the backend
    setIsEditing(false);
  };

  return (
    <div className={`${Set.settings} ${Set[theme]}`}>
      <h1 className={Set.title}>Settings</h1>

      <section className={Set.section}>
        <h2>Company Information</h2>
        <form>
          <label className={Set.customlabel}>
            Company Name:
            {isEditing ? (
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className={Set.input}
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
              />
            ) : (
              <div className={Set.input}>{address}</div>
            )}
          </label>
        </form>
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

      <button onClick={isEditing ? handleSaveClick : handleEditClick} className={Set.button}>
        {isEditing ? 'Save' : 'Edit'}
      </button>
    </div>
  );
};

export default Settings;
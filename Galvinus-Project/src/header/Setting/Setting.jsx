import { useState } from 'react';
import Set from './Setting.module.css'; // Import the CSS module

const Settings = () => {
  // const [language, setLanguage] = useState('English');
  const [timeZone, setTimeZone] = useState('UTC');
  const [theme, setTheme] = useState('light');
  // const [fontSize, setFontSize] = useState('medium');
  // const [layout, setLayout] = useState('default');

  const handleResetPassword = () => {
    // Implement password reset logic
    alert('Password reset link sent to your email.');
  };

  const handleResetSettings = () => {
    // Implement reset settings logic
    // setLanguage('English');
    setTimeZone('UTC');
    setTheme('light');
    // setFontSize('medium');
    // setLayout('default');
    alert('Settings reset to default.');
  };

  return (
    <div className={`${Set.settings} ${Set[theme]}`}> {/* Apply CSS classes */}
      <h1 className={Set.title}>Settings</h1> {/* Apply CSS class */}

      <section className={Set.section}>
        <h2>Company Information</h2>
        <form>
          <label className={Set.customlabel}>
            Company Name:
            <div className={Set.input}>Galvinus</div>
          </label>
          <label className={Set.customlabel}>
            Address:
            <div className={Set.input}>Bangalore</div>
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
          >
            <option value="UTC">UTC</option>
            <option value="EST">EST</option>
            <option value="PST">PST</option>
          </select>
        </label>
      </section>

      <section className={Set.section}>
        <h2>Password Reset</h2>
        <button onClick={handleResetPassword} className={Set.button}>
          Reset Password
        </button>
      </section>

      <section className={Set.section}>
        <h2>General Settings</h2>
        <button onClick={handleResetSettings} className={Set.button}>
          Reset Settings
        </button>
      </section>
    </div>
  );
};

export default Settings;
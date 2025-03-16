import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import TipsProvider from "./contexts/TipsContext";
import TipsPageHeaderProvider from "./contexts/TipsPageHeaderContext";
import FormPageHeaderProvider from "./contexts/FormPageHeaderContext.jsx";
import DataProvider from "./contexts/DataContext.jsx";
import ProfileProvider from "./contexts/ProfileContext.jsx";
import {NotificationProvider} from "./contexts/NotificationContext.jsx";
import CollaborationProvider from "./contexts/CollaborationContext.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TipsProvider>
      <TipsPageHeaderProvider>
        <FormPageHeaderProvider>
          <DataProvider>
            <ProfileProvider>
              <NotificationProvider>
                <CollaborationProvider>
                  <AuthProvider>
                    <App />
                  </AuthProvider>
                </CollaborationProvider>
              </NotificationProvider>
            </ProfileProvider>
          </DataProvider>
        </FormPageHeaderProvider>
      </TipsPageHeaderProvider>
    </TipsProvider>
  </StrictMode>
);

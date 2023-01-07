import { Routes, Route, Navigate } from 'react-router-dom';
import { Profile } from 'modules';

export default function AccountSettings() {
  return (
    <Routes>
      <Route path="general" element={<Profile />} />
      <Route path="*" element={<Navigate to="/client/dashboard/account-settings/general" />} />
    </Routes>
  );
}

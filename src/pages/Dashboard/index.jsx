import { Route, Routes } from "react-router-dom";
import { dashboardPages } from "pages";
import { DashboardLayout } from "layout";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <Routes>
        {dashboardPages.map(({ path, Component }) => (
          <Route
            key={path}
            path={`${path}`}
            index={path === "/"}
            element={<Component />}
          />
        ))}
      </Routes>
    </DashboardLayout>
  )
}

export default Dashboard;
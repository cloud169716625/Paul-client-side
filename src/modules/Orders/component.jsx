import { Routes, Route } from 'react-router-dom';
import { Orders as OrdersPage } from './pages'
import { OrderDetail as OrderDetailPage } from './pages'

export default function Orders() {
  return (
    <Routes>
      <Route path="/" element={<OrdersPage />} />
      <Route path="/detail/:id" element={<OrderDetailPage />} />
    </Routes>
  );
}

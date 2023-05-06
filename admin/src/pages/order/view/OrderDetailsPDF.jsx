import React from 'react';
import { useParams } from 'react-router-dom';
import OrderDetailsPdf from '@/components/pdf/OrderDetails';
import { useGetOrderQuery } from '@/store/apiSlices/orderApiSlice';

function OrderDetailsPDFView() {
  const { id } = useParams();
  const { data: order, isLoading } = useGetOrderQuery(id);

  if (isLoading) return null;

  return (
    <div style={{ width: '100%', height: '100%', background: '#000' }}>
      <OrderDetailsPdf order={order} />
    </div>
  );
}

export default OrderDetailsPDFView;

export const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5151/api/checkout');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
  export const fetchDeliveries = async () => {
    try {
      const response = await fetch('http://localhost:5151/api/delivery');
      if (!response.ok) {
        throw new Error('Failed to fetch deliveries');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  
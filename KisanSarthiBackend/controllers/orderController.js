import Order from '../models/Order.js'

export const PlaceOrder = async (req, res) => {

  try {
    const { UserID, MachineID, PaymentID, OrderStatus, TotalAmount  , VendorID } = req.body;

    const newOrder = await Order.create({
      UserID,
      MachineID,
      TotalAmount,
      PaymentID,       
      OrderStatus,
      VendorID          
    });

    return res.status(201).json({
      message: "Order placed successfully....",
      order: newOrder
    });
  } catch (error) {
    console.error("Error placing order:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


//---------------------------------------Get-Orders--------------------------------------------------


export const GetOrders = async (req, res,next) => {
    try {
      const { userId } = req.params;
      
      const orders = await Order.findOne({
        where: { UserID: userId }
      });
  
   
      if (!orders) {
        return res.status(404).json({ message: "User id not found" });
      }
  
      return res.status(200).json(orders);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  
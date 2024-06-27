const OrderSch = require("../Models/OrderSchema");
const ProductSch = require("../Models/ProductSchema");

const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: "ProductID and Quantity are required" });
  }
  try {
    const product = await ProductSch.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cartItem = await OrderSch.findOne({ user: req.user.id, product: productId });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = new OrderSch({
        user: req.user.id,
        product: productId,
        quantity: quantity,
      });
      await cartItem.save();
    }

    res.status(201).json({ message: "Item Added To Cart", result: cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const getcarItems = async (req, res) => {
  try {
    const orders = await OrderSch.find({ user: req.user.id }).populate('product');
    return res.status(200).json({
      message: "Order Items Fetched Successfully",
      result: orders,
      count: orders.length,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};




module.exports = { addToCart, getcarItems };

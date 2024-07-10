const OrderSch = require("../Models/OrderSchema");
const ProductSch = require("../Models/ProductSchema");

const addToCart = async (req, res) => {
  var { productId, quantity, cartPage } = req.body;
  console.log(productId , cartPage);

  if (!productId || !quantity) {
    return res
      .status(400)
      .json({ message: "ProductID and Quantity are required" });
  }
  try {
    const product = await ProductSch.findById(productId);
    console.log(product);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cartItem = await OrderSch.findOne({
      user: req.user.id,
      product: productId,
    });
    if (cartItem) {
      if (cartPage == "add") {
        quantity = 1;
      }
      if (cartPage == "remove") {
        quantity = -1;
      }
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
    const orders = await OrderSch.find({ user: req.user.id }).populate(
      "product"
    );
    return res.status(200).json({
      message: "Order Items Fetched Successfully",
      result: orders,
      count: orders.length,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const deleteCartItem = async (req, res) => {
  const { productId } = req.body;
  try {
    const product = await OrderSch.findOne({
      _id: productId,
    });

    if (!product) {
      return res.status(400).json({ message: "Product ID is required" });
    }
    await OrderSch.findByIdAndDelete(productId);
    res.status(200).json({
      message: "Item Deleted Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = { addToCart, getcarItems, deleteCartItem };

const { ProductService } = require("../models/Product");
const Cart = require("../models/cart");
const Order = require("../models/order");
const path = require("path");
const fs = require('fs');
const PDFDocument = require('pdfkit'); 

exports.getLandingPage = (req, res, next) => {
  res.render("shop/index", {
    pageTitle: "index", 
    path: "/",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true, 
    flash: req.flash(),
    message: ''
  });
};

exports.getProduct = async (req, res, next) => {
  try {
    const products = await ProductService.getAll();
    res.render("shop/product", {
      pageTitle: "Product",
      formsCSS: true,
      productCSS: true,
      products: products,
    });
  } catch (error) {
    console.log("error:", error);
  }
};

exports.getCart = async (req, res, next) => {
  const userId = req.session.user._id.toString();

  const carts = (await Cart.findCartByUserId(userId)).filter(
    (item) => item.isRemoved === false
  );

  const products = (await ProductService.getAll()).filter(
    (item) => item.isRemoved === false    
  );

  res.render("shop/cart", {
    pageTitle: "Cart",
    path: "/",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
    products: products,
    carts: carts,
  });
};

exports.getOrders = async (req, res, next) => {
  try {
    const myProduct = [];
    const user = req.user; 
    let orders = [];
    orders = (await Order.getAll()).filter(
      item => item.isCompleted === false 
      && item.user._id.toString() === req.session.user._id.toString()
      && item.isRemoved === false
    )
    const product = (await ProductService.getAll()).filter(
      item => item.isRemoved === false
    )
    orders.forEach(orderItem => {
      product.forEach(productItem => {
        orderItem.cart.forEach(cartItem => {
          if (cartItem.productId.toString() === productItem._id.toString()) {
            myProduct.push(productItem);
          }
        });
      }); 
    });

    res.render("shop/order", {
      pageTitle: "Cart",
      path: "/",
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true,
      products: myProduct,
      orders: orders[0] === undefined ? [] : orders[0],
      user: user,   
    });
  } catch (error) {
    console.error(error);
  }
};

exports.postOrders = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const carts = (await Cart.findCartByUserId(userId.toString())).filter(
      (item) => item.isRemoved === false 
    );

    const orderCollection = (await Order.getOrderByUserId(userId._id)) 
    .filter(
      (item) => (item.isCompleted === false && item.isRemoved === false)
    ); 

    if(orderCollection.length>0){
      const order = orderCollection[0];
        carts.forEach(cart => {
          let isMatch = false;
          order.cart.forEach(cartItemInOrder => {
            if (cartItemInOrder.productId.toString() === cart.productId.toString()) {
              Order.updateQtyInCart(order._id, cartItemInOrder._id, cart.qty);
              Cart.markAsRemoved(cart._id);
              isMatch = true;
            } 
          });
          if(!isMatch){
            Order.appendCart(order._id, cart);
            Cart.markAsRemoved(cart._id);
          }
        });
      }else{
      await Order.insert(carts, req.user); 
      carts.forEach(cartItem => {
        Cart.markAsRemoved(cartItem._id);
      })
    }
    res.redirect("/shop/orders");
  } catch (error) {
    console.log(error);
  }
};

exports.removedAllOrdersFromUser = async (req, res, next) => {
 try {    
    await Order.removeAllOrdersFromUser(req.user._id.toString());
    res.redirect("/shop/orders");
 } catch (error) {
    console.error(error);
 }
};

exports.completedAllOrdersFromUser = async (req, res, next) => {    
  try {
    const orderId = req.params.id;
    await Order.completeAllOrdersFromUser(req.user._id.toString());
    res.redirect(`/shop/invoices/${orderId}`);
 } catch (error) {
    console.error(error);
 }
};  

exports.getProdectDetailById = (req, res, next) => {
  ProductService.getByPk(req.params.productId)
    .then((product) => {
      res.render("shop/product-detail", {
        pageTitle: "Order",
        path: "/",
        formsCSS: true,
        productCSS: true,
        activeAddProduct: true,
        product: product,
      });
    })
    .catch(() => {
      console.log(error);
    });
};

exports.addCartById = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const productId = req.params.id;
    const isCardFind = (await Cart.findCart(userId, productId)).filter(item => item.isRemoved === false);;
    
    if (isCardFind.length === 0) {
      Cart.insert(userId, productId);
    } else {
      Cart.updateQtyByPk(isCardFind[0], 1);
    } 
    res.redirect("/cart");
  } catch (error) {
    console.log(error);
  }
};

exports.removeCartById = async (req, res, next) => {
  await Cart.markAsRemoved(req.params.id)
    .then(async (result) => {
      res.redirect("/cart");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateCartById = async (req, res, next) => {
  try {
    Cart.changeQtyByPk(req.params.id, req.body.quantity);
    res.redirect("/cart");
  } catch (error) {
    console.error(error);
  }
};

exports.getInvoice = async (req, res, next) => {
  try {
    const order = await Order.getByPk(req.params.id);

    if (!order) {
      return next(new Error('No order found'));
    }

    if (order.user.toString() !== req.session.user._id.toString()) {
      return next(new Error('Unauthorized'));
    }

    const invoicePath = path.join('data', 'invoices', `${order._id}.pdf`);
    const pdfDoc = new PDFDocument();
    const writeStream = fs.createWriteStream(invoicePath);

    // Set response headers for PDF
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `inline; filename="${order._id}.pdf"`);

    // Pipe the PDF document to both the file write stream and the HTTP response
    pdfDoc.pipe(writeStream);
    pdfDoc.pipe(res);

    // Add content to the PDF
    pdfDoc.fontSize(18).text('Invoice', { align: 'center' });
    pdfDoc.moveDown();
    pdfDoc.fontSize(12).text(`Order ID: ${order._id}`);
    pdfDoc.fontSize(12).text(`Date: ${order.createdAt.toDateString()}`);
    pdfDoc.moveDown();

    let totalPrice = 0;

    for (const cartItem of order.cart) {
      const product = await ProductService.getByPk(cartItem.productId);
      if (product) {
        const itemTotalPrice = parseInt(product.price) * cartItem.qty;
        totalPrice += itemTotalPrice;

        pdfDoc.fontSize(14).text(product.name, { underline: true });
        pdfDoc.fontSize(12).text(`Quantity: ${cartItem.qty}`);
        pdfDoc.fontSize(12).text(`Price per unit: ${product.price}`);
        pdfDoc.fontSize(12).text(`Total Price: ${itemTotalPrice} USD`);
        pdfDoc.moveDown();
      }
    }

    pdfDoc.fontSize(16).text(`Total Price for all Items: ${totalPrice} USD`, { align: 'right' });

    // End the PDF document
    pdfDoc.end();

  } catch (err) {
    console.error(err);
    return next(err);
  }
};

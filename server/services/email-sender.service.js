const nodemailer = require("nodemailer");
const { emailId, emailService,emailPassword } = require("../config/config");

function sendEmail(order, user) {
  const { _id: orderId, deliveryDate } = order;
  const { fullname, email } = user;

  var mailOptions = {
    from: emailId,
    to: email,
    subject: `Your rupeshtiwari.com order #${orderId}`,
    text: `Rupeshtiwari.com Order Confirmation
            ----------------------------------
            Hello ${fullname},

            Thank you for shopping with us.
            We'll send a confirmation when your item ship. 

            View your orders in Your orders:
            https://online-shop-ecommerce.herokuapp.com/orders
        
            Details
            Order # ${orderId}

                Arriving:
                ${deliveryDate}

                Ship to:
                ${fullname}

                Total Before Tax: ${getCurrency(
                  order.orderSubTotal + order.shippingCost
                )}
                Estimated Tax: ${getCurrency(order.estimatedTax)}

                Order Total: ${getCurrency(order.orderTotal)}
            =======================================================================================

            We hope to see you again soon.

            rupeshtiwari.com
            rupeshtiwari.com/meanjs-demo
        `,
  };

  var transporter = nodemailer.createTransport({
    service: emailService,
    auth: {
      user: emailId,
      pass: emailPassword,
    },
  });

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

function getCurrency(amount) {
  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(amount);
}

module.exports = { sendEmail };

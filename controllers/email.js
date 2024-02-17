import nodemailer from "nodemailer";
import { receipt } from "../email_template/receipt.js";

export const sendEmail = async (req, res) => {
  try {
    const {
      order_id,
      email,
      phone_number,
      deliver_instructions,
      address,
      order_items,
      total_price,
    } = req.body;
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "amugoltd@gmail.com",
        pass: process.env.EMAIL_PASS,
      },
    });

    let details = {
      from: "amugoltd@gmail.com",
      to: [email, "amugoltd@gmail.com"],
      subject: `Order Confirmed !!`,
      html: receipt(
        order_id,
        email,
        phone_number,
        deliver_instructions,
        address,
        order_items,
        total_price
      ),
    };

    console.log(order_id);

    mailTransporter.sendMail(details, (err) => {
      if (err) {
        console.log("there was an error here", err);
      } else {
        console.log("email has been sent");
      }
    });
    res.status(200).json(order_items);
    console.log("worked");
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error);
  }
};

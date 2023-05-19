/** @format */

require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // use SSL - TLS
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Booking Care" <quyenvu.uzumaki@gmail.com>',
    to: dataSend.reciverEmail,
    subject: "Thông tin đặt lịch khám bệnh",
    html: `
            <h3>Xin chào ${dataSend.patientName}</h3>
            <p>Bạn nhận được email này vì đã đặt lịch khám bệnh online trên Booking Care</p>
            <p>Thông tin đặt lịch khám bệnh:</p>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>

            <p>Nếu các thông tin trên là đúng sự thật, vui lòng click vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
            <div>
            <a href=${dataSend.redirectLink}>Click here</a>
            </div>
    <div>Xin chân thành cảm ơn</div>
            `,
  });
};

let sendAttachment = async (dataSend) => {
  return new Promise(async (resolve, reject) => {
    try {
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // use SSL - TLS
        auth: {
          user: process.env.EMAIL_APP,
          pass: process.env.EMAIL_APP_PASSWORD,
        },
      });

      let info = await transporter.sendMail({
        from: '"Booking Care" <quyenvu.uzumaki@gmail.com>',
        to: dataSend.email,
        subject: "Kết quả đặt lịch khám bệnh",
        html: `
        <h3>Xin chào ${dataSend.patientName}</h3>
        <p>Bạn đã nhận email này vì đã đặt lịch khám online trên Booking Care</p>
        <p>Thông tin đơn thuốc/hoá đơn được gửi trong file đính kèm.</p>

        <div>Xin chân thành cảm ơn</div>
        `,
        attachments: [
          {
            filename: `remedy-${
              dataSend.patientName
            }-${new Date().getTime()}.png`,
            content: dataSend.imgBase64.split("base64,")[1],
            encoding: "base64",
          },
        ],
      });
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
  sendAttachment: sendAttachment,
};

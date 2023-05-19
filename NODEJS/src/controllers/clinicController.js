/** @format */

import clinicServices from "../services/clinicService";

let createClinic = async (req, res) => {
  try {
    let infor = await clinicServices.createClinic(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

// let getAllClinic = async (req, res) => {
//   try {
//     let infor = await ClinicServices.getAllClinic();
//     return res.status(200).json(infor);
//   } catch (e) {
//     console.log(e);
//     return res.status(200).json({
//       errCode: -1,
//       errMessage: "Error from the server",
//     });
//   }
// };

// let getDetailClinicById = async (req, res) => {
//   try {
//     let infor = await ClinicServices.getDetailClinicById(req.query.id, req.query.location);
//     return res.status(200).json(infor);
//   } catch (e) {
//     console.log(e);
//     return res.status(200).json({
//       errCode: -1,
//       errMessage: "Error from the server",
//     });
//   }
// };

module.exports = {
  createClinic: createClinic,
//   getAllClinic: getAllClinic,
//   getDetailClinicById: getDetailClinicById,
};

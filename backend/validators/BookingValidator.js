const { check, body } = require("express-validator");
module.exports = {
  validateEndTime: check("endTime")
    //must not be empty
    .notEmpty()
    .isString()
    .trim(),
  validateStartTime: check("startTime")
    //must not be empty
    .notEmpty()
    //check if its string first
    .isString()
    // To delete leading and triling space
    .trim()

    // Custom validator
    .custom((startingTime, { req }) => {
      const [sh, sm, ss] = startingTime.split(":");
      const [eh, em, es] = req.body.endTime.split(":");

      const startTime = new Date(0, 0, 0, sh, sm, ss);
      const endTime = new Date(0, 0, 0, eh, em, es);

      // Validate start date so that it must
      // comes before end date
      if (startTime >= endTime) {
        throw new Error("Start date of project must be before End date");
      }
      return true;
    }),
  validateStartDate: body("startDate")
    //must not be empty
    .notEmpty()
    .isString()
    .trim()
    .custom((sdate, { req }) => {
      const [sy, sm, sd] = sdate.split("/");
      if (sd == null || sm == null || sy == null) {
        throw new Error("Not All Start Date parts complete");
      }
      return true;
    }),
};

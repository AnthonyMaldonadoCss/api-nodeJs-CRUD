const { 
  RegisterParticipantsSchema 
} = require("./participants.validators");
const Participants = require("../../models/Participants");

const register = async (req, res) => {

  console.log("LLEGUE AL CONTROLLER");
  // console.log(req.body);

  const { value, error } = RegisterParticipantsSchema(req.body);

  console.log({error});
  
  if (error) {
    return res.status(400).json({ message: error?.details[0]?.message });
  }
  
  const { name, lastName, phone } = value;

  console.log(name, lastName, phone);

  const participant = new Participants({
    name,
    lastName,
    phone
  });

  try {
    await participant.save();
    res.json({ message: 'Participant saved' });
  }
  catch (error) {
    res.status(400).json({ 
      message: error.errorResponse.errmsg || error?.errors[0]?.message || error.message
    });
  }

}

module.exports = { register }


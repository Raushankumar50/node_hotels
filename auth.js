

const passport = require('passport');
const LocalStategy = require('passport-local').Strategy;
const Person = require('./models/Person');

passport.use(new LocalStategy(async (username, password, done) => {
  // authentication logic here
  try{
    // console.log('Reveived credentials: ', username, password);
    const user = await Person.findOne({username: username});
    if(!user){
      return done(null, false, { message: 'Incorrect username.'});
    }
    const isPasswordMatch = await user.comparePassword(password);
    if(isPasswordMatch){
      return done(null, user);
    } else{
      return done(null, false, { message : 'Incorrect password.'});
    }
  } catch (err){
      return done(err);
  }
}));

module.exports = passport; // Export configured passport
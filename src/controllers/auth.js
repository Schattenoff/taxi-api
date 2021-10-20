const { getAuth } = require('firebase-admin/auth');
const firebaseAuth = require('firebase/auth');
const moment = require('moment');
const axios = require('axios');

const credentials = require('../../credentials.json');
const UserRepository = require('../repositories/user');
const { sendEmailVerificationLink, sendResetPasswordLink } = require('../helpers');
const UnauthorizedAccessError = require('../errors/unauthorized-access');

class AuthController {

  static async resetPassword(request, response) {
    const { email } = request.body;
    const user = await getAuth().getUserByEmail(email);
    const { firstName, lastName } = user.customClaims;
    const link = await getAuth().generatePasswordResetLink(email);

    await sendResetPasswordLink(email, link, firstName, lastName);
    response.status(204).send();
  }

  static async refreshToken(request, response) {
    const { refreshToken } = request.body;
    const { data } = await axios.post(`https://securetoken.googleapis.com/v1/token?key=${credentials.apiKey}`, {
      grant_type: 'refresh_token',
      refresh_token: refreshToken 
    });

    response.send({
      accessToken: data.access_token,
      expirationTime: 3600,
      refreshToken: data.refresh_token
    });
  }

  static async login(request, response) {
    const { email, password } = request.body;
    const user = await getAuth().getUserByEmail(email);
    const userData = await UserRepository.getUserById(user.uid);

    if (!user.emailVerified) {
      throw new UnauthorizedAccessError('Your account is not activated. Please verify your email.');
    }
    if (userData.blockedUntil && moment(userData.blockedUntil).isBefore()) {
      userData.blocked = false;
      await UserRepository.update(userData.id, {
        blocked: false,
        blockedUntil: null
      });
    }
    if (userData.blocked) {
      throw new UnauthorizedAccessError(
        `Your account is blocked.${userData.blockedUntil ? ` You will be able to login at ${moment(userData.blockedUntil).format('DD MMMM YYYY HH:mm:ss')}` : ''}`
      );
    }

    const authentication = await firebaseAuth.signInWithEmailAndPassword(firebaseAuth.getAuth(), email, password);
  
    response.send(authentication.user.stsTokenManager);
  }

  static async register(request, response) {
    const { email, password, role, firstName, lastName, car } = request.body;
    const createdUser = await getAuth().createUser({email, password, role});
    const verificationLink = await getAuth().generateEmailVerificationLink(email);

    await getAuth().setCustomUserClaims(createdUser.uid, {role, firstName, lastName, car});
    await sendEmailVerificationLink(email, verificationLink, firstName, lastName);
    await UserRepository.createUser(createdUser.uid, email, role, firstName, lastName, car);
    
    response.status(204).send();
  }

}

module.exports = AuthController;

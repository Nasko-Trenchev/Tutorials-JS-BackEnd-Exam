const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authControler');
const {isAuthenticatedHome} = require('./middlewares/authMiddleware')

router.get('/', isAuthenticatedHome, homeController.getHomePage)

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/logout', authController.getLogout);

//TODO: Routes

module.exports = router;
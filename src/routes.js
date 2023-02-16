const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authControler');
const courseController = require('./controllers/courseController');
const {isAuthenticatedHome} = require('./middlewares/authMiddleware')
const {isAuthenticated} = require('./middlewares/authMiddleware');

router.get('/', isAuthenticatedHome, homeController.getHomePage)

router.get('/login', authController.getLogin);
router.post('/login', authController.postLogin);
router.get('/register', authController.getRegister);
router.post('/register', authController.postRegister);
router.get('/logout', authController.getLogout);

router.get('/create', courseController.getCreatePage);
router.post('/create', courseController.postCreatePage);

router.get('/details/:id', courseController.getDetailPage);
router.get('/enroll/:id', courseController.enrollCourse);

//TODO: Routes

module.exports = router;
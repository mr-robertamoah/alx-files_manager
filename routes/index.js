// eslint-disable-next-line no-unused-vars
import { Express } from 'express';
import AppController from '../controllers/AppController';
import AuthController from '../controllers/AuthController';
import UsersController from '../controllers/UsersController';
import FilesController from '../controllers/FilesController';
import { authenticateBasic, authenticateToken } from '../middlewares/auth';
import { APIError, errorResponse } from '../middlewares/error';

/**
 * Injects routes with their handlers to the given Express application.
 * @param {Express} api
 */
const withRoutes = (api) => {
  api.get('/status', AppController.getStatus);
  api.get('/stats', AppController.getStats);

  api.get('/connect', authenticateBasic, AuthController.getConnect);
  api.get('/disconnect', authenticateToken, AuthController.getDisconnect);

  api.post('/users', UsersController.postNew);
  api.get('/users/me', authenticateToken, UsersController.getMe);

  api.post('/files', authenticateToken, FilesController.postUpload);
  api.get('/files/:id', authenticateToken, FilesController.getShow);
  api.get('/files', authenticateToken, FilesController.getIndex);
  api.put('/files/:id/publish', authenticateToken, FilesController.putPublish);
  api.put('/files/:id/unpublish', authenticateToken, FilesController.putUnpublish);
  api.get('/files/:id/data', FilesController.getFile);

  api.all('*', (req, res, next) => {
    errorResponse(new APIError(404, `Cannot ${req.method} ${req.url}`), req, res, next);
  });
  api.use(errorResponse);
};

export default withRoutes;

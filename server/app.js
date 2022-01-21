const express = require('express');
const app = express();

const { mongoose } = require('./database/mongoose');

const bodyParser = require('body-parser');

const { Category, Operation, User } = require('./database/models');

const jwt = require('jsonwebtoken');

app.use(bodyParser.json());

app.use(function (request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET, sPOST, HEAD, OPTIONS, PUT, PATCH, DELETE");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id");

    response.header(
        'Access-Control-Expose-Headers',
        'x-access-token, x-refresh-token'
    );

    next();
});

let authenticate = (request, response, next) => {
    let token = request.header('x-access-token');

    jwt.verify(token, User.getJWTSecret(), (err, decoded) => {
        if (err) {
            response.status(401).send(err);
        } else {
            request.user_id = decoded._id;
            next();
        }
    });
}

let verifySession = (request, response, next) => {
    let refreshToken = request.header('x-refresh-token');

    let _id = request.header('_id');

    User.findByIdAndToken(_id, refreshToken).then((user) => {
        if (!user) {
            return Promise.reject({
                'error': 'User not found. Make sure that the refresh token and user id are correct'
           });
        }

        request.user_id = user._id;
        request.userObject = user;
        request.refreshToken = refreshToken;

        let isSessionValid = false;

        user.sessions.forEach((session) => {
            if (session.token === refreshToken) {
                if (User.hasRefreshTokenExpired(session.expiresAt) === false) {
                    isSessionValid = true;
                }
            }
        });

        if (isSessionValid) {
            next();
        } else {
            return Promise.reject({
                'error': 'Refresh token has expired or the session is invalid'
            })
        }

    }).catch((e) => {
        response.status(401).send(e);
    })
}

app.get('/categories', authenticate, (request, response) => {
    Category.find({
        _userId: request.user_id
    }).then((categories) => {
        response.send(categories);
    }).catch((e) => {
        response.send(e);
    });
})

app.post('/categories', authenticate, (request, response) => {
    let title = request.body.title;
    let description = request.body.description;

    let newCategory = new Category({
        title,
        description,
        _userId: request.user_id
    });
    newCategory.save().then((categoryDocument) => {
        response.send(categoryDocument);
    })
});

app.patch('/categories/:id', authenticate, (request, response) => {
    Category.findOneAndUpdate({ _id: request.params.id, _userId: request.user_id }, {
        $set: request.body
    }).then(() => {
        response.send({ 'message': 'Updated successfully'});
    });
});

app.delete('/categories/:id', authenticate, (request, response) => {
    Category.findOneAndRemove({
        _id: request.params.id,
        _userId: request.user_id
    }).then((removedCategoryDocument) => {
        response.send(removedCategoryDocument);
        deleteOperationsFromCategory(removedCategoryDocument._id);
    });
});

app.get('/categories/:categoryId/operations', authenticate, (request, response) => {
    Operation.find({
        _categoryId: request.params.categoryId
    }).then((operations) => {
        response.send(operations);
    });
});

app.post('/categories/:categoryId/operations', authenticate, (request, response) => {
    Category.findOne({
        _id: request.params.categoryId,
        _userId: request.user_id
    }).then((category) => {
        if (category) {
            return true;
        }

        return false;
    }).then((canCreateOperation) => {
        if (canCreateOperation) {
            let newOperation = new Operation({
                category: request.body.category,
                type: request.body.type,
                sum: request.body.sum,
                date: request.body.date,
                description: request.body.description,
                _categoryId: request.params.categoryId
            });
            newOperation.save().then((newOperationDocument) => {
                response.send(newOperationDocument);
            })
        } else {
            response.sendStatus(404);
        }
    })
});

app.patch('/categories/:categoryId/operations/:operationId', authenticate, (request, response) => {
    Category.findOne({
        _id: request.params.categoryId,
        _userId: request.user_id
    }).then((category) => {
        if (category) {
            return true;
        }

        return false;
    }).then((canUpdateOperations) => {
        if (canUpdateOperations) {
            Operation.findOneAndUpdate({
                _id: request.params.operationId,
                _categoryId: request.params.categoryId
            }, {
                    $set: request.body
                }
            ).then(() => {
                response.send({ message: 'Updated successfully.' })
            })
        } else {
            response.sendStatus(404);
        }
    })
});

app.delete('/categories/:categoryId/operations/:operationId', authenticate, (request, response) => {
    Category.findOne({
        _id: request.params.categoryId,
        _userId: request.user_id
    }).then((category) => {
        if (category) {
            return true;
        }

        return false;
    }).then((canDeleteOperations) => {
        
        if (canDeleteOperations) {
            Operation.findOneAndRemove({
                _id: request.params.operationId,
                _categoryId: request.params.categoryId
            }).then((removedOperationDocument) => {
                response.send(removedOperationDocument);
            })
        } else {
            response.sendStatus(404);
        }
    });
});

app.post('/users', (request, response) => {
    let body = request.body;
    let newUser = new User(body);

    newUser.save().then(() => {
        return newUser.createSession();
    }).then((refreshToken) => {
        return newUser.generateAccessAuthToken().then((accessToken) => {
            return { accessToken, refreshToken }
        });
    }).then((authTokens) => {
        response
            .header('x-refresh-token', authTokens.refreshToken)
            .header('x-access-token', authTokens.accessToken)
            .send(newUser);
    }).catch((e) => {
        response.status(400).send(e);
    })
})

app.post('/users/login', (request, response) => {
    let email = request.body.email;
    let password = request.body.password;

    User.findByCredentials(email, password).then((user) => {
        return user.createSession().then((refreshToken) => {
            return user.generateAccessAuthToken().then((accessToken) => {
                return { accessToken, refreshToken }
            });
        }).then((authTokens) => {
            response
                .header('x-refresh-token', authTokens.refreshToken)
                .header('x-access-token', authTokens.accessToken)
                .send(user);
        })
    }).catch((e) => {
        response.status(400).send(e);
    });
})

app.get('/users/me/access-token', verifySession, (request, response) => {
    request.userObject.generateAccessAuthToken().then((accessToken) => {
        response.header('x-access-token', accessToken).send({ accessToken });
    }).catch((e) => {
        response.status(400).send(e);
    });
})

let deleteOperationsFromCategory = (_categoryId) => {
    Operation.deleteMany({
        _categoryId
    }).then(() => {
        console.log("Operations from " + _categoryId + " were deleted!");
    })
}

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});
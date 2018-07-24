import axios from 'axios'
import qs from 'qs'

/**
 *
 */
export default class client {
    constructor(apiUrl) {
        this.url = apiUrl

        // Create an axios instance that will be used to send API requests, and store it as class attribute.
        this.httpClient = axios.create({ baseURL: this.url })

        // Need to defined a serializer function for parameters.
        this.httpClient.defaults.paramsSerializer = params => {
            return qs.stringify(params, { arrayFormat: 'brackets' })
        }

        // Initialize authorization header to false, will be set to a value when login action is fulfilled.
        this.authorizationHeader = false;
    }

    /**
     *
     * @param authorizationToken
     */
    setAuthorizationToken(authorizationToken) {
        this.authorizationHeader = `Bearer ${authorizationToken}`;
    }

    /**
     *
     * @param node
     * @returns Promise
     */
    createNode(node) {
        var self = this
        return new Promise((fulfill, reject) => {
            return self.httpClient
                .post('/node', node, { headers: { 'Authorization': this.authorizationHeader } } )
                .then(response => fulfill(response.data))
                .catch(error => reject(error))
        })
    }

    /**
     *
     * @param node
     * @returns Promise
     */
    deleteNode(nodeId) {
        var self = this;
        return new Promise((fulfill, reject) => {
            return self.httpClient
                .delete('/node/' + nodeId, { headers: { 'Authorization': this.authorizationHeader } })
                .then(response => fulfill(response.data))
                .catch(error => reject(error))
        })
    }

    /**
     *
     * @param node
     * @returns Promise
     */
    updateNode(node) {
        var self = this;
        return new Promise((fulfill, reject) => {
            return self.httpClient
                .put('/node/' + node._id, node, { headers: { 'Authorization': this.authorizationHeader } })
                .then(response => fulfill(response.data))
                .catch(error => reject(error))
        })
    }

    /**
     *
     * @param node
     * @returns Promise
     */
    stickNode(nodeId, sticky) {
        var self = this
        return new Promise((fulfill, reject) => {
            return self.httpClient
                .put('/node/' + node._id, { sticky: sticky }, { headers: { 'Authorization': this.authorizationHeader } })
                .then(response => fulfill(response.data))
                .catch(error => reject(error))
        })
    }

    /**
     *
     * @param node
     * @returns Promise
     */
    reportObject(param) {
        var self = this
        return new Promise((fulfill, reject) => {
            return self.httpClient
                .put('/report', param, { headers: { 'Authorization': this.authorizationHeader } })
                .then(response => fulfill(response.data))
                .catch(error => reject(error))
        })
    }

    /**
     *
     * @param parentId
     * @param page
     * @param perPage
     * @returns Promise
     */
    getNodePaginatedChildren(parentId, page, perPage, sort = {}) {
        var self = this;
        return new Promise((fulfill, reject) => {
            self.httpClient
                .post('/node/getPaginatedChildren', {
                    parentId: parentId,
                    page: page,
                    perPage: perPage,
                    sort: sort
                }, {
                    headers: { 'Authorization': this.authorizationHeader }
                })
                .then(response => fulfill(response.data))
                .catch(error => reject(new Error(error)));
        });
    }

    /**
     *
     * @param nodeId
     * @returns Promise
     */
    getNodeById(nodeId) {
        var self = this;
        return new Promise((fulfill, reject) => {
            self.httpClient
                .get('/node/' + nodeId, { headers: { 'Authorization': this.authorizationHeader } })
                .then(response => fulfill(response.data))
                .catch(error => reject(new Error(error)))
        })
    }

    /**
     *
     *
     * @returns Promise
     */
    getRolePaginated(page, perPage, sort = {}) {
        var self = this
        return new Promise((fulfill, reject) => {
            self.httpClient
                .post('/role/getPaginated', {
                    page: page,
                    perPage: perPage,
                    sort: sort
                }, { headers: { 'Authorization': this.authorizationHeader } })
                .then(response => fulfill(response.data))
                .catch(error => reject(new Error(error)))
        })
    }

    /**
     *
     *
     * @param node
     * @returns Promise
     */
    createRole(role) {
        var self = this
        return new Promise((fulfill, reject) => {
            return self.httpClient
                .put('/role', role, { headers: { 'Authorization': this.authorizationHeader } })
                .then(response => fulfill(response.data))
                .catch(error => reject(error))
        })
    }

    /**
     *
     *
     * @param user
     * @returns Promise
     */
    deleteRole(roleId) {
        var self = this
        return new Promise((fulfill, reject) => {
            return self.httpClient
                .delete('/role/' + roleId, { headers: { 'Authorization': this.authorizationHeader } })
                .then(response => fulfill(response.data))
                .catch(error => reject(error))
        })
    }

    /**
     *
     *
     * @returns Promise
     */
    getUser(authorId) {
        var self = this;
        return new Promise((fulfill, reject) => {
            return self.httpClient
                .get('/user/' + authorId, { headers: { 'Authorization': this.authorizationHeader } })
                .then(response => fulfill(response.data))
                .catch(error => reject(new Error(error)));
        });
    }

    /**
     *
     *
     * @returns Promise
     */
    getUserPaginated(page, perPage, sort = {}) {
        var self = this;
        return new Promise((fulfill, reject) => {
            return self.httpClient
                .post('/user/getPaginated', {
                    page: page,
                    perPage: perPage,
                    sort: sort
                }, { headers: { 'Authorization': this.authorizationHeader } })
                .then(response => fulfill(response.data))
                .catch(error => reject(new Error(error)));
        });
    }

    /**
     *
     *
     * @param user
     * @returns Promise
     */
    createUser(user) {
        var self = this;
        return new Promise((fulfill, reject) => {
            return self.httpClient
                .put('/user', user, { headers: { 'Authorization': this.authorizationHeader } })
                .then(response => fulfill(response.data))
                .catch(error => reject(error));
        });
    }

    /**
     *
     *
     * @param user
     * @returns Promise
     */
    deleteUser(userId) {
        var self = this
        return new Promise((fulfill, reject) => {
            return self.httpClient
                .delete('/user/' + userId, { headers: { 'Authorization': this.authorizationHeader } })
                .then(response => fulfill(response.data))
                .catch(error => reject(error))
        })
    }

    /**
     *
     *
     * @param user
     * @returns Promise
     */
    createReport(report) {
        var self = this;
        return new Promise((fulfill, reject) => {
            return self.httpClient
                .put('/report', report, { headers: { 'Authorization': this.authorizationHeader } })
                .then(response => fulfill(response.data))
                .catch(error => reject(error));
        });
    }

    /**
     *
     *
     * @param username
     * @param md5password
     * @returns Promise
     */
    login(username, password) {
        var self = this
        return new Promise((fulfill, reject) => {
            return self.httpClient
                .post('/user/login', {
                    username: username,
                    password: password
                })
                .then(response => fulfill(response.data))
                .catch(error => reject(error))
        })
    }
}
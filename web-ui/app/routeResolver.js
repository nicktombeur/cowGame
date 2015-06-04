define(['angular'], function () {
    /**
     * this service returns a valid route definition object
     * for the angular route 'when' method
     *
     * @type {*|module}
     */
    angular.module('routeResolver', [])

        .provider('routeResolver', function () {

            this.$get = function () {
                return this;
            };

            /**
             * configuration object
             */
            this.routeConfig = (function () {

                var viewsDirectory = '',

                    setViewsDirectory = function (viewsDir) {
                        viewsDirectory = viewsDir;
                    },

                    getViewsDirectory = function () {
                        return viewsDirectory;
                    };

                return {
                    setViewsDirectory: setViewsDirectory,
                    getViewsDirectory: getViewsDirectory

                };
            }());

            /**
             * build and return the route defniation object
             */
            this.route = function (routeConfig) {

                var resolve = function (conf) {

                        var _path = conf.path || conf.name;

                        var _name = conf.name || '';

                        var root = '/' + _path + '/';

                        var routeDef = {};

                        routeDef.templateUrl = routeConfig.getViewsDirectory() + root + _name + '.html';
                        routeDef.controller = capitalizeFirstLetter(_name) + 'Controller';
                        routeDef.controllerAs = _name + 'Ctrl';
                        routeDef.secure = (conf.secured) ? conf.secured : false;
                        routeDef.resolve = {

                            load: ['$q', '$rootScope', function ($q, $rootScope) {

                                /**
                                 * init the dependencies array
                                 * @type {Array}
                                 */
                                var dependencies = [routeConfig.getViewsDirectory() + root + _name + 'Ctrl.js'];

                                /**
                                 * add services to dependencies array
                                 */
                                if (conf.services) {
                                    var service;
                                    for (service in conf.services) {
                                        if (conf.services.hasOwnProperty(service)) {
                                            if(conf.services[service][0] == '/'){
                                                dependencies.push(routeConfig.getViewsDirectory() + conf.services[service] + '.js');
                                            }else{
                                                dependencies.push(routeConfig.getViewsDirectory() + root + conf.services[service] + '.js');
                                            }

                                        }
                                    }
                                }
                                return resolveDependencies($q, $rootScope, dependencies);
                            }]
                        };

                        return routeDef;
                    },

                    /**
                     * load the required dependencies, resolve
                     * a promise on sucsses
                     * @param $q
                     * @param $rootScope
                     * @param dependencies
                     * @returns {Function|promise}
                     */
                    resolveDependencies = function ($q, $rootScope, dependencies) {
                        var defer = $q.defer();
                        require(dependencies, function () {
                            defer.resolve();
                            $rootScope.$apply()
                        });

                        return defer.promise;
                    };

                return {
                    resolve: resolve
                }

            }(this.routeConfig);

        });

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});
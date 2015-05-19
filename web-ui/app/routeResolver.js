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
                        viewsDirectory = viewsDir + '/';
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

                var resolve = function (view, services) {

                        var viewDir = view + '/';
                        var routeDef = {};

                        routeDef.templateUrl = routeConfig.getViewsDirectory() + viewDir + view + '.html';
                        routeDef.controller = capitalizeFirstLetter(view) + 'Controller';
                        routeDef.controllerAs = view + 'Ctrl';
                        routeDef.resolve = {

                            load: ['$q', '$rootScope', function ($q, $rootScope) {

                                /**
                                 * init the dependencies array
                                 * @type {Array}
                                 */
                                var dependencies = [routeConfig.getViewsDirectory() + view + '/' + view + 'Ctrl.js'];

                                /**
                                 * add services to dependencies array
                                 */
                                if (services) {
                                    var service;
                                    for (service in services) {
                                        if (services.hasOwnProperty(service)) {
                                            dependencies.push(routeConfig.getViewsDirectory() + viewDir + '/' + services[service] + '.js');
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
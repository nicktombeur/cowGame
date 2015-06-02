define(['app.service'], function (services) {
    services.register.factory('cowService',["$http", function ($http) {

        var field = [];


        return {
            getSelectedCubesHTTP: function (gameId) {
                return $http.get('/api/v1/field/' + gameId)
                    .then(
                    function (response) {
                        return {
                            title: response.data.title,
                            cost: response.data.price
                        };
                    },
                    function (httpError) {
                        // translate the error
                        throw httpError.status + " : " +
                        httpError.data;
                    });
            },
            getSelectedCubes: function (cube) {
                var BreakException = {};

                try {
                    field.forEach(function (el) {
                        if (el.name === cube.name) throw BreakException;
                    });
                } catch (e) {
                    if (e !== BreakException) throw e;
                    return true;
                }

                return false;
            },
            addUser: function (cubeName) {
                field.push(cubeName);
            }
        }

    }]);

    services.register.factory('cowDialogService', function () {
        return {
            open: function(elementId,onClose) {
                $('#' + elementId).openModal({complete:onClose});
            },
            close:function(elementId,onClose){
                $('#' +elementId).closeModal({complete:onClose});
            },
            isOpen: function(elementId){
                return $('#' + elementId).is(":visible");
            },
            reset: function(){
                $(".active").removeClass("active");
            }
        };
    });

    services.register.factory('cowNavService',function(){
        var heightNav;

        return {
            init: function(){
                heightNav = $("nav").height()/2;

                $("nav").hide();
                $("footer").hide();
                $(".mdi-action-help").show();
            }
            ,isOpen: function(elementId){
                return $('#' + elementId).is(":visible");
            },
            displayNav: function(event,mouse2D){
                if(event.clientY < heightNav){
                    $("nav").slideDown();
                }
                else if(event.clientY > heightNav*2){
                    $("nav").slideUp();
                    mouse2D.x = ( event.clientX / window.innerWidth  ) * 2 - 1;
                    mouse2D.y = -( event.clientY / (window.innerHeight) ) * 2 + 1;
                }
            },
            reset: function(){
                $("nav").slideDown();
                $("footer").show();

            }
        }
    });
});

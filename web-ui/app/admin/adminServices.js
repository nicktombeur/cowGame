define(['app.service'], function (services) {
    services.factory('adminService', ["$http", function ($http) {
        return {
            getSelectedCubesHTTP: function (gameId) {
                return $http.get('/api/v1/admin/' + gameId)
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
            getGames: function(){
                return [{id:"1234",title:"First Game",shortDescription: "First Game description",fullDescription:"ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf"},
                        {id:"123453",title:"First Game",shortDescription: "First Game description",fullDescription:"ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf"},
                        {id:"123453",title:"First Game",shortDescription: "First Game description",fullDescription:"ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf"},
                        {id:"123453",title:"First Game",shortDescription: "First Game description",fullDescription:"ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf"},
                        {id:"123453",title:"First Game",shortDescription: "First Game description",fullDescription:"ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf"},
                        {id:"123453",title:"First Game",shortDescription: "First Game description",fullDescription:"ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf"},
                        {id:"123453",title:"First Game",shortDescription: "First Game description",fullDescription:"ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf"},
                        {id:"123453",title:"First Game",shortDescription: "First Game description",fullDescription:"ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf"},
                        {id:"123453",title:"First Game",shortDescription: "First Game description",fullDescription:"ezufohezuofzeufhezufohezufhezufheuzifheziufhezuifhezf"},
                        {id:"12343434",title:"First Game",shortDescription: "First Game description",fullDescription:"Dieper afzien aan sterke are gezift herten gif. Kongostaat verwachten middellijn gas ongebruikt feestdagen buitendien mee. Koopman genomen javanen ik nu ontdekt op menigte. Bakken europa tunnel invoer zullen dat kamper zoo. Leveren zwijnen hoogere duivels sombere bak van dik lot. Uit stam hier aan acre zin. Schuld forten zeggen elk bij minste jungle leggen een. Dragen aan bouwde lappen loopen rubben ceylon nog. De afkoopen ad vreemden er af scheppen gewonnen. "}]
            }

        }
    }]);
});
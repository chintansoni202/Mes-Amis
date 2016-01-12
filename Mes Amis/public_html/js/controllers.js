angular.module('app.controllers', ["firebase"])

        .controller('myFeedsCtrl', function ($scope, $rootScope) {
            $rootScope.firebase = new Firebase("https://mes-amis.firebaseio.com/");
        })

        .controller('loginCtrl', function ($scope, $rootScope, $firebaseArray) {
            //CREATE A FIREBASE REFERENCE
//            var ref = new Firebase("https://sf7fanvxwxt.firebaseio-demo.com/");

            var ref = $rootScope.firebase;

            ref.authWithPassword({
                email: "bobtony@firebase.com",
                password: "correcthorsebatterystaple"
            }, function (error, authData) {
                if (error) {
                    console.log("Login Failed!", error);
                } else {
                    console.log("Authenticated successfully with payload:", authData);
                }
            });
        })

        .controller('signupCtrl', function ($scope, $rootScope, $ionicPopup) {

            $scope.user = {
                email: "",
                password: ""
            };

            $scope.signup = function () {
                var ref = $rootScope.firebase;
                ref.createUser({
                    email: $scope.user.email,
                    password: $scope.user.password
                }, function (error, userData) {
                    console.log(JSON.stringify(error));
                    console.log(JSON.stringify(userData));
                    if (error) {
                        console.log("Error creating user: " + error.code);
                    } else {
                        console.log("Successfully created user account with uid: " + userData.uid);
                    }

                    var alertPopup = $ionicPopup.alert({
                        title: 'Success',
                        template: 'You have successfully registered !!!'
                    });

                    alertPopup.then(function (res) {
                        $ionicHistory.goBack();
                    });
                });
            };
        });
App.controller("recoverCtrl", ['$scope', '$http', 'ngDialog', 'PagerExtends', 'layerAlert', 'serverUrls', 'PcService', '$interval', '$state',
	function($scope, $http, ngDialog, PagerExtends, layerAlert, serverUrls, PcService, $interval, $state) {
		$scope.showError = false;
		$scope.recover = {};
		$scope.recover.phone = "";
		$scope.first = true;
		$scope.newp = {};
		$scope.sendBtn = true;
		$scope.sendValue = "60秒后重新发送";

		/*var userInfo = JSON.parse(localStorage.getItem("userInfo"));
		$scope.recover.residentStatus = userInfo.count;
*/
		$scope.isNull = function(str) {
			if(!str) {
				return true;
			} else {
				return false;
			}
		};

		$scope.isFilter = function(str) {
			if(!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(str.phone))) {
				return true;
			} else {
				return false;
			}
		};

		//xx秒后重新发送验证码
		$scope.lazySend = function() {
			var ct = 60;
			$interval(function() {
				if(ct > 0) {
					ct--;
					$scope.sendValue = ct + "秒后重新发送";
				} else {
					$scope.sendBtn = false;
					$scope.sendValue = "发送验证码";
				}
			}, 1000, 60).then(function() {
				$scope.sendBtn = false;
				$scope.sendValue = "发送验证码";
			});
		};

		//返回上一步
		$scope.backToPre = function() {
			$state.go("page.login");
		};

		//发送验证码
		$scope.sendPassward = function() {
			$scope.sendBtn = true;
			var isPhoneNull = $scope.isNull($scope.recover.phone);
			var isNameNull = $scope.isNull($scope.recover.name);
			var isFilter = $scope.isFilter($scope.recover);
			if(isPhoneNull || isNameNull) {
				layerAlert.autoclose("用户账号、手机号码不能为空！");
				return;
			}
			if(isFilter) {
				layerAlert.autoclose("请输入正确的手机号码！");
				return;
			}
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.veriFicationcode + "?residentStatus=" + $scope.recover.name + "&phone=" + $scope.recover.phone
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("短信已发送，请注意查收！");
					$scope.first = !$scope.first;
					$scope.lazySend();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//重置密码
		$scope.submitForm = function() {
			$scope.sendBtn = true;
			$scope.newp.phone = $scope.recover.phone;
			$scope.newp.residentStatus = $scope.recover.name;
			if(!$scope.newp.password || !$scope.newp.confirmationPwd || !$scope.newp.code) {
				layerAlert.autoclose("验证码/密码不能为空！");
				return;
			}
			var reg = /^[a-zA-Z0-9]{1,16}$/;
			if(!reg.test($scope.newp.password)) {
				layerAlert.autoclose("密码只能由数字和字母组成！");
				return;
			}
			if($scope.newp.password !== $scope.newp.confirmationPwd) {
				layerAlert.autoclose("两次输入的密码不一致！");
				return;
			}
			$scope.listBusyPromise = $http({
				method: "post",
				url: serverUrls.forgotPassword,
				data: $scope.newp
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					layerAlert.autoclose("修改成功！");
					setTimeout(function() {
						$state.go("page.login");
					}, 1600);
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

		//重新发送验证码
		$scope.reSendPassward = function() {
			$scope.sendBtn = true;
			$scope.listBusyPromise = $http({
				method: "get",
				url: serverUrls.veriFicationcode + "?residentStatus=" + $scope.recover.residentStatus + "&phone=" + $scope.recover.phone
			}).success(function(response) {
				var Code = response.State.Code;
				var Message = response.State.Message;
				if(Code === 0) {
					$scope.lazySend();
				} else {
					layerAlert.autoclose(Message);
				}
			}).error(function(error) {
				layerAlert.autoclose(PcService.errorResult(error));
			});
		};

	}
]);
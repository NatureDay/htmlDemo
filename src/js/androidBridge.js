/**
 * android jsbridge
 */
(function () {
    if (window.androidBridge) {
        return;
    }
    window.androidBridge = {
        callbacks: {},
        isNull: function (data) {
            return data == undefined || data == null || data == "";
        },

        /**
         * JS调用Java默认实现类
         * @param methodName            方法名
         * @param params                参数
         * @param callback              回调
         */
        doDefaultCall: function (methodName, params, callback) {
            this.doCall("DefaultBridgeImpl", methodName, params, callback);
        },
        /**
         * JS调用Java
         * @param className             类名
         * @param methodName            方法名
         * @param params                参数
         * @param callback              回调
         */
        doCall: function (className, methodName, params, callback) {
            let _this = this;
            if (this.lastCallTime && (Date.now() - this.lastCallTime) < 100) {
                setTimeout(function () {
                    _this.doCall(className, methodName, params, callback);
                }, 100);
                return;
            }
            this.lastCallTime = Date.now();

            if (this.isNull(className) || this.isNull(methodName)) {
                console.log("---------androidBridge need className and methodName---------");
                return;
            }

            let requestData = {};
            requestData.javaClassName = className;
            requestData.javaMethodName = methodName;
            if (!this.isNull(params)) {
                requestData.javaParams = params;
            }
            if (!this.isNull(callback)) {
                let callbackId = 'callback_' + Math.floor(Math.random() * (1 << 30));
                this.callbacks[callbackId] = callback;
                requestData.javaCallbackId = callbackId;
            }

            window.prompt(JSON.stringify(requestData), "");
        },
        /**
         * 回调方法
         * @param callbackId
         * @param jsonObj
         */
        callback: function (callbackId, jsonObj) {
            let callback = this.callbacks[callbackId];
            if (typeof callback === "function") {
                callback(jsonObj);
            }
            delete this.callbacks[callbackId];
        }
    };
})();
/**
 * Created by Administrator on 2017/9/26.
 */
(function (b) {
    console.log("HostApp initialization begin");
    var a = {
        queue: [],
        callback: function () {
            var d = Array.prototype.slice.call(arguments, 0);
            var c = d.shift();
            var e = d.shift();
            this.queue[c].apply(this, d);
            if (!e) {
                delete this.queue[c]
            }
        }
    };
    a.alert = a.alert = a.alert = a.delayJsCallBack = a.getIMSI = a.getOsSdk = a.goBack = a.overloadMethod = a.overloadMethod = a.passJson2Java = a.passLongType = a.retBackPassJson = a.retJavaObject = a.testLossTime = a.toast = a.toast = function () {
        var f = Array.prototype.slice.call(arguments, 0);
        if (f.length < 1) {
            throw"HostApp call error, message:miss method name"
        }
        var e = [];
        for (var h = 1; h < f.length; h++) {
            var c = f[h];
            var j = typeof c;
            e[e.length] = j;
            if (j == "function") {
                var d = a.queue.length;
                a.queue[d] = c;
                f[h] = d
            }
        }
        var g = JSON.parse(prompt(JSON.stringify({method: f.shift(), types: e, args: f})));
        if (g.code != 200) {
            throw"HostApp call error, code:" + g.code + ", message:" + g.result
        }
        return g.result
    };
    Object.getOwnPropertyNames(a).forEach(function (d) {
        var c = a[d];
        if (typeof c === "function" && d !== "callback") {
            a[d] = function () {
                return c.apply(a, [d].concat(Array.prototype.slice.call(arguments, 0)))
            }
        }
    });
    b.HostApp = a;
    console.log("HostApp initialization end")
})(window)
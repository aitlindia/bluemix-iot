/**
 * Created by nurul on 30/10/16.
 */


console.log("Hello World!");

var iotf = require("ibmiotf");

var config = {
    "org" : "9zpfq2",
    "id" : "43b45c67d89e",
    "type" : "aitlgateway",
    //"domain": "aitl-iot.mybluemix.net",
    "host": "aitl-iot",
    "auth-method" : "token",
    "auth-token" : "-tgEYGcLYyrbs9Lji?"
};

var payLoadMetaData = {
    "desired": {
        "light": "on"
    },
    "reported": {
        "light": "on"
    }
};

var deviceClient = new iotf.IotfDevice(config);

//setting the log level to debug. By default its 'warn'
deviceClient.log.setLevel('debug');
//setting the log level to trace. By default its 'warn'
deviceClient.log.setLevel('info');


//deviceClient.registerDevice();
deviceClient.connect();

deviceClient.on('connect', function(){
    var i=0;
    console.log("connected");
    setInterval(function function_name () {
        i++;
        deviceClient.publish('myevt', 'json', payLoadMetaData, 2); // '{"value":'+i+'}'
    },2000);

    //publish an event at the user-defined quality of service
    //var myQosLevel=2
    //deviceClient.publish("status","json",'{"d" : { "cpu" : 60, "mem" : 50 }}', myQosLevel);

    // deviceClient.disconnect();
});

deviceClient.on("command", function (commandName,format,payload,topic) {
    if(commandName === "blink") {
        console.log(blink);
        //function to be performed for this command
        blink(payload);
    } else {
        console.log("Command not supported.. " + commandName);
    }
});

deviceClient.on("error", function (err) {
    console.log("Error : "+err);
});







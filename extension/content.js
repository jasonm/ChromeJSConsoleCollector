var JSConsoleCollector = {
  getSavedLogs: function() {
    var savedLogs = [];
    if (!!localStorage.JSLogs) {
      savedLogs = JSON.parse(localStorage.JSLogs);
    }

    return savedLogs;
  },
  saveLogs: function(logs) {
    localStorage.JSLogs = JSON.stringify(logs);
  },
  push: function (log) {
    var list = this.getSavedLogs();
    list.push(log);
    this.saveLogs(list);
  },
  pump: function() {
    var list = this.getSavedLogs();
    this.clear();
    return list;
  },
  clear: function() {
    this.saveLogs([]);
  },
  consoleFunctionWithHistory: function(name) {
    var originalFunction = console[name];
    var originalFunctionName = "console." + name;
    var self = this;

    return function() {
      self.push([originalFunctionName, Array.prototype.slice.apply(arguments)]);
      originalFunction.apply(this, arguments);
    };
  },
  initialize: function() {
    this.clear();

    var loggingFunctionNames = ["log","info","warn","error","assert","dir","clear","profile","profileEnd"];
    for (var i = 0 ; i < loggingFunctionNames.length ; i++) {
      console[loggingFunctionNames[i]] = this.consoleFunctionWithHistory(loggingFunctionNames[i]);
    };

    if (chrome && chrome.extension) {
      // Inject this script into the page
      var s = document.createElement('script');
      s.src = chrome.extension.getURL('content.js');
      (document.head||document.documentElement).appendChild(s);
      s.onload = function() {
        s.parentNode.removeChild(s);
      };
    }
  }
};

JSConsoleCollector.initialize();

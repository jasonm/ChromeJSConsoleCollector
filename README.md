ChromeJSConsoleCollector
==============

## Introduction
JSConsoleCollector for Chrome provide access to JavaScript console output while running tests with a ChromeDriver.

This is based heavily off of [ChromeJSErrorCollector](https://github.com/dharrya/ChromeJSErrorCollector) by Andrew Krasichkov.

## Usage
Simple Python code:

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_extension('extension-js-console-collector.crx')
driver = webdriver.Chrome(chrome_options=chrome_options)
driver.execute_script('console.log("testing 1")')
driver.execute_script('console.log("testing 2")')
print(driver.execute_script('return window.JSConsoleCollector ? window.JSConsoleCollector.pump() : []')) 
driver.quit()
```
Will output:

```
[[u'console.log', [u'testing 1']], [u'console.log', [u'testing 2']]]
```

The following functions on `console` are wrapped and logged:

```
console.log
console.info
console.warn
console.error
console.assert
console.dir
console.clear
console.profile
console.profileEnd
```

## Building

* Visit `chrome://extensions/`
* Enable "Developer mode"
* Click "Pack extension..."
* Choose the `extension/` subdirectory in this repo
* `mv extension.crx extension-js-console-collector.crx`

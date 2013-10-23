ChromeJSConsoleCollector
==============

## Introduction
JSConsoleCollector for Chrome provide access to JavaScript errors while running tests with a ChromeDriver.

## Usage
Simple Python code:

```python
from selenium import webdriver
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_extension('extension-js-console-collector.crx')
driver = webdriver.Chrome(chrome_options=chrome_options)
driver.execute_script('console.log("testing 1"))
driver.execute_script('console.log("testing 2"))
print(driver.execute_script('return window.JSConsoleCollector_logs ? window.JSConsoleCollector_logs.pump() : []')) 
driver.quit()
```
Will output:

```
[
  "testing 1",
  "testing 2"
]
```

## Thanks

This is based directly off of [ChromeJSErrorCollector](https://github.com/dharrya/ChromeJSErrorCollector)

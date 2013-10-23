#!/usr/bin/env python2.7
# -*- coding: utf-8 -*-

from selenium import webdriver
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
chrome_options.add_extension('extension-js-console-collector.crx')
driver = webdriver.Chrome(chrome_options=chrome_options)
driver.get('http://google.com')
driver.execute_script('console.log("testing 1")')
driver.execute_script('console.log("testing 2")')
print(driver.execute_script('return window.JSConsoleCollector ? window.JSConsoleCollector.pump() : []'))
driver.quit()

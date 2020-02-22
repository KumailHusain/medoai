import browser
from selenium.webdriver.support.ui import WebDriverWait
driver = browser.getDriver()

driver.get("https://medo.ai/career/test-challenge/index.html")
test5div = driver.find_element_by_id("test-5-div")

# 10 seconds is a reasonable timeout. If we don't want a timeout,
# we can simply wait in a loop
WebDriverWait(driver, 10).until(lambda x: x.find_element_by_id("test5-button").is_displayed())
button = driver.find_element_by_id("test5-button")
button.click()

isVisible = WebDriverWait(driver, 5).until(lambda x: x.find_element_by_id("test-5-alert").is_displayed())
assert isVisible
assert not button.is_enabled()
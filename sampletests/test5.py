from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

driver = webdriver.Chrome()
driver.get("file:///C:/Users/Kumail%20Husain/source/repos/medoai/tests/index.htm")
test5div = driver.find_element_by_id("test5")
WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.TAG_NAME, "button"))
    )
button = test5div.find_element_by_tag_name("button")
button.click()

WebDriverWait(driver, 10).until(
        EC.alert_is_present()    )
isAlertPresent = True
try:
    driver.switch_to_alert()
except:
    isAlertPresent = False
assert isAlertPresent    
assert not button.is_enabled()
from selenium import webdriver

driver = webdriver.Chrome()
driver.get("file:///C:/Users/Kumail%20Husain/source/repos/medoai/tests/index.htm")
assertionFailed = False
try:
    email = driver.find_element_by_xpath("//input[@type='email']")
    password = driver.find_element_by_xpath("//input[@type='password']")
    login = driver.find_element_by_xpath("//input[@type='button']")
except:
    assertionFailed = True
if (assertionFailed):
    assert False
email.send_keys("shusain@ualberta.ca")
password.send_keys("daffyduck")

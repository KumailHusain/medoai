import browser
driver = browser.getDriver()

driver.get("https://medo.ai/career/test-challenge/index.html")
assertionFailed = False
try:
    email = driver.find_element_by_xpath("//input[@type='email']")
    password = driver.find_element_by_xpath("//input[@type='password']")
    login = driver.find_element_by_xpath("//button[@type='submit']")
except:
    assertionFailed = True
if (assertionFailed):
    assert False
email.send_keys("shusain@ualberta.ca")
password.send_keys("daffyduck")

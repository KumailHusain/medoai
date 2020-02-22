from selenium import webdriver

browser = "Chrome"

def getDriver():
    if browser == "Chrome":
        return webdriver.Chrome()
    elif browser == "Firefox":
        return webdriver.Firefox()
    elif browser == "Ie":
        return webdriver.Ie()
    elif browser == "Opera":
        return webdriver.Opera()

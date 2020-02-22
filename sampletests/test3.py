from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://medo.ai/career/test-challenge/index.html")
test3div = driver.find_element_by_id("test-3-div")
button = test3div.find_element_by_id("dropdownMenuButton")
assert button.text == "Option 1"
options = test3div.find_elements_by_class_name("dropdown-item")
for option in options:
    if option.text == "Option 3":
        option.click()
        break
from selenium import webdriver

driver = webdriver.Chrome()
driver.get("https://medo.ai/career/test-challenge/index.html")

test2div = driver.find_element_by_id("test-2-div")
items = test2div.find_elements_by_tag_name("li")
assert len(items) >= 2
assert "List Item 2" in items[1].text
assert items[1].find_element_by_xpath("./span[contains(@class, 'badge')]").text == "6"
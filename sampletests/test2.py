from selenium import webdriver

driver = webdriver.Chrome()
driver.get("file:///C:/Users/Kumail%20Husain/source/repos/medoai/tests/index.htm")
test2div = driver.find_element_by_id("test2")
items = test2div.find_elements_by_xpath("//li")
assert len(items) >= 2
print(items[1].text)
assert 'List Item 2' in items[1].text
print(items[1].find_element_by_xpath("//span[@class='badge']").text)
assert items[1].find_element_by_xpath("//span[@class='badge']").text == "6"
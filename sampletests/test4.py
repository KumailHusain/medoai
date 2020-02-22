from selenium import webdriver

driver = webdriver.Chrome()
driver.get("file:///C:/Users/Kumail%20Husain/source/repos/medoai/tests/index.htm")
test4div = driver.find_element_by_id("test4")
elements = test4div.find_elements_by_tag_name("button")
assert len(elements) >= 2
assert elements[0].is_enabled() and not elements[1].is_enabled()

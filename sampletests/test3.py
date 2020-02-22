from selenium import webdriver
from selenium.webdriver.support.ui import Select

driver = webdriver.Chrome()
driver.get("file:///C:/Users/Kumail%20Husain/source/repos/medoai/tests/index.htm")
test3div = driver.find_element_by_id("test3")
select = Select(test3div.find_element_by_tag_name("select"))
assert "Option 1" == select.first_selected_option.text
select.select_by_visible_text("Option 3")
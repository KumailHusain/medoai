import browser
driver = browser.getDriver()

driver.get("https://medo.ai/career/test-challenge/index.html")
test4div = driver.find_element_by_id("test-4-div")
elements = test4div.find_elements_by_tag_name("button")
assert len(elements) >= 2
assert elements[0].is_enabled() and not elements[1].is_enabled()

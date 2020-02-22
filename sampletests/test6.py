import browser
driver = browser.getDriver()

def getCellValue(tbody, x, y):
    rows = tbody.find_elements_by_tag_name("tr")
    assert len(rows) >= y + 1
    cells = rows[y].find_elements_by_tag_name("td")
    assert len(cells) >= x + 1
    return cells[x].text

driver.get("https://medo.ai/career/test-challenge/index.html")
test6div = driver.find_element_by_id("test-6-div")
tbody = test6div.find_element_by_tag_name("tbody")
assert getCellValue(tbody, 2, 2) == "45"
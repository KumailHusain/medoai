# Simple UI/UX testing test

The sample scripts are written in Python 3 and use Selenium WebDriver. Each `testx.py` file represents the x-th test.

## Setting up test environment
- Ensure you have Python 3 installed
- Acquire the correct selenium webdriver file for your browser and add it to your `$PATH` variable
- By default, the scripts use the Chrome browser. To change your browser, open the `browser.py` file and change browser to one of `Firefox`, `Chrome`, `Ie` or `Opera`. If you want another browser not listed here, you may directly written its class in the getDriver() function. [See browsers supported by selenium.](https://selenium-python.readthedocs.io/api.html)
- Install the selenium package using `pip3`:

```bash
sudo pip3 install selenium
```

## Running the scripts
To test the x-th script, issue the following command:

```bash
python3 testx.py
```

Example (Running test 5):

```bash
python3 test5.py
```

package com.elasticpath.cucumber.definitions;

import cucumber.api.Scenario;
import cucumber.api.java.After;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;

import com.elasticpath.selenium.SetUp;
import com.elasticpath.selenium.pages.CartPage;
import com.elasticpath.selenium.pages.HeaderPage;

/**
 * Test Base class contains some methods for Before and After tests to be run for each test.
 */
public class TestBase {
	private static boolean screenShotTaken;

	/**
	 * For After hooks, higher order number run first.
	 * Default order value is 10000
	 */

	/**
	 * Takes screenshot on scenario step failure.
	 *
	 * @param scenario Scenario
	 */
	@After(order = 1)
	public void tearDown(final Scenario scenario) {

		if (scenario.isFailed()) {
			final byte[] screenshot = ((TakesScreenshot) SetUp.getDriver()).getScreenshotAs(OutputType.BYTES);
			scenario.embed(screenshot, "image/png");
			screenShotTaken = true;
		}

		SetUp.quitDriver();
	}

	@After(value = "@clearCart", order = 2)
	public void clearCart() {
		HeaderPage headerPage = new HeaderPage(SetUp.getDriver());
		headerPage.clickCartLink();
		CartPage cartPage = new CartPage(SetUp.getDriver());
		cartPage.clearCart();
	}
}
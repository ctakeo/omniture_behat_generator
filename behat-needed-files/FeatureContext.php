<?php

use Behat\Behat\Context\ClosuredContextInterface,
    Behat\Behat\Context\TranslatedContextInterface,
    Behat\Behat\Context\BehatContext,
    Behat\Behat\Exception\PendingException;
use Behat\Gherkin\Node\PyStringNode,
    Behat\Gherkin\Node\TableNode;
use Behat\MinkExtension\Context\MinkContext;

//
// Require 3rd-party libraries here:
//
//   require_once 'PHPUnit/Autoload.php';
//   require_once 'PHPUnit/Framework/Assert/Functions.php';
//

/**
 * Features context.
 */
class FeatureContext extends MinkContext
{
    public function __construct(array $parameters)
    {
        // Initialize your context here
    }

    /**
     * @Given /^wait (\d+) seconds$/
     */
    public function waitSeconds($seconds) {
      sleep($seconds);
    }

    /**
     * @Given /^I click on "([^"]*)"$/
     */
    public function iClickOn($locator) {
      $session = $this->getSession(); // get the mink session
      $element = $session->getPage()->find('css', $locator); // runs the actual query and returns the element

      if (null === $element) {
        throw new \InvalidArgumentException(sprintf('Could not evaluate CSS selector: "%s"', $locator));
      }

      $element->click();
    }

    /**
     * @Then /^I search the page for "([^"]*)"$/
     */
    public function iSearchThePageFor($name) {
      $session = $this->getSession();
      $element = $session->getPage()->findAll('css', '.extra-title-info-label');
      $pattern = '/\b('.$name.')\b/';
      foreach ($element as $value) {
        if (preg_match($pattern, $value->getText()) !== 0) {
            $value->click();
            return;
        }
      }
    }

    /**
     * @Then /^I take a screenshot named "([^"]*)" in the folder "([^"]*)"$/
     */
    public function iTakeAScreenshotNamedInTheFolder($filename, $folder) {
      if (!(is_dir($folder))) {
        throw new \InvalidArgumentException(sprintf('Folder: "%s" not exists', $folder));
      }

      $this->saveScreenshot($filename.'.jpg', $folder);
    }

     /**
     * @When /^I fill in the calendar field "([^"]*)" with "([^"]*)"$/
     */
    public function iFillInTheCalendarField($selector, $value) {
      $session = $this->getSession();
      $element = $session->getPage()->find('css', $selector);
      $element->setValue($value);
    }
}

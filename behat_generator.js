(function($) {
	var text = Drupal.settings.omniture_behat_generator.used_to_generate;
	var propsList = [];
	var noMoreProps = false;
	while (!noMoreProps){
		var indexOfProp = text.indexOf('prop');
		var concatenated = '';
		var lastIndexOfProp = 0;
		if (indexOfProp > 0){
			for (var i = indexOfProp; i < text.length; i++){
				if (text[i] != ',' && text[i] != ' ' && text[i] != ')' && text[i] != ';' && text[i] != '=' && text[i] != '\'') { 
					concatenated = concatenated + text[i];
				} else {
					lastIndexOfProp = i;
					if ($.inArray(concatenated, propsList) == -1)
						propsList.push(concatenated);


					var filter = new RegExp(concatenated);
					filter.global = true;
				    var str = text; 
				    var res = str.replace(filter, "");
				    text = res;
					concatenated = '';
					break;
				}
			}
			
		} else{
			noMoreProps = true;
		}
	}
	noMoreProps = false;
	while (!noMoreProps){
		indexOfProp = text.indexOf('event');
		concatenated = '';
		lastIndexOfProp = 0;
		if (indexOfProp > 0){
			for (var i = indexOfProp; i < text.length; i++){
				if (text[i] != ',' && text[i] != ' ' && text[i] != ')' && text[i] != ';' && text[i] != '=' && text[i] != '\'' && text[i] != '[' && text[i] != '.' && text[i] != 'D') { 
					concatenated = concatenated + text[i];
				} else {
					lastIndexOfProp = i;
					if ($.inArray(concatenated, propsList) == -1){
						if (concatenated != 'events' && concatenated != 'event')
							propsList.push(concatenated);
					}


					var filter = new RegExp(concatenated);
					filter.global = true;
				    var str = text; 
				    var res = str.replace(filter, "");
				    text = res;
					concatenated = '';
					break;
				}
			}
			
		} else{
			noMoreProps = true;
		}
	}


	//Populate the array with the props that should not be included in the script.
	var propsExceptions = [];
	text = Drupal.settings.omniture_behat_generator.props_exceptions;
	var currentProp = '';
	for (var i = 0; i != text.length+1; i++){
		if (text[i] == ',' || i == text.length) {
			propsExceptions.push(currentProp);
			currentProp = '';
		} else {
			currentProp = currentProp + text[i];
		}
	}

	$('#edit-generated-script').val('');

	$('#edit-generated-script').val($('#edit-generated-script').val() + 'Feature: Extract Omniture Standard Tracking Reports for <sitename>\n\
	In order to analyse the Omniture Standard Tracking Reports\n\
	As a user\n\
	I want to access Site Catalyst and extract the files\n\
	\n');
	
	$('#edit-generated-script').val($('#edit-generated-script').val() + '@javascript\n\
Scenario: Access Site Catalyst\n\
Given I am on "https://sc2.omniture.com/login/"\n\
When I fill in "company_input_field" with "Pfizer"\n\
When I fill in "username_input_field" with "cint"\n\
When I fill in "password_input_field" with "pfizer"\n\
And I press "login_button"\n\
And wait 8 seconds\n\
\n');

	$('#edit-generated-script').val($('#edit-generated-script').val() + 'And I click on ".coral-Button--rsidSelector"\n\
And wait 5 seconds\n\
When I fill in "Search Report Suites" with "<suitename>"\n\
And wait 5 seconds\n\
And I click on ".suite-selected"\n\
And wait 3 seconds\n\
\n');


	$('#edit-generated-script').val($('#edit-generated-script').val() + 'And I click on ".CalendarWidgetActivator"\n');
	$('#edit-generated-script').val($('#edit-generated-script').val() + 'When I fill in the calendar field "[class=\'MonthBlock\'] input[name=start]" with "'+Drupal.settings.omniture_behat_generator.initial_date+'"\n');
	$('#edit-generated-script').val($('#edit-generated-script').val() + 'And wait 3 seconds\n');
	$('#edit-generated-script').val($('#edit-generated-script').val() + 'When I fill in the calendar field "[class=\'MonthBlock\'] input[name=end]" with "'+Drupal.settings.omniture_behat_generator.final_date+'"\n');
	$('#edit-generated-script').val($('#edit-generated-script').val() + 'And wait 3 seconds\n');
	$('#edit-generated-script').val($('#edit-generated-script').val() + 'And I press "change_date_update"\n');
	$('#edit-generated-script').val($('#edit-generated-script').val() + '\n');

	var notFound = true;
	for (var i = 0; i < propsList.length; i++){
		for (var o = 0; o < propsExceptions.length; o++){
			if (propsExceptions[o] == propsList[i]){
				notFound = false;
				break;
			}
		}	
		if (notFound){
			$('#edit-generated-script').val($('#edit-generated-script').val() + 'And I click on \".coral-Icon--folderSearch\"\n');
			$('#edit-generated-script').val($('#edit-generated-script').val() + 'When I fill in \"Search Reports\" with \"'+propsList[i]+'\"\n');
			$('#edit-generated-script').val($('#edit-generated-script').val() + 'And wait 2 seconds\n');
			$('#edit-generated-script').val($('#edit-generated-script').val() + 'Then I search the page for \"'+propsList[i]+'\"\n');
			$('#edit-generated-script').val($('#edit-generated-script').val() + 'And wait 10 seconds\n');
			$('#edit-generated-script').val($('#edit-generated-script').val() + 'Then I take a screenshot named "'+propsList[i]+'" in the folder "Screenshots"\n');
			$('#edit-generated-script').val($('#edit-generated-script').val() + '\n');
		} else {
			notFound = true;
		}
	}

	function replaceAll(find, replace, str) {
		return str.replace(new RegExp(find, 'g'), replace);
	}
	String.prototype.replaceAt=function(index, character) {
    	return this.substr(0, index) + character + this.substr(index+character.length);
	}
})(jQuery);
Feature: email' attachment management

    Scenario: create new email
        Given I authenticate as valid user
        When I open Mail page
        And Click on the New button
        And Send new email to myself
        Then I wait until new email appears in emails list
        When I open new email
        And Save emails attachment file in My Documents
        And I go to the My Documents page
        And Drag attachment file to Trash directory
        Then I go to Trash directory
        And I expect to see attachment file

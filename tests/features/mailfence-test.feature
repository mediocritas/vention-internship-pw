Feature: email' attachment management

    Scenario Outline: create new email
        Given I authenicate as valid user
        And Create "attachment-file"
        When I open Mail page
        And Click on the New button
        And Send new email
            | Addressee  | ${LOGIN}${DOMAIN} |
            | Subject    | <emailSubject>    |
            | Message    | <randomText>      |
            | Attachment | <attachment-file> |

        And I wait until new email appears in emails list
        And I open new email
        And Save email "attachment-file" in My Documents
        And I go to the My Documents page
        And Drag "attachment-file" to Trash directory
        Then I go to Trash directory
        And I expect to see "attachment-file"

        Examples:
            | attachment-file | eat |


1. Log in to https://mailfence.com/ using a test account.
2. Compose a new email:
Click the button to create a new email.
Enter your own email address in the "To" field.
Add any text to the email body.

Attach a file:
Add a test file as an attachment.

Send the email to yourself.
Receive the email:
Wait for the email to appear in the inbox.
Open the received email.

Move the attachment to "Documents":
Save the attachment to the "Documents" section.

Navigate to the "Documents" section:
Verify that the file has been successfully uploaded.

Move the file to the trash using drag and drop:
Drag and drop the file into the trash bin.

Verify that the file is in the trash.
